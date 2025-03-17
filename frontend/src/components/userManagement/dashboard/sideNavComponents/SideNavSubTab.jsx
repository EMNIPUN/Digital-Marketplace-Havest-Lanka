import React from 'react';
import { Link } from 'react-router-dom';

function SideNavSubTab({ activeTabUrl, tabName, url, sendActiveTabUrl }) {
    return (
        <Link
            className={`block p-2 ml-4 rounded-lg cursor-pointer text-sm mt-1
                ${url === activeTabUrl ? 'bg-[#00b07527] font-bold text-[#00B074]' : 'text-[#464255]'}`}
            to={url}
            onClick={() => sendActiveTabUrl(url)}
        >
            {tabName}
        </Link>
    );
}

export default SideNavSubTab;
