import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../BaseUrl';
import Token from './Token';

const Logout = () => {
    const navigate = useNavigate()
    const userId = Token().userId

    useEffect(() => {
        const logout = async () => {
            try {
                await axios.post(`${BASE_URL}/logout`, { val: true, userId }, { withCredentials: true });
            } catch (error) {
                console.error("Logout failed:", error);
            } finally {
                navigate('/login/portal');
            }
        };

        logout();
    }, [navigate, userId]); // also add userId here

    return null;
};

export default Logout;
