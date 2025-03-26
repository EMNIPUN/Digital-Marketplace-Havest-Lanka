import "dotenv/config";
import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";
import vehicleRouter from "./routes/transportManagement/vehicle.routes.js";


const app = express();

app.use(express.json());
app.use(cors());

connectDB();
 
app.use("/api/vehicle", vehicleRouter);

const port = 8005;
app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});   