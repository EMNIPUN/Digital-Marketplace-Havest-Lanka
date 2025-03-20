import { TriangleAlert } from 'lucide-react'
import React from 'react'

function CriticalAlert(props) {
    return (
        <div className='bg-[#00b0753d] p-1 rounded-md flex items-center justify-around w-full mb-2'>
            <div className='flex items-center justify-center text-[#000000cc]'>
                <TriangleAlert color='#FF0000' />
                <p className='ml-2 text-sm'>{props.message}</p>
            </div>
            <div>
                <button className='bg-[#00B074] hover:bg-[#1e8e69] p-2 text-sm font-semibold text-white rounded-md'>More Details</button>
            </div>
        </div>
    )
}

export default CriticalAlert