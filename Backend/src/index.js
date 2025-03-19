import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import connectDB from './config/db.js';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';

import bidPostRouter from './routes/farmerManagement/BidPost.routes.js';

import userRoutes from "./routes/userManagement/userRoutes.js";
import loginRoutes from "./routes/userManagement/loginRoutes.js"
import logoutRoutes from "./routes/userManagement/logoutRoutes.js"
import checkAuthRoutes from "./routes/userManagement/checkAuthRoutes.js"

import inventoryRoutes from "./routes/shopOwnerManagement/inventory.routes.js";

const app = express();

app.use(express.json());
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:5174',
  credentials: true,
};



app.use(cors(corsOptions));
app.use(cookieParser());


connectDB();


// Use Routes
app.use("/user", userRoutes);
app.use("/login", loginRoutes);
app.use("/logout", logoutRoutes);

app.use("/check-auth", checkAuthRoutes);

app.use('/api/BidPost', bidPostRouter);

app.use("/api/inventory", inventoryRoutes);

const port = 8005; 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
