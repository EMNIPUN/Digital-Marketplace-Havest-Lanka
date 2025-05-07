import React from 'react'
import RegisterForm from '../../../components/userManagement/dashboard/bodyComponents/RegisterForm'

function FarmerRegistration() {
    return (
        <div className=' flex items-center justify-center p-4'>
            <div className='w-3/4 bg-white'>
                <RegisterForm formName="Registration Form" role="farmer" />
            </div>
        </div>
    )
}

export default FarmerRegistration