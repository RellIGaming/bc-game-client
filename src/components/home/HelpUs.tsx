import React from 'react';
import Providers from './Providers';
import GameFooterLogo from './GameFooterLogo';

const HelpUs = () => {
    return (
        <div  className='bg-sidebar border-t border-border/30 py-4 b-radius hidden md:block'>
            {/* Crypto Online Casino Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                    <h3 className="text-base font-bold text-foreground mb-2">Crypto Online Casino</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        Explore 5000+ slots, live dealer tables, crash and original games, plus full sports betting with one-click login at any time. Instant deposits, low fees, and withdrawals.
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                        Our proprietary fair system is the distributed PRNG concept model. Use web3 fairness casino and sports platform. Design degen memes, and your mobile money safe. Easy play on this website apps. How to make real passive wealth. Round hold NPC tool are so user-connect. Simply users and built for real-money crypto gaming.
                    </p>
                </div>
                <div>
                    <h3 className="text-base font-bold text-foreground mb-2">Help us improve your experience</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        Got searched for your valuable feedback!
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                        Feel free: <span className="text-primary cursor-pointer hover:underline">Feedback Form</span>
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                        If you find any vulnerabilities file or error, please contact us ASAP for internal issues (Only any related issues will be rewarded)
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                        Send to email: <span className="text-primary">security@Rellbet</span>
                    </p>
                </div>
            </div>
             <Providers />
             {/* <GameFooterLogo/> */}
        </div>
    );
};

export default HelpUs;