import express from 'express'
import Logout from '../../controllers/userManagement/Logout.js'

const router = express.Router()

router.post("/", Logout)

export default router