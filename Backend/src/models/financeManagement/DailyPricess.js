import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
  category: { type: String, enum: ['vegetable', 'fruit', 'spice'], required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
  price: { type: Number, required: true }
});

// Compound index to prevent duplicate entries for the same item on the same date
priceSchema.index({ category: 1, name: 1, date: 1 }, { unique: true });

const DailyPricess = mongoose.model('DailyPrice', priceSchema);
export default DailyPricess
