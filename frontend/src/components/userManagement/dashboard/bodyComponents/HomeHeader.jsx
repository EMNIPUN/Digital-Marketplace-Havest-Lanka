import React, { useEffect, useState } from 'react';
import Token from '../../logins/Token';
import { PcDisplay } from '../../icons/Icons';
import axios from 'axios';

function HomeHeader(props) {
    const token = Token();
    const [upTime, setUptime] = useState('');

    useEffect(() => {
        const fetchUptime = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/server');

                if (response.data && response.data.data) {
                    setUptime(response.data.data.upTime);
                } else {
                    console.error("Invalid response structure:", response.data);
                }
            } catch (e) {
                console.error(`Error fetching uptime: ${e.message}`);
            }
        };

        fetchUptime();
        const interval = setInterval(fetchUptime, 10000);
        return () => clearInterval(interval);

    }, []);

    return (
        <div className='flex items-center justify-between -mt-[60px]'>
            <div>
                <h3 className='text-[#464255] font-semibold text-lg'>Dashboard</h3>
                {window.location.pathname.startsWith('/admin') && (
                    <p className='text-[#A3A3A3] text-xs'>{`Hi ${token.name}, Welcome back to Harverst Lanka Administration`}</p>
                )}
            </div>
            <div className='flex items-center justify-evenly bg-[#fff] rounded-lg shadow-sm p-[7px]'>
                <div className='bg-[#2d9bdb21] p-2 rounded-xl'>
                    <PcDisplay />
                </div>
                <div className='flex flex-col items-start justify-center ml-3'>
                    <div className='text-[13px] text-[#108A01]'>System Online</div>
                    <div className='text-[13px] text-[#3E4954]'>Uptime - {props.upTime}</div>
                </div>
            </div>
        </div>
    );
}

export default HomeHeader;
