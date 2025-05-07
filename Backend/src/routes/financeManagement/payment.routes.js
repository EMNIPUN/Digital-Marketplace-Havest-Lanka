import express from "express";
import paymentController from "../../controllers/financeManagement/payment.controller.js";
import predictPrice from "../../controllers/financeManagement/prediction.js";

const router = express.Router();

router.post("/payment", paymentController.notifyPayment);
router.get("/all-payments", paymentController.getAllPayments);
router.get(
   "/getPaymentByOrderId/:order_id",
   paymentController.getPaymentByOrdeId
);

router.get("/all-prices", paymentController.getAllPrices);
router.get("/recent-prices", paymentController.getRecentPrices);
router.get("/prices-by-name/:name", paymentController.getPricesByName);
router.post("/add-price", paymentController.addPrice);

router.post("/predict-price", predictPrice.predictPrice);

router.post("/pay-farmer", paymentController.addFarmerPayment);
router.get("/get-farmerpay", paymentController.getAllFarmerPayments);

export default router;
