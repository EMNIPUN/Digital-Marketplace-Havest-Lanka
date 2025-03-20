import React from 'react'

function Card1(props) {
    return (
        <div className='col-span-3 h-[120px] p-2 flex items-center justify-center rounded-lg bg-white shadow-md'>
            <div className='mr-1 bg-[#00b07527] p-2 rounded-full'>
                <img src={props.icon}></img>
            </div>
            <div className='flex flex-col items-start justify-center ml-1 -mt-1'>
                <p className='text-[30px] font-bold text-[#464255]'>{props.value}</p>
                <p className='text-[12px] font-light text-[#464255] -mt-2'>{props.cardName}</p>
            </div>
        </div>
    )
}

export default Card1