import React from 'react';
import HomeHeader from '../../../components/userManagement/dashboard/bodyComponents/HomeHeader';
import Card1 from '../../../components/userManagement/dashboard/bodyComponents/Card1';
import Card2 from '../../../components/userManagement/dashboard/bodyComponents/Card2';
import Card3 from '../../../components/userManagement/dashboard/bodyComponents/Card3';
import Card4 from '../../../components/userManagement/dashboard/bodyComponents/Card4';
import Card5 from '../../../components/userManagement/dashboard/bodyComponents/Card5';
import CPU from '../../../assets/userManagement/Group 206.svg';
import MemoryCard from '../../../assets/userManagement/memoryCard.svg';
import SolidDisk from '../../../assets/userManagement/solid state disk_.svg';
import People from '../../../assets/userManagement/every user.svg';

function AdminDashboardHome() {
    return (
        <div className='w-full -mt-2 p-2'>
            <div className='mr-6'>
                <div>
                    <HomeHeader />
                </div>

                <div className='p-2 mt-2 grid grid-cols-12 gap-5'>
                    <Card1 cardName="CPU Usage" icon={CPU} value="54%" />
                    <Card1 cardName="Memory Usage" icon={MemoryCard} value="41%" />
                    <Card1 cardName="Disk Usage" icon={SolidDisk} value="55%" />
                    <Card1 cardName="Active Sessions" icon={People} value="313" />
                </div>

                <div className='p-2 mt-2 grid grid-cols-12 gap-5'>
                    <Card2 cardName="Pie Charts" chartType="pie" />
                    <Card2 cardName="System Load" chartType="line" />
                </div>

                <div className='p-2 mt-2 grid grid-cols-12 gap-5'>
                    <Card3 />
                    <Card4 />
                </div>

                <div className='p-2 mt-2 grid grid-cols-12 gap-5'>
                    <Card5 />
                </div>
            </div>
        </div>
    );
}

export default AdminDashboardHome;
