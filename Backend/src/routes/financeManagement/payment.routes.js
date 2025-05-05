import express from "express";
import paymentController from "../../controllers/financeManagement/payment.controller.js";

const router = express.Router();

router.post("/payment", paymentController.notifyPayment);
router.get("/all-payments", paymentController.getAllPayments);


router.get("/all-prices", paymentController.getAllPrices);
router.get("/recent-prices", paymentController.getRecentPrices);
router.get("/prices-by-name/:name", paymentController.getPricesByName);
router.post("/add-price", paymentController.addPrice);


export default router;
