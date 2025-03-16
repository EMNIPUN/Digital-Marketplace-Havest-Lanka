import express from 'express'
import { Login } from '../../controllers/userManagement/Login.js'

const router = express.Router()

router.post("/", Login)

export default router