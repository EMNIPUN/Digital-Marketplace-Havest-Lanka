import express from "express";
import bidController from "../../controllers/shopOwnerManagement/bid.controller.js";

const route = express.Router();

route.get("/getBids/:postId", bidController.getBids);
route.post("/addBids", bidController.addBids);
route.put("/updateBid/:bidId", bidController.updateBid);

export default route;
