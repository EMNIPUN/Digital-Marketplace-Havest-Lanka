import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'

const Token = () => {
    const navigate = useNavigate()
    const tok = Cookies.get('token')
    if (!tok) {
        navigate('/login-portal')
    }
    const token = jwtDecode(tok)
    return token
}

export default Token;
