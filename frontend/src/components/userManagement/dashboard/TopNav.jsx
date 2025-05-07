import React, { useState, useRef, useEffect } from 'react';
import SearchBar from './topNavComponents/SearchBar';
import { Bell, Gear, Message } from '../icons/Icons';
import Account from './topNavComponents/Account';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { BASE_URL } from '../BaseUrl';

function TopNav() {
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const notificationRef = useRef(null);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    useEffect(() => {
        async function fetchBroadcasts() {
            try {
                const response = await fetch(`${BASE_URL}/api/admin/broadcast/get`);
                if (!response.ok) throw new Error("Failed to fetch notifications");

                const data = await response.json();
                const broadcasts = data.broadcasts || [];
                setNotifications(broadcasts.reverse());
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        }

        fetchBroadcasts();
        const interval = setInterval(fetchBroadcasts, 2000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target) &&
                !event.target.closest('.notification-popup')
            ) {
                setShowNotifications(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='w-full grid grid-cols-10 p-2 relative'>
            <div className='col-span-6'>
                <SearchBar />
            </div>
            <div className='w-full col-span-4 grid grid-cols-2'>
                <div className='flex items-center justify-evenly relative'>
                    <div
                        className='bg-[#2d9bdb48] p-2 rounded-full flex items-center justify-center cursor-pointer relative'
                        onClick={toggleNotifications}
                        ref={notificationRef}
                    >
                        <Bell />
                        {notifications.length > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                                {notifications.length}
                            </span>
                        )}
                        {showNotifications && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className='absolute z-20 w-[400px] h-[270px] overflow-y-auto top-[30px] right-0 mt-2 bg-white shadow-lg rounded-lg p-3 notification-popup'
                            >
                                <h3 className='text-lg font-semibold mb-2'>Notifications</h3>
                                {notifications.length > 0 ? (
                                    notifications.map((notification, index) => (
                                        <div key={notification._id} className='p-2'>
                                            <div className="flex items-start">
                                                <Mail size={16} className='mr-2 text-blue-500' />
                                                <div className='flex-1'>
                                                    <p className='font-bold'>{notification.title}</p>
                                                    <p className='text-sm text-gray-600'>{notification.message}</p>
                                                    <p className='text-xs text-gray-400 mt-1'>
                                                        {formatDate(notification.timestamp)}
                                                    </p>
                                                </div>
                                            </div>
                                            {index !== notifications.length - 1 && <hr className="my-2 border-gray-300" />} {/* Line Separator */}
                                        </div>
                                    ))
                                ) : (
                                    <p className='text-gray-500 text-sm'>No new notifications</p>
                                )}
                            </motion.div>
                        )}
                    </div>
                    <div className='bg-[#2d9bdb48] p-2 rounded-full flex items-center justify-center'><Message /></div>
                    <div className='bg-[#ff5b5b4d] p-2 rounded-full flex items-center justify-center'><Gear /></div>
                </div>
                <div className='flex items-center justify-center cursor-pointer'>
                    <Account />
                </div>
            </div>
        </div>
    );
}

export default TopNav;
