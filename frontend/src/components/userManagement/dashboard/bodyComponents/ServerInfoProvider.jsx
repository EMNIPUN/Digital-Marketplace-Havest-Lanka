import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../BaseUrl';

const ServerInfoProvider = ({ children }) => {
    const [serverInfo, setServerInfo] = useState(() => {
        const storedData = sessionStorage.getItem("serverData");
        return storedData ? JSON.parse(storedData) : {};
    });

    const fetchServerInfo = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/admin/server`);
            const newData = response.data?.data || {};

            setServerInfo(prev => {
                if (JSON.stringify(prev) !== JSON.stringify(newData)) {
                    sessionStorage.setItem("serverData", JSON.stringify(newData));
                    return newData;
                }
                return prev;
            });
        } catch (error) {
            console.error(`Error fetching server info: ${error.message}`);
        }
    }, []);

    useEffect(() => {
        fetchServerInfo();
        const interval = setInterval(fetchServerInfo, 5000);
        return () => clearInterval(interval);
    }, [fetchServerInfo]);

    return children(serverInfo);
};

export default ServerInfoProvider;
