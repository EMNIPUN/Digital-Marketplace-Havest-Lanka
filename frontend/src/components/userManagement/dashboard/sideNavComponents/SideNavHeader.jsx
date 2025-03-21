import React from 'react'
import Logo from '/logo.png'

function SideNavHeader() {
    return (
        <div className='w-40'>
            <img src={Logo} alt='logo.png' />
            <p className='text-[10px] text-[#B9BBBD]'>Dambulla Special Economics Centre</p>
        </div>
    )
}

export default SideNavHeader