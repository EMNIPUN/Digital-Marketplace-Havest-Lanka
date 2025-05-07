import React from 'react';
import Token from '../../logins/Token';
import { Link } from 'react-router-dom';

function Account() {
    const tokenData = Token();

    const nameParts = tokenData.name.split(" ");
    const displayName = nameParts.length > 1 ? nameParts.slice(0, -1).join(" ") : tokenData.name;

    return (
        <Link to={`/profile/${tokenData.userId}`}>
            <div className='-ml-[20px] flex items-center justify-center p-1 rounded-md h-full bg-gradient-to-r from-[#00b075] to-[#00b075a5]'>
                <p className='mr-2 text-white text-sm'>Hello, {displayName}</p>
                <div className='w-10 h-10 overflow-hidden rounded-full border-2 border-white shadow-md'>
                    <img
                        className='w-full h-full object-cover'
                        src={`http://localhost:8005${tokenData.displayPicture}`}
                        alt='Profile'
                    />
                </div>
            </div>
        </Link>
    );
}

export default Account;
