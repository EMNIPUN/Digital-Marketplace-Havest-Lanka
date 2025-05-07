import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  farmerId: { type: String, required: true },
  billNo: { type: String, required: true },
  farmerName: { type: String, required: true },
  address: { type: String },
  contact: { type: String, required: true },
  bank: { type: String },
  branch: { type: String },
  amount: { type: Number, required: true, min: 0 },
  date: { type: Date, required: true },
  remarks: { type: String }
}, {
  timestamps: true
});



const FarmerpaymentSchema = mongoose.model('FarmerPayment', paymentSchema);
export default FarmerpaymentSchema