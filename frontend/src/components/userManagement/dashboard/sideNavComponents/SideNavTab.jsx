import React from 'react';
import { Link } from 'react-router-dom';

function SideNavTab({ url, active, icon, tabName, sendActiveTabUrl, children, allowSubRoutes = false }) {

    const isActive = allowSubRoutes ? active.startsWith(url) : url === active;

    return (
        <div className="w-full">
            <Link
                className={`p-2 flex items-center ml-2 rounded-lg cursor-pointer 
          ${isActive ? 'bg-[#00b07527] font-bold text-[#00B074]' : 'text-[#464255]'}`}
                to={url}
                onClick={() => sendActiveTabUrl(url)}
            >
                <div className='flex items-center justify-center mt-[1px] mr-2'>{icon}</div>
                <div className='flex items-center justify-center text-[15px]'>{tabName}</div>
            </Link>
            {isActive && children && <div className="ml-6">{children}</div>}
        </div>
    );

}

export default SideNavTab;
