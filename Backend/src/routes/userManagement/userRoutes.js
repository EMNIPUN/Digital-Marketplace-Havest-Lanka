import express from 'express'
import { registerUser, uploadMiddleware } from "../../controllers/userManagement/UserRegistration.js"


const router = express.Router()

router.post("/register", uploadMiddleware, registerUser)

export default router