// AdminDashboardHome.js
import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import { BASE_URL } from '../../../components/userManagement/BaseUrl';
import ServerInfoProvider from '../../../components/userManagement/dashboard/bodyComponents/ServerInfoProvider';
import Token from '@/components/userManagement/logins/Token';

function AdminDashboardHome() {
    const [activeSessions, setActiveSessions] = useState(0);

    useEffect(() => {
        const fetchActiveSessions = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/admin/getactivesessions`);
                const newActiveSessions = response.data.activeSessions;
                setActiveSessions(prev => (prev !== newActiveSessions ? newActiveSessions : prev));
            } catch (error) {
                console.error(`Error fetching active sessions: ${error.message}`);
            }
        };

        fetchActiveSessions();
        const interval = setInterval(fetchActiveSessions, 5000);
        return () => clearInterval(interval);
    }, []);


    return (
        <ServerInfoProvider>
            {serverInfo => (
                <div className='w-full -mt-2 p-2'>
                    <div className='mr-6'>
                        <div>
                            <HomeHeader upTime={serverInfo.upTime || 'Loading...'} />
                        </div>

                        <div className='p-2 mt-2 grid grid-cols-12 gap-5'>
                            <Card1 cardName="CPU Usage" icon={CPU} value={serverInfo.cpuUsage ? `${serverInfo.cpuUsage}%` : 'Loading...'} />
                            <Card1 cardName="Memory Usage" icon={MemoryCard} value={serverInfo.ramUsage ? `${serverInfo.ramUsage}%` : 'Loading...'} />
                            <Card1 cardName="Disk Usage" icon={SolidDisk} value={serverInfo.diskUsage ? `${serverInfo.diskUsage}%` : 'Loading...'} />
                            <Card1 cardName="Active Sessions" icon={People} value={activeSessions ? `${activeSessions}` : 'Loading...'} />
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
            )}
        </ServerInfoProvider>
    );
}

export default AdminDashboardHome;
