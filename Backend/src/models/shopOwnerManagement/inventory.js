import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
   shopOwnerId: {
      type: String,
      required: true,
   },
   itemName: {
      type: String,
      required: true,
   },
   itemCategory: {
      type: String,
      required: true,
   },
   quantity: {
      type: Number,
      required: true,
   },
});

const inventory = mongoose.model("Inventory", inventorySchema);

export default inventory;
