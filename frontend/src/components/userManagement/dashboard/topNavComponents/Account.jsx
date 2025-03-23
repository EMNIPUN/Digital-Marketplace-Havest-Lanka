import React from 'react';
import Token from '../../logins/Token';

function Account() {
    const tokenData = Token();

    const nameParts = tokenData.name.split(" ");
    const displayName = nameParts.length > 1 ? nameParts.slice(0, -1).join(" ") : tokenData.name;

    return (
        <div className='flex items-center justify-center p-2 rounded-md h-full bg-gradient-to-r from-[#00b075] to-[#00b075a5]'>
            <p className='mr-2 text-[#fff] text-[15px]'>Hello, {displayName}</p>
            <div className='flex items-center justify-center rounded-[50px]'>
                <img className='text-[#fff]' src="" alt='pp' />
            </div>
        </div>
    );
}

export default Account;
