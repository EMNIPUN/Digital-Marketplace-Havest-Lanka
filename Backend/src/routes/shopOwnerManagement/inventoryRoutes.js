import inventoryController from "../../controllers/shopOwnerManagement/inventoryController.js";
import express from "express";

const router = express.Router();

router.get("/getInventory", inventoryController.getInventoryDetails);

export default router;
