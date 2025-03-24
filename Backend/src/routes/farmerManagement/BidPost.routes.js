import express from "express";
import { 
    getAllBidPosts,
    getBidPostById,
    getBidsByFarmerId,
    createBidPost,
    updateBitPost,
    deleteBitPost     
} from "../../controllers/farmerManagement/BidPost.controller.js";

const bidPostRouter = express.Router();

bidPostRouter.post("/", createBidPost);
bidPostRouter.get("/", getAllBidPosts);
bidPostRouter.get("/:bitpostId", getBidPostById);
bidPostRouter.get("/ownbids/:farmerId", getBidsByFarmerId);
bidPostRouter.put("/:bitpostId", updateBitPost);
bidPostRouter.delete("/:bitpostId", deleteBitPost);

export default bidPostRouter;
