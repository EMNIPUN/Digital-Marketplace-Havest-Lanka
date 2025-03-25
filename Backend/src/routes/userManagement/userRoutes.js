import express from 'express';
import multer from 'multer';
import { registerUser, uploadMiddleware } from "../../controllers/userManagement/UserRegistration.js";
import { DeleteUserById, filterUsers, FindUserById, UpdateUserById } from '../../controllers/userManagement/UserData.js';

// Initialize multer
const upload = multer({ dest: "../../uploads" });  // You can customize the destination folder

const router = express.Router();

// Define your routes
router.post("/register", uploadMiddleware, registerUser);
router.get("/find/:id", FindUserById);
router.put("/update", upload.single("profilePhoto"), UpdateUserById);  // Handle single file upload
router.delete("/del", DeleteUserById);
router.get("/q", filterUsers)

export default router;
