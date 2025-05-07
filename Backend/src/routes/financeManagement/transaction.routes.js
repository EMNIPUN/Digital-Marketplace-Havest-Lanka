import express from "express";
import financeController from "../../controllers/financeManagement/finance.controller.js";

const router = express.Router();

router.get("/transactions", financeController.getTransactions);
router.post("/transactions", financeController.addTrasaction);
router.put("/transactions/:id", financeController.updatedTrans);
router.delete("/transactions/:id", financeController.deletedTrans);

export default router;
