import Payment from "../../models/financeManagement/payment.js";

const notifyPayment = async (req, res) => {
   try {
      const paymentData = req.body;
      console.log(req.body);

      const newPayment = new Payment(paymentData);
      await newPayment.save();
      console.log("Payment notification received and saved:", paymentData);
      res.status(200).send("Payment recorded");
   } catch (error) {
      console.error("Error saving payment data:", error);
      res.status(500).send("Error saving payment");
   }
};

export default { notifyPayment };
