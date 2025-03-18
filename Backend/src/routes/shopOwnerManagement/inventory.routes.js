import inventoryController from "../../controllers/shopOwnerManagement/inventory.Controller.js";
import express from "express";

const router = express.Router();

router.get("/getInventory", inventoryController.getInventoryDetails);
router.get(
   "/getInventoryById/:shopOwnerId",
   inventoryController.getInventoryDetailsById
);
router.post("/addItem", inventoryController.addItem);
router.post("/updateItem/:id", inventoryController.updateItem);
router.post("/deleteItem/:id", inventoryController.deleteItem);

export default router;
