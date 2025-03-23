import React, { useState, useRef, useEffect } from 'react';
import SearchBar from './topNavComponents/SearchBar';
import { Bell, Gear, Message } from '../icons/Icons';
import Account from './topNavComponents/Account';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Mail } from 'lucide-react';

function TopNav() {
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, text: 'New message received', read: false },
        { id: 2, text: 'Settings updated', read: false },
    ]);
    const notificationRef = useRef(null);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const markAsRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

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
                        {showNotifications && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className='absolute top-[30px] right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-3 notification-popup'
                            >
                                <h3 className='text-lg font-semibold mb-2'>Notifications</h3>
                                {notifications.length > 0 ? (
                                    notifications.map(notification => (
                                        <div key={notification.id} className={`flex items-center p-2 rounded-lg ${notification.read ? 'opacity-50' : ''}`}>
                                            <Mail size={16} className='mr-2 text-blue-500' />
                                            <span className='ml-2 flex-1'>{notification.text}</span>
                                            {!notification.read && (
                                                <button onClick={() => markAsRead(notification.id)} className='ml-2 text-blue-500'>
                                                    <CheckCircle size={16} />
                                                </button>
                                            )}
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
                <div className='flex items-center justify-center cursor-pointer' onClick={() => navigate('/profile')}>
                    <Account />
                </div>
            </div>
        </div>
    );
}

export default TopNav;