import inboxController from "../../controllers/shopOwnerManagement/inbox.controller.js";
import express from "express";

const router = express.Router();

router.get("/getInboxDetails", inboxController.getInboxData);
router.get("/getInboxDetailsById/:id", inboxController.getTnboxDataById);

export default router;
