import "dotenv/config";
import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import bidPostRouter from "./routes/farmerManagement/BidPost.routes.js";

import userRoutes from "./routes/userManagement/userRoutes.js";
import loginRoutes from "./routes/userManagement/loginRoutes.js";
import logoutRoutes from "./routes/userManagement/logoutRoutes.js";
import checkAuthRoutes from "./routes/userManagement/checkAuthRoutes.js";
import adminRoutes from "./routes/userManagement/adminRoutes.js";
import { trackRequest } from "./controllers/userManagement/fetch/SystemLoad.js";
import vehicleRouter from "./routes/transportManagement/vehicle.routes.js";
import inventoryRoutes from "./routes/shopOwnerManagement/inventory.routes.js";
import bidRoutes from "./routes/shopOwnerManagement/bid.routes.js";
import transactionRoutes from "./routes/financeManagement/transaction.routes.js";
import paymentRoutes from "./routes/financeManagement/payment.routes.js";

const app = express();
app.use(express.json());

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
   origin: "http://localhost:5173",
   credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

connectDB();

// Use Routes
app.use(trackRequest);
app.use("/api", transactionRoutes);
app.use("/api/vehicle", vehicleRouter);
app.use("/api", paymentRoutes);
app.use("/user", userRoutes);
app.use("/login", loginRoutes);
app.use("/logout", logoutRoutes);
app.use("/check-auth", checkAuthRoutes);
app.use("/api/BidPost", bidPostRouter);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/bid", bidRoutes);
app.use("/api/admin", adminRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const port = 8005;
app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
