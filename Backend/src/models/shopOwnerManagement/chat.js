import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
   shopOwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bid",
      required: true,
   },
   chatName: {
      type: String,
      required: true,
   },
   users: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
   ],
   latestMessage: [
      {
         type: String,
      },
   ],
});

const chat = mongoose.model("Chat", chatSchema);
export default chat;
