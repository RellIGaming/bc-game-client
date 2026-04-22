const socket = {
  on: (_event: string, _callback: (...args: any[]) => void) => {},
  off: (_event: string, _callback?: (...args: any[]) => void) => {},
  emit: (_event: string, ..._args: any[]) => {},
  connect: () => {},
  disconnect: () => {},
  connected: false,
};

export default socket;
