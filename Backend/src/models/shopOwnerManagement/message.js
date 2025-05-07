import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
   sender: {
      type: String,
   },
   content: {
      type: String,
      trim: true,
   },
   orderId: {
      type: String,
   },
});

const message = mongoose.model("Message", messageSchema);

export default message;
