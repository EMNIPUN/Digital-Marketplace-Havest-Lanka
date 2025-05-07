import React from 'react'
import SideNavHeader from './sideNavComponents/SideNavHeader'
import SideNavTabs from './sideNavComponents/SideNavTabs'
import SideNavFooter from './sideNavComponents/SideNavFooter'

function SideNav() {
    return (
        <div className='h-screen w-[242px] grid grid-rows-10 fixed'>
            <div className='row-span-1  flex items-center justify-center'><SideNavHeader /></div>
            <div className='row-span-7  overflow-y-scroll scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent'><SideNavTabs /></div>
            <div className='row-span-2  flex items-center justify-center'><SideNavFooter /></div>
        </div>
    )
}

export default SideNav