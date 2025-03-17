import axios from 'axios'
import react, { useEffect, useState } from 'react'
import { BASE_URL } from '../BaseUrl'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom';

const CheckAuth = () => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        axios.get(`${BASE_URL}/check-auth`, { withCredentials: true })
            .then(response => {
                setIsAuthenticated(response.data.loggedIn);
                setLoading(false);
            })
            .catch(() => {
                setIsAuthenticated(false);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login/portal" replace />;
}

export default CheckAuth