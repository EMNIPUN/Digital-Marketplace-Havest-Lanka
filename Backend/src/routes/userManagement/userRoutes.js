import express from 'express';
import multer from 'multer';
import { registerUser, uploadMiddleware } from "../../controllers/userManagement/UserRegistration.js";
import { ChangePassword, DeleteUserById, filterUsers, FindUserById, UpdateUserById } from '../../controllers/userManagement/UserData.js';

const upload = multer({ dest: "/uploads" });

const router = express.Router();

router.post("/register", uploadMiddleware, registerUser);
router.get("/find/:id", FindUserById);
router.put("/update", upload.single("displayPicture"), UpdateUserById);
router.delete("/del", DeleteUserById);
router.get("/q", filterUsers)
router.post("/change-password", ChangePassword)

export default router;
