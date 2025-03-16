import "dotenv/config";
import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";
import inventoryRoutes from "./routes/shopOwnerManagement/inventoryRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/inventory", inventoryRoutes);

connectDB();

const port = 8005;
app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
