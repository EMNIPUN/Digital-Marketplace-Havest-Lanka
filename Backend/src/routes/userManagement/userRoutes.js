import express from 'express';
import multer from 'multer';
import { registerUser, uploadMiddleware } from "../../controllers/userManagement/UserRegistration.js";
import { ChangePassword, DeleteUserById, filterUsers, FindUserById, ResetPassword, UpdateUserById, uploadUpdateMiddleware } from '../../controllers/userManagement/UserData.js';
import { SendOTP, validateOTP } from '../../controllers/userManagement/ValidateMail.js';

const upload = multer({ dest: "/uploads" });
const uploadUpdate = multer({ dest: "/uploads" })

const router = express.Router();

router.post("/register", uploadMiddleware, registerUser);
router.get("/find/:id", FindUserById);
router.put("/update", uploadUpdateMiddleware, UpdateUserById);
router.delete("/del", DeleteUserById);
router.get("/q", filterUsers)
router.post("/change-password", ChangePassword)
router.post("/reset-password", ResetPassword)
router.post("/otp/send", SendOTP)
router.post("/otp/validate", validateOTP)

export default router;
