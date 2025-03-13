import React from 'react'
import { Glob, ClockHistory, Telephone, Envelop } from '../../icons/Icons'
import Farmer from '../../../../assets/userManagement/farmer1.svg'

function SideNavFooter() {
    return (
        <div className='bg-[#00B074] w-full h-full flex items-center justify-center relative rounded-t-lg'>

            <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-700 rounded-t-lg  to-neutral-950 opacity-[.20] z-[1] absolute'></div>

            <div className='text-[#fff]  h-full w-[90%] flex flex-col items-center justify-between z-[2]'>
                <div><h3 className='text-[20px]  text-center font-bold'>HarvestLanka</h3></div>
                <div className='flex flex-col justify-center -ml-10'>
                    <div className='flex items-center gap-2 mb-[3px]'>
                        <div><Glob width="12px" height="12px" fill="#464255" /></div>
                        <div className='font-light text-xs text-stone-50'>Version: 1.3.2</div>
                    </div>
                    <div className='flex items-center gap-2 mb-[3px]'>
                        <div><ClockHistory width="12px" height="12px" fill="#464255" /></div>
                        <div className='font-light text-xs text-stone-50'>Last Updated: February 2025</div>
                    </div>
                    <div className='flex items-center gap-2 mb-[3px]'>
                        <div><Telephone width="12px" height="12px" fill="#464255" /></div>
                        <div className='font-light text-xs text-stone-50'>Helpline: +94 XX XXX XXXX</div>
                    </div>
                    <div className='flex items-center gap-2 mb-[3px]'>
                        <div><Envelop width="12px" height="12px" fill="#464255" /></div>
                        <div className='font-light text-xs' text-stone-50>Contact Support: support@team.lk</div>
                    </div>
                </div>
                <div><p className='text-[10px] text-stone-200'>© 2025 HarvestLanka. All rights Reserved.</p></div>
            </div>


            <img className='absolute -right-10 z-[1]' src={Farmer} />

        </div>
    )
}

export default SideNavFooter