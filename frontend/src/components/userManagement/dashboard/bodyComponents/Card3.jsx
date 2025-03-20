import React from 'react';
import CriticalAlert from './CriticalAlert';

function Card3() {
    return (
        <div className='bg-white shadow-md col-span-8 h-[320px] rounded-lg p-2 overflow-hidden'>
            <div className='w-full pb-2'>
                <p className='text-[#464255] font-semibold'>Critical Alerts</p>
            </div>
            <div className='h-full flex flex-col items-center justify-start px-2 relative overflow-y-auto scrollbar-thin scrollbar-thumb-[#0895665b] scrollbar-track-[#ffffff]'>
                <div className="before:content-[''] before:block before:h-4"></div>
                <CriticalAlert message="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
                <CriticalAlert message="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
                <CriticalAlert message="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
                <CriticalAlert message="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
                <CriticalAlert message="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
                <CriticalAlert message="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
                <CriticalAlert message="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
                <div className="after:content-[''] after:block after:h-4 mb-4"></div>
            </div>
        </div>
    );
}

export default Card3;
