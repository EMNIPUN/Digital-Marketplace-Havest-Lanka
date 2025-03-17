import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import connectDB from './config/db.js';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';

import bidPostRouter from './routes/farmerManagement/BidPost.routes.js';

import userRoutes from "./routes/userManagement/userRoutes.js";
import loginRoutes from "./routes/userManagement/loginRoutes.js"
import logoutRoutes from "./routes/userManagement/logoutRoutes.js"
import checkAuthRoutes from "./routes/userManagement/checkAuthRoutes.js"

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};


app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());

connectDB();



// Use Routes
app.use("/user", userRoutes);
app.use("/login", loginRoutes);
app.use("/logout", logoutRoutes);
app.use("/check-auth", checkAuthRoutes);

app.use('/api/BidPost', bidPostRouter);

const port = 8005; 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});