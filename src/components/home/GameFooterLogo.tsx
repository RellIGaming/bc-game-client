import React from 'react';
import kwara from "../../assets/images/kwara_united-DSF0nKGD.png"
import bestOn from "../../assets/images/bestOn-icon.png"
import gamcare from "../../assets/images/disco-icon.png"
import sigma from "../../assets/images/18-icon.png"

const providers = [sigma, bestOn, gamcare,];

const GameFooterLogo = () => {

    return (
        <div className="bg-sidebar border-t border-b border-border/30 px-2 py-2 sm:px-4 sm:py-1">
            <div className="flex justify-between items-center">
                {providers.map((provide, i) => (
                    <img
                        key={i}
                        src={provide}
                        alt="logo"
                        className="w-10 sm:w-10 lg:w-10 h-auto rounded"
                    />
                ))}
            </div>
        </div>
    );
};

export default GameFooterLogo;