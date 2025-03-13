import express from "express";
import { createBidPost } from "../../controllers/farmerManagement/createBidPost.controller.js";

const bidPostRouter = express.Router();

bidPostRouter.post("/", createBidPost);

export default bidPostRouter;
