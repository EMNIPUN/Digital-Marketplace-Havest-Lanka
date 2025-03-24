import React, { useState } from 'react';
import SideNavTab from './SideNavTab';
import { CheckedGrid, Configs, FileIcon, Folder, Glob2, PensilSquare, People, PersonLinesFill } from '../../icons/Icons';
import SideNavSubTab from './SideNavSubTab';

function SideNavTabs() {
    const [activeTabUrl, setActiveTabUrl] = useState(window.location.pathname);

    const recieveActiveTabUrl = (url) => {
        setActiveTabUrl(url);
    };

    return (
        <div className='w-full flex flex-col justify-center gap-1 mt-5'>
            <SideNavTab sendActiveTabUrl={recieveActiveTabUrl} icon={<CheckedGrid />} active={activeTabUrl} tabName="Dashboard" url="/admin" />

            <SideNavTab allowSubRoutes={true} sendActiveTabUrl={recieveActiveTabUrl} icon={<PersonLinesFill />} active={activeTabUrl} tabName="User Registration" url="/admin/user-registration">
                <SideNavSubTab sendActiveTabUrl={recieveActiveTabUrl} activeTabUrl={activeTabUrl} tabName="Register Shop Owner" url="/admin/user-registration/register-shop-owner" />
                <SideNavSubTab sendActiveTabUrl={recieveActiveTabUrl} activeTabUrl={activeTabUrl} tabName="Manage Users" url="/admin/user-registration/manage-users" />
            </SideNavTab>

            <SideNavTab sendActiveTabUrl={recieveActiveTabUrl} icon={<FileIcon />} active={activeTabUrl} tabName="Authentications" url="/admin/authentications" />
            <SideNavTab sendActiveTabUrl={recieveActiveTabUrl} icon={<People />} active={activeTabUrl} tabName="Access Control" url="/admin/access-control" />
            <SideNavTab sendActiveTabUrl={recieveActiveTabUrl} icon={<PensilSquare />} active={activeTabUrl} tabName="Account Management" url="/admin/account-management" />
            <SideNavTab sendActiveTabUrl={recieveActiveTabUrl} icon={<Glob2 />} active={activeTabUrl} tabName="Activity Monitoring" url="/admin/activity-monitoring" />
            <SideNavTab sendActiveTabUrl={recieveActiveTabUrl} icon={<Folder />} active={activeTabUrl} tabName="Administration Tools" url="/admin/administration-tools" />
            <SideNavTab sendActiveTabUrl={recieveActiveTabUrl} icon={<Configs />} active={activeTabUrl} tabName="System Configurations" url="/admin/system-configurations" />
        </div>
    );
}

export default SideNavTabs;
