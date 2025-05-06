import mongoose, { Schema } from "mongoose";

const notificationSchema = new mongoose.Schema({
   userId: {
      type: String,
      required: true,
   },
   Content: {
      type: String,
      required: true,
   },
});

const notification = mongoose.model("Notification", notificationSchema);

export default notification;
