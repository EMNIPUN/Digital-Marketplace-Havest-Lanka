import express from "express";
import { 
    getAllBidPosts,
    getBidsByFarmerId,
    createBidPost 
} from "../../controllers/farmerManagement/BidPost.controller.js";

const bidPostRouter = express.Router();

bidPostRouter.post("/", createBidPost);
bidPostRouter.get("/", getAllBidPosts);
bidPostRouter.get("/:farmerId", getBidsByFarmerId);

export default bidPostRouter;
