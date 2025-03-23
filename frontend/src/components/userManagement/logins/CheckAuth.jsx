import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../BaseUrl';
import { Outlet, Navigate } from 'react-router-dom';

const CheckAuth = () => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            axios.get(`${BASE_URL}/check-auth`, { withCredentials: true })
                .then(response => {
                    setIsAuthenticated(response.data.loggedIn);
                    setLoading(false);
                })
                .catch(() => {
                    setIsAuthenticated(false);
                    setLoading(false);
                });
        }, 2000);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-green-950">
                <div className="flex flex-col items-center">
                    <div className="flex space-x-2">
                        <span className="w-5 h-5 bg-white rounded-full animate-bounce p-5" style={{ animation: 'grow 1s infinite', animationDelay: '0s' }}></span>
                        <span className="w-5 h-5 bg-white rounded-full animate-bounce p-5" style={{ animation: 'grow 1s infinite', animationDelay: '0.2s' }}></span>
                        <span className="w-5 h-5 bg-white rounded-full animate-bounce p-5" style={{ animation: 'grow 1s infinite', animationDelay: '0.4s' }}></span>
                        <span className="w-5 h-5 bg-white rounded-full animate-bounce p-5" style={{ animation: 'grow 1s infinite', animationDelay: '0.6s' }}></span>
                    </div>
                    <p className="mt-4 text-white text-lg font-semibold">Loading...</p>
                </div>
            </div>
        );
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login/portal" replace />;
}

export default CheckAuth;
