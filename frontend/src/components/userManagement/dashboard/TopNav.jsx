import React from 'react'
import SearchBar from './topNavComponents/SearchBar'
import { Bell, Gear, Message } from '../icons/Icons'
import Account from './topNavComponents/Account'
import { useNavigate } from 'react-router-dom'

function TopNav() {

    const navigate = useNavigate()

    const redirect = () => {
        navigate('/profile')
    }

    return (
        <div className='w-full grid grid-cols-10 p-2'>
            <div className='col-span-6'>
                <SearchBar />
            </div>
            <div className='w-full col-span-4 grid grid-cols-2 '>
                <div className='flex items-center justify-evenly'>
                    <div className='bg-[#2d9bdb48] p-2 rounded-full flex items-center justify-center'><Bell /></div>
                    <div className='bg-[#2d9bdb48] p-2 rounded-full flex items-center justify-center'><Message /></div>
                    <div className='bg-[#ff5b5b4d] p-2 rounded-full flex items-center justify-center'><Gear /></div>
                </div>
                <div className='flex items-center justify-center cursor-pointer' onClick={() => redirect()}>
                    <Account />
                </div>
            </div>
        </div>
    )
}

export default TopNav