/**
 * Auto-translation layer.
 *
 * Walks the DOM and translates visible text nodes + key attributes
 * (placeholder, title, aria-label, alt) into the target language.
 *
 * - Caches translations in localStorage to avoid re-fetching.
 * - Uses MyMemory free translation API (no key required).
 * - Skips long strings (>450 chars) — MyMemory's free tier rejects them.
 * - Skips nodes already translated for the current language to avoid loops.
 * - Observes DOM mutations so dynamic content gets translated too.
 * - Restores original English text when language switches back to "en".
 */

type Lang = "en" | "bn";

const CACHE_KEY = "auto_translate_cache_v1";
const ORIGINAL_ATTR_PREFIX = "data-orig-attr-";
const TRANSLATED_FLAG = "data-translated-lang";
// MyMemory free tier rejects queries longer than 500 chars. Stay under that.
const MAX_TRANSLATE_LEN = 450;

const SKIP_TAGS = new Set([
  "SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE", "SVG", "PATH", "CANVAS",
  "TEXTAREA", "IFRAME",
]);

const TRANSLATABLE_ATTRS = ["placeholder", "title", "aria-label", "alt"];

let cache: Record<string, string> = {};
let observer: MutationObserver | null = null;
let currentLang: Lang = "en";
let pendingNodes = new Set<Text>();
let pendingAttrs = new Set<{ el: Element; attr: string }>();
let scheduleHandle: number | null = null;

// Track the last translated value of each text node so the MutationObserver
// doesn't see our own write as a fresh "needs translation" change.
const originalTextMap: WeakMap<Text, string> = new WeakMap();
const translatedValueMap: WeakMap<Text, string> = new WeakMap();

function loadCache() {
  try {
    cache = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
  } catch {
    cache = {};
  }
}

function saveCache() {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {}
}

function isTranslatable(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return false;
  // skip pure numbers / symbols / currency-only strings
  if (!/[A-Za-z]/.test(trimmed)) return false;
  return true;
}

function shouldSkipElement(el: Element | null): boolean {
  let cur: Element | null = el;
  while (cur) {
    if (SKIP_TAGS.has(cur.tagName)) return true;
    if (cur.hasAttribute && cur.hasAttribute("data-no-translate")) return true;
    cur = cur.parentElement;
  }
  return false;
}

function collectTextNodes(root: Node, nodes: Text[]) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (shouldSkipElement(parent)) return NodeFilter.FILTER_REJECT;
      const text = node.nodeValue || "";
      if (!isTranslatable(text)) return NodeFilter.FILTER_REJECT;
      // Skip nodes whose current value matches our previous translation
      // (prevents re-queueing our own writes).
      const lastTranslated = translatedValueMap.get(node as Text);
      if (lastTranslated && lastTranslated === text) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  let n: Node | null;
  while ((n = walker.nextNode())) nodes.push(n as Text);
}

function collectAttrTargets(root: Element, targets: { el: Element; attr: string }[]) {
  if (shouldSkipElement(root)) return;
  for (const attr of TRANSLATABLE_ATTRS) {
    const v = root.getAttribute?.(attr);
    if (v && isTranslatable(v)) targets.push({ el: root, attr });
  }
  const all = root.querySelectorAll("[placeholder], [title], [aria-label], [alt]");
  all.forEach((el) => {
    if (shouldSkipElement(el)) return;
    for (const attr of TRANSLATABLE_ATTRS) {
      const v = el.getAttribute(attr);
      if (v && isTranslatable(v)) targets.push({ el, attr });
    }
  });
}

