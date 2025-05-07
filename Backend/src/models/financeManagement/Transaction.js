import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
   {
      userid: {
         type: String,
         required: true,
      },
      type: {
         type: String,
         required: true,
         enum: ["income", "expense"],
      },
      category: {
         type: String,
         required: true,
      },
      amount: {
         type: Number,
         required: true,
         min: 0,
      },
      date: {
         type: Date,
         required: true,
         default: Date.now,
      },
      description: {
         type: String,
         required: true,
         trim: true,
      },
   },
   {
      timestamps: true, // Automatically add createdAt and updatedAt fields
   }
);

const transaction = mongoose.model("Transaction", transactionSchema);

export default transaction;
