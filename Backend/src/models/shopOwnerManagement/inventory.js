import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
   shopOwnerId: String,
   itemName: String,
   itemCategory: String,
   quantity: Number,
});

const inventory = mongoose.model("Inventory", inventorySchema);

export default inventory;
