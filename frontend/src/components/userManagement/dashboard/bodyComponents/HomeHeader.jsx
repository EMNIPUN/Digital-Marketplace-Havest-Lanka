import React from 'react'
import Token from '../../logins/Token'
import { PcDisplay } from '../../icons/Icons'

function HomeHeader() {

    const token = Token()

    const welcomePara = () => {
        if (window.location.pathname == '/admin' || window.location.pathname == '/admin/') {
            return (
                <p className='text-[#A3A3A3] text-xs'>{`Hi ${token.name}, Welcome back to Harverst Lanka Administration`}</p>
            )
        }
    }

    return (
        <div className='flex items-center justify-between -mt-[60px]'>
            <div>
                <h3 className='text-[#464255] font-semibold text-lg'>Dashboard</h3>
                {welcomePara()}
            </div>
            <div className='flex items-center justify-evenly bg-[#fff] rounded-lg shadow-sm p-[7px]'>
                <div className='bg-[#2d9bdb21] p-2 rounded-xl'>
                    <PcDisplay />
                </div>
                <div className='flex flex-col items-start justify-center ml-3'>
                    <div className='text-[13px] text-[#108A01]'>System Online</div>
                    <div className='text-[13px] text-[#3E4954]'>Uptime - 3m 27d</div>
                </div>
            </div>
        </div>
    )
}

export default HomeHeader