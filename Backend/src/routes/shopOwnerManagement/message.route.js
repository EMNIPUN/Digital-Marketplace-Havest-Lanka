import express from "express";
import messageController from "../../controllers/shopOwnerManagement/message.controller.js";

const router = express.Router();

router.post("/sendMessage", messageController.sendMessage);
router.get("/messages/:orderId", messageController.getAllMessages);

export default router;
