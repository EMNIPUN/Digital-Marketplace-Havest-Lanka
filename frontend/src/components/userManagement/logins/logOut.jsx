import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../BaseUrl';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                await axios.post(`${BASE_URL}/logout`, { val: true }, { withCredentials: true });
            } catch (error) {
                console.error("Logout failed:", error);
            } finally {
                navigate('/login/portal');
            }
        };

        logout();
    }, [navigate]);

    return null;
};

export default Logout;
