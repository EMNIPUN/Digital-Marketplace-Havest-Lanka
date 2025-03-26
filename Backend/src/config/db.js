import mongoose from "mongoose";

const connectDB = async () => {
   try {
      const MONGODB_URI = process.env.MONGODB_URI;
      if (!MONGODB_URI) {
         console.log("MongoDB URI not found in environment variables");
      }

      await mongoose.connect(MONGODB_URI);
      console.log("Connected to MongoDB");
   } catch (error) {
      console.log("Error connecting to MongoDB");
      console.log(error);
   }
};

export default connectDB;