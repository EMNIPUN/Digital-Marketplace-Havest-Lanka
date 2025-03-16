import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

import userRoutes from "./routes/userManagement/userRoutes.js";
import loginRoutes from "./routes/userManagement/loginRoutes.js"
import logoutRoutes from "./routes/userManagement/logoutRoutes.js"
import checkAuthRoutes from "./routes/userManagement/checkAuthRoutes.js"

dotenv.config();

const app = express();

// Middlewares
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:5174',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser())

const PORT = process.env.PORT || 5000;

// Use Routes
app.use("/user", userRoutes);
app.use("/login", loginRoutes);
app.use("/logout", logoutRoutes);
app.use("/check-auth", checkAuthRoutes);

mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("✅ Database connected");
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    })
    .catch((e) => {
        console.error("❌ Server error:", e);
    });
