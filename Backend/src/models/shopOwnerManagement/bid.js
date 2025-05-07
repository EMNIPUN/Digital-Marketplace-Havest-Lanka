import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
   farmerId: {
      type: String,
      required: true,
   },
   farmer: {
      type: String,
      required: true,
   },
   shopOwnerId: {
      type: String,
      required: true,
   },
   postId: {
      type: String,
      required: true,
   },
   product: {
      type: String,
      required: true,
   },
   quantity: {
      type: Number,
      required: true,
   },
   price: {
      type: String,
      required: true,
   },
   status: {
      type: String,
      required: true,
   },
});

const bid = mongoose.model("Bid", bidSchema);

export default bid;
