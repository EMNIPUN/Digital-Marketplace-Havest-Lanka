import express from 'express';
import multer from 'multer';
import { registerUser, uploadMiddleware } from "../../controllers/userManagement/UserRegistration.js";
import { ChangePassword, DeleteUserById, filterUsers, FindUserById, ResetPassword, UpdateUserById, uploadUpdateMiddleware } from '../../controllers/userManagement/UserData.js';
import { SendOTP, validateOTP } from '../../controllers/userManagement/ValidateMail.js';
import CheckGoogleAuth, { disconnectGoogleAccount } from '../../controllers/userManagement/googleAuth/CheckGoogleAuth.js';
import { authLimiter } from '../../middleware/rateLimiter.js';

const upload = multer({ dest: "/uploads" });
const uploadUpdate = multer({ dest: "/uploads" })

const router = express.Router();

router.post("/register", authLimiter, uploadMiddleware, registerUser);
router.get("/find/:id", FindUserById);
router.put("/update", uploadUpdateMiddleware, UpdateUserById);
router.delete("/del", DeleteUserById);
router.get("/q", filterUsers)
router.post("/change-password", ChangePassword)
router.post("/reset-password", authLimiter, ResetPassword)
router.post("/otp/send", authLimiter, SendOTP)
router.post("/otp/validate", authLimiter, validateOTP)
router.get("/google-auth", CheckGoogleAuth)
router.get("/disconnect-google", disconnectGoogleAccount)

export default router;
