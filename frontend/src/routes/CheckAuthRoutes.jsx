import react from 'react'
import CheckAuth from '../components/userManagement/logins/CheckAuth'
import { Routes, Route } from 'react-router-dom'

const CheckAuthRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<CheckAuth />}></Route>
        </Routes>
    )
}

export default CheckAuthRoute