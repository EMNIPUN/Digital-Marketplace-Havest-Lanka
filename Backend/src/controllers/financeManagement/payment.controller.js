import DailyPricess from "../../models/financeManagement/DailyPricess.js";
import Payment from "../../models/financeManagement/payment.js";
import FarmerpaymentSchema from "../../models/financeManagement/paymentSchema.js";



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


const getAllPayments = async (req, res) => {
   try {
      const all_payments = await Payment.find();

      res.status(200).json(all_payments);
   } catch (error) {
      res.status(500).json({ message: "Error fetching transactions", error });
   }
};

const getAllPrices = async (req, res) => {
   try {
     const prices = await DailyPricess.find();
     res.status(200).json(prices);
   } catch (error) {
     res.status(500).json({ message: 'Error fetching prices', error });
   }
 };
 
 // 2. Get last 7 days (for demo: from 8 May 2025 back)
 const getRecentPrices = async (req, res) => {
   try {
     const targetDate = new Date('2025-05-08');
     const startDate = new Date(targetDate);
     startDate.setDate(startDate.getDate() - 6);
 
     const prices = await DailyPricess.find({
       date: { $gte: startDate, $lte: targetDate }
     }).sort({ date: 1 });
 
     res.status(200).json(prices);
   } catch (error) {
     res.status(500).json({ message: 'Error fetching recent prices', error });
   }
 };
 
 // 3. Get prices by item name
 const getPricesByName = async (req, res) => {
   const name = req.params.name;
 
   try {
     const targetDate = new Date('2025-05-08');
     const startDate = new Date(targetDate);
     startDate.setDate(startDate.getDate() - 6);
 
     const prices = await DailyPricess.find({
       name: { $regex: new RegExp(`^${name}$`, 'i') },
       date: { $gte: startDate, $lte: targetDate }
     });
 
     res.status(200).json(prices);
   } catch (error) {
     res.status(500).json({ message: 'Error fetching prices by name', error });
   }
 };
 
 // 4. Add a new price
 const addPrice = async (req, res) => {
   const { category, name, date, price } = req.body;
 
   try {
     const newPrice = new DailyPricess({ category, name, date: new Date(date), price });
     await newPrice.save();
 
     // Delete prices older than 7 days from the latest date
     const latestDate = new Date(date);
     const cutoffDate = new Date(latestDate);
     cutoffDate.setDate(cutoffDate.getDate() - 6);
     await DailyPricess.deleteMany({ date: { $lt: cutoffDate } });
 
     res.status(201).json({ message: 'Price added successfully' });
   } catch (error) {
     res.status(500).json({ message: 'Error adding price', error });
   }
 };


 const addFarmerPayment = async (req, res) => {
  try {
    const newPayment = new FarmerpaymentSchema(req.body);
    const saved = await newPayment.save();
    res.status(201).json({ message: 'Payment added successfully', payment: saved });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all payments
const getAllFarmerPayments = async (req, res) => {
  try {
    const payments = await FarmerpaymentSchema.find().sort({ date: -1 });
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




export default { notifyPayment, getAllPayments , getAllPrices,
   getRecentPrices,
   getPricesByName,
   addPrice,
  addFarmerPayment,
  getAllFarmerPayments
};