async function translateOne(text: string, target: Lang): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) return text;
  if (trimmed.length > MAX_TRANSLATE_LEN) {
    // Too long for the free API — cache as identity so we don't keep retrying.
    // cache[`${target}::${trimmed}`] = trimmed;
    return text;
  }
  
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      trimmed
    )}&langpair=en|${target}`;
    const resp = await fetch(url);
    const data = await resp.json();
    const translated: string | undefined = data?.responseData?.translatedText;
    const status = data?.responseStatus;
    // MyMemory returns errors as plain text in translatedText (e.g.
    // "QUERY LENGTH LIMIT EXCEEDED..."). Detect & treat as failure so we
    // don't write garbage AND don't keep retrying.
    const looksLikeError =
      !translated ||
      /QUERY LENGTH LIMIT|MYMEMORY WARNING|INVALID|AUTH/i.test(translated) ||
      (typeof status === "number" && status >= 400);
    if (looksLikeError) {
      cache[`${target}::${trimmed}`] = trimmed;
      return text;
    }
    cache[`${target}::${trimmed}`] = translated;
    return preserveWhitespace(text, translated);
  } catch {
    // Network failure — cache identity to stop retry loop this session.
    cache[`${target}::${trimmed}`] = trimmed;
    return text;
  }
}

async function translateBatch(texts: string[], target: Lang): Promise<string[]> {
  if (target === "en") return texts;
  const out: string[] = new Array(texts.length);
  const toFetch: { idx: number; text: string }[] = [];

  texts.forEach((t, i) => {
    const key = `${target}::${t.trim()}`;
    if (cache[key] !== undefined) {
      out[i] = preserveWhitespace(t, cache[key]);
    } else {
      toFetch.push({ idx: i, text: t });
    }
  });

  const concurrency = 4;
  let cursor = 0;
  async function worker() {
    while (cursor < toFetch.length) {
      const item = toFetch[cursor++];
      out[item.idx] = await translateOne(item.text, target);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  saveCache();
  return out;
}

function preserveWhitespace(original: string, translated: string) {
  const leading = original.match(/^\s*/)?.[0] ?? "";
  const trailing = original.match(/\s*$/)?.[0] ?? "";
  return leading + translated.trim() + trailing;
}

function flushScheduled() {
  scheduleHandle = null;
  const lang = currentLang;
  if (lang === "en") return;

  const nodes = Array.from(pendingNodes);
  const attrs = Array.from(pendingAttrs);
  pendingNodes.clear();
  pendingAttrs.clear();
  
console.log("🧩 Translating nodes:", nodes.length, "attrs:", attrs.length);
  if (nodes.length) {
    const originals = nodes.map((n) => n.nodeValue || "");
    translateBatch(originals, lang).then((translated) => {
      nodes.forEach((n, i) => {
        if (currentLang !== lang) return;
        // Don't write if unchanged — avoids triggering MutationObserver.
        if (n.nodeValue === translated[i]) return;
        if (!originalTextMap.has(n)) {
          originalTextMap.set(n, originals[i]);
        }
        n.nodeValue = translated[i];
        translatedValueMap.set(n, translated[i]);
        const parent = n.parentElement;
        if (parent) parent.setAttribute(TRANSLATED_FLAG, lang);
      });
    });
  }

  if (attrs.length) {
    const originals = attrs.map(({ el, attr }) => el.getAttribute(attr) || "");
    translateBatch(originals, lang).then((translated) => {
      attrs.forEach(({ el, attr }, i) => {
        if (currentLang !== lang) return;
        if (el.getAttribute(attr) === translated[i]) return;
        if (!el.hasAttribute(`${ORIGINAL_ATTR_PREFIX}${attr}`)) {
          el.setAttribute(`${ORIGINAL_ATTR_PREFIX}${attr}`, originals[i]);
        }
        el.setAttribute(attr, translated[i]);
      });
    });
  }
}

function schedule() {
  if (scheduleHandle !== null) return;
  scheduleHandle = window.setTimeout(flushScheduled, 150);
}

function queueRoot(root: Node) {
  const nodes: Text[] = [];
  collectTextNodes(root, nodes);
  nodes.forEach((n) => pendingNodes.add(n));

  if (root instanceof Element) {
    const targets: { el: Element; attr: string }[] = [];
    collectAttrTargets(root, targets);
    targets.forEach((t) => pendingAttrs.add(t));
  }
  if (pendingNodes.size || pendingAttrs.size) schedule();
}

/**
 * Public: force a full re-scan of the document. Useful on route changes
 * and as a periodic safety net so Radix portals (Dialog/Sheet/Popover/etc.)
 * mounted outside the React tree always get translated.
 */
export function rescanForTranslation() {
  if (currentLang === "en") return;
  queueRoot(document.body);
  console.log("🔁 RESCAN:", window.location.pathname);
}

function restoreEnglish() {
  document.querySelectorAll(`[${TRANSLATED_FLAG}]`).forEach((el) => {
    el.removeAttribute(TRANSLATED_FLAG);
  });
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n: Node | null;
  while ((n = walker.nextNode())) {
    const tn = n as Text;
    const orig = originalTextMap.get(tn);
    if (orig !== undefined && tn.nodeValue !== orig) {
      tn.nodeValue = orig;
      translatedValueMap.delete(tn);
    }
  }
  TRANSLATABLE_ATTRS.forEach((attr) => {
    const sel = `[${ORIGINAL_ATTR_PREFIX}${attr}]`;
    document.querySelectorAll(sel).forEach((el) => {
      const orig = el.getAttribute(`${ORIGINAL_ATTR_PREFIX}${attr}`);
      if (orig !== null) {
        el.setAttribute(attr, orig);
        el.removeAttribute(`${ORIGINAL_ATTR_PREFIX}${attr}`);
      }
    });
  });
}

function startObserver() {
  if (observer) return;
  observer = new MutationObserver((mutations) => {
    if (currentLang === "en") return;
    for (const m of mutations) {
      if (m.type === "childList") {
        m.addedNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            const tn = node as Text;
            if (
              tn.parentElement &&
              !shouldSkipElement(tn.parentElement) &&
              isTranslatable(tn.nodeValue || "") &&
              translatedValueMap.get(tn) !== tn.nodeValue
            ) {
              pendingNodes.add(tn);
              schedule();
            }
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            queueRoot(node);
          }
        });
      } else if (m.type === "characterData") {
        const tn = m.target as Text;
        // Ignore our own writes.
        if (translatedValueMap.get(tn) === tn.nodeValue) continue;
        if (
          tn.parentElement &&
          !shouldSkipElement(tn.parentElement) &&
          isTranslatable(tn.nodeValue || "")
        ) {
          // Source changed — clear stored original so we re-capture it.
          originalTextMap.delete(tn);
          pendingNodes.add(tn);
          schedule();
        }
      } else if (m.type === "attributes" && m.attributeName) {
        if (TRANSLATABLE_ATTRS.includes(m.attributeName)) {
          const el = m.target as Element;
          const v = el.getAttribute(m.attributeName);
          if (v && isTranslatable(v)) {
            pendingAttrs.add({ el, attr: m.attributeName });
            schedule();
          }
        }
      }
    }
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: TRANSLATABLE_ATTRS,
  });
}

function stopObserver() {
  observer?.disconnect();
  observer = null;
}

let safetyRescanTimer: number | null = null;

function startSafetyRescan() {
  if (safetyRescanTimer !== null) return;
  // Every 2.5s, re-scan the body. Cheap because nodes already translated
  // are skipped by the TreeWalker filter (translatedValueMap match).
  safetyRescanTimer = window.setInterval(() => {
    if (currentLang === "en") return;
    queueRoot(document.body);
  }, 2500);
}

function stopSafetyRescan() {
  if (safetyRescanTimer !== null) {
    clearInterval(safetyRescanTimer);
    safetyRescanTimer = null;
  }
}

export function setAutoTranslateLanguage(lang: Lang) {
  if (lang === currentLang) return;
  currentLang = lang;
  if (lang === "en") {
    stopObserver();
    stopSafetyRescan();
    restoreEnglish();
    document.documentElement.setAttribute("lang", "en");
  } else {
    document.documentElement.setAttribute("lang", "bn");
    loadCache();
    queueRoot(document.body);
    startObserver();
    startSafetyRescan();
  }
}

export function initAutoTranslate(initialLang: Lang) {
  loadCache();
  currentLang = "en";
  if (initialLang === "bn") {
    requestAnimationFrame(() => setAutoTranslateLanguage("bn"));
  }
  
}
