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
import cropsRouter from "./routes/farmerManagement/Crops.routes.js";
import inboxRoutes from "./routes/shopOwnerManagement/inbox.routes.js";
import messageRoutes from "./routes/shopOwnerManagement/message.route.js";
import transportRoutes from "./routes/farmerManagement/Trasportation.routes.js";

import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();

// 1. Hide Server Fingerprint (Resolves ZAP Alert: Server Leaks Information via X-Powered-By)
app.disable("x-powered-by");

// 2. Set Defensive Security Headers (Resolves ZAP Alerts: Missing Anti-clickjacking, CSP, nosniff)
app.use(
   helmet({
      contentSecurityPolicy: {
         directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "blob:", "http://localhost:5173", "http://localhost:8005"],
            connectSrc: ["'self'", "http://localhost:5173", "http://localhost:8005", "ws://localhost:8005"],
            frameAncestors: ["'none'"], // Anti-clickjacking frame protection
         },
      },
      crossOriginResourcePolicy: { policy: "cross-origin" }, // Permits frontend to load uploaded media
      frameguard: { action: "deny" },                        // X-Frame-Options: DENY
      noSniff: true,                                         // X-Content-Type-Options: nosniff
   })
);

// 3. Global Rate Limiting (Protects general API against DoS / Event-Loop starvation)
const globalLimiter = rateLimit({
   windowMs: 15 * 60 * 1000, // 15 minutes
   max: 500,                 // Limit each IP to 500 requests per 15 minutes
   standardHeaders: true,
   legacyHeaders: false,
   message: { message: "Too many requests from this IP, please try again after 15 minutes." },
});
app.use(globalLimiter);

// 4. Strict Rate Limiting for Sensitive Authentication Endpoints (Brute-force protection)
const authLimiter = rateLimit({
   windowMs: 15 * 60 * 1000, // 15 minutes
   max: 20,                  // Maximum 20 attempts per 15 minutes
   standardHeaders: true,
   legacyHeaders: false,
   message: { message: "Too many authentication attempts, please try again after 15 minutes." },
});

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

app.get("/", (req, res) => {
   res.status(200).send(`
      <!DOCTYPE html>
      <html>
      <head><title>Harvest Lanka API</title></head>
      <body>
         <h1>Harvest Lanka API Gateway</h1>
         <ul>
            <li><a href="/check-auth">Check Auth</a></li>
            <li><a href="/api/admin/getallaccounts">Admin Accounts</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/user/register">Register</a></li>
            <li><a href="/api/BidPost">Bid Posts</a></li>
            <li><a href="/uploads">Uploads</a></li>
         </ul>
      </body>
      </html>
   `);
});

// Use Routes
app.use(trackRequest);
app.use("/api", transactionRoutes);
app.use("/api/vehicle", vehicleRouter);
app.use("/api", paymentRoutes);

// Protect sensitive authentication routes with authLimiter
app.use("/login", authLimiter, loginRoutes);
app.use("/user/register", authLimiter);
app.use("/user/otp", authLimiter);
app.use("/user/reset-password", authLimiter);
app.use("/user", userRoutes);

app.use("/logout", logoutRoutes);
app.use("/check-auth", checkAuthRoutes);

//farmer endpoints
app.use("/api/BidPost", bidPostRouter);
app.use("/api/crops", cropsRouter);
app.use("/api/transport", transportRoutes);

app.use("/api/inventory", inventoryRoutes);
app.use("/api/bid", bidRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/chat", inboxRoutes);
app.use("/api/message", messageRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const port = 8005;
app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
