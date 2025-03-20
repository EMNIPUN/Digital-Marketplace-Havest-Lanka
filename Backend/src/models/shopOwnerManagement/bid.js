import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
   farmerId: String,
   shopOwnerId: String,
   postId: String,
   quantity: Number,
   price: Number,
   status: String,
});

const bid = mongoose.model("Bid", bidSchema);

export default bid;
