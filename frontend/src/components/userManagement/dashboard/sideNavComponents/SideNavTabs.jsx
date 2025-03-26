import React, { useState, useEffect } from 'react';
import SideNavTab from './SideNavTab';
import { CheckedGrid, Configs, FileIcon, Folder, Glob2, PensilSquare, People, PersonLinesFill } from '../../icons/Icons';
import SideNavSubTab from './SideNavSubTab';
import { useLocation } from 'react-router-dom';

function SideNavTabs() {
    const location = useLocation();
    const [activeTabUrl, setActiveTabUrl] = useState(location.pathname);

    useEffect(() => {
        setActiveTabUrl(location.pathname);
    }, [location.pathname]);

    const recieveActiveTabUrl = (url) => {
        setActiveTabUrl(url);
    };

    return (
        <div className='w-full flex flex-col justify-center gap-1 mt-5'>
            <SideNavTab sendActiveTabUrl={recieveActiveTabUrl} icon={<CheckedGrid />} active={activeTabUrl} tabName="Dashboard" url="/admin" />

            <SideNavTab sendActiveTabUrl={recieveActiveTabUrl} icon={<People />} active={activeTabUrl} tabName="Account Management" url="/admin/account-management" />

            <SideNavTab allowSubRoutes={true} sendActiveTabUrl={recieveActiveTabUrl} icon={<PersonLinesFill />} active={activeTabUrl} tabName="User Registration" url="/admin/user-registration">
                <SideNavSubTab sendActiveTabUrl={recieveActiveTabUrl} activeTabUrl={activeTabUrl} tabName="Shop Owners" url="/admin/user-registration/shop-owner" />
                <SideNavSubTab sendActiveTabUrl={recieveActiveTabUrl} activeTabUrl={activeTabUrl} tabName="Drivers" url="/admin/user-registration/driver" />
                <SideNavSubTab sendActiveTabUrl={recieveActiveTabUrl} activeTabUrl={activeTabUrl} tabName="Finance Managers" url="/admin/user-registration/finance-manager" />
                <SideNavSubTab sendActiveTabUrl={recieveActiveTabUrl} activeTabUrl={activeTabUrl} tabName="Transport Managers" url="/admin/user-registration/transport-manager" />
                <SideNavSubTab sendActiveTabUrl={recieveActiveTabUrl} activeTabUrl={activeTabUrl} tabName="Market Managers" url="/admin/user-registration/market-manager" />
            </SideNavTab>

            <SideNavTab sendActiveTabUrl={recieveActiveTabUrl} icon={<FileIcon />} active={activeTabUrl} tabName="Reports" url="/admin/reports" />

            <SideNavTab sendActiveTabUrl={recieveActiveTabUrl} icon={<Glob2 />} active={activeTabUrl} tabName="Activity Monitoring" url="/admin/activity-monitoring" />

            <SideNavTab sendActiveTabUrl={recieveActiveTabUrl} icon={<Folder />} active={activeTabUrl} tabName="Administration Tools" url="/admin/administration-tools" />

            <SideNavTab sendActiveTabUrl={recieveActiveTabUrl} icon={<Configs />} active={activeTabUrl} tabName="System Configurations" url="/admin/system-configurations" />
        </div>
    );
}

export default SideNavTabs;
