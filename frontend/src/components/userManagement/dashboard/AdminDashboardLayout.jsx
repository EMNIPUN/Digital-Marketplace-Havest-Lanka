import React from 'react';
import SideNav from './SideNav';
import TopNav from './TopNav';
import { Outlet } from 'react-router-dom';

function DashboardLayout() {
    return (
        <div id="dashboard-layout" className='grid grid-cols-10 h-screen w-screen overflow-y-scroll scrollbar-thin scrollbar-thumb-[#089566] scrollbar-track-[#f3f2f7]'>
            <div className='col-span-2'><SideNav /></div>
            <div className='col-span-8 grid grid-rows-10 bg-[#F3F2F7]'>
                <div className='row-span-1'><TopNav /></div>
                <div className='row-span-9'><Outlet /></div>
            </div>
        </div>
    );
}

export default DashboardLayout;
