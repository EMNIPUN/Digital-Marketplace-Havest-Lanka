import React from 'react'
import { Glob, ClockHistory, Telephone, Envelop } from '../../icons/Icons'

function SideNavFooter() {
    return (
        <div className='bg-[#00B074] w-full h-full flex items-center justify-center'>

            <div className='text-[#fff]'>
                <div><h3>HarvestLanka</h3></div>
                <div>
                    <div className='flex'>
                        <div><Glob /></div>
                        <div className='text-xs'>Version: 1.3.2</div>
                    </div>
                    <div className='flex'>
                        <div><ClockHistory /></div>
                        <div className='text-xs'>Last Updated: February 2025</div>
                    </div>
                    <div className='flex'>
                        <div><Telephone /></div>
                        <div className='text-xs'>Helpline: +94 XX XXX XXXX</div>
                    </div>
                    <div className='flex'>
                        <div><Envelop /></div>
                        <div className='text-xs'>Contact Support: support@team.lk</div>
                    </div>
                </div>
                <div><p className='text-[10px]'>© 2025 HarvestLanka. All rights Reserved.</p></div>
            </div>

        </div>
    )
}

export default SideNavFooter