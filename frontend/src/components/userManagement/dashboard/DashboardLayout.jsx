import React from 'react'
import SideNav from './SideNav'
import TopNav from './TopNav'
import Body from './Body'

function DashboardLayout() {
    return (
        <div className='grid grid-cols-10 h-screen w-screen fixed'>
            <div className='col-span-2 '><SideNav /></div>
            <div className='col-span-8  grid grid-rows-10 bg-[#F3F2F7]'>
                <div className='row-span-1 '><TopNav /></div>
                <div className='row-span-9 '><Body /></div>
            </div>
        </div>
    )
}

export default DashboardLayout