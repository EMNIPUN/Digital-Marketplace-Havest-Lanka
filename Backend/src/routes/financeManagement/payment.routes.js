import express from "express";
import paymentController from "../../controllers/financeManagement/payment.controller.js";

const router = express.Router();

router.post("/payment", paymentController.notifyPayment);
router.get("/all-payments", paymentController.getAllPayments);
router.get("/getPaymentByOrderId/:order_id", paymentController.getPaymentByOrdeId)

export default router;
