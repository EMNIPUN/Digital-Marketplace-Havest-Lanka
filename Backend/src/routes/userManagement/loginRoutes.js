import express from 'express'
import { Login } from '../../controllers/userManagement/Login.js'
import { googleAuth, googleCallback } from '../../controllers/userManagement/googleAuth/GoogleAuth.js'
import { googleAuthLogin, googleCallbackLogin } from '../../controllers/userManagement/googleAuth/GoogleLogin.js'

const router = express.Router()

router.post("/", Login)
router.get("/google/login/:role", googleAuthLogin)
router.get("/google/callback/login", googleCallbackLogin)
router.get('/google', googleAuth)
router.get('/google/callback', googleCallback)

export default router