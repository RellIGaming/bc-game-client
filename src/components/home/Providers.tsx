import React from 'react';
import kwara from "../../assets/images/kwara_united-DSF0nKGD.png"
import leicester from "../../assets/images/leicester-5bY-JKgX.png"
import gamcare from "../../assets/images/gamcare-ocLkkk6e.png"
import sigma from "../../assets/images/sigma-DzhjGPHa.png"
import bestOn from "../../assets/images/bestOn-icon.png"

const Providers = () => {
     const providers = [bestOn, bestOn, bestOn, bestOn , bestOn , bestOn , bestOn, bestOn];
    return (
        <div className='bg-sidebar border-t border-b border-border/30 py-4'>
            <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 lg:gap-3 b-radius">
                {providers.map((provide, i) => (
                    <div className='w-30 h-16 p-4 bg-[#213744] rounded-lg'>
                        <img key={i} src={provide} alt="logo" className='w-20 h-8 ' />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Providers;