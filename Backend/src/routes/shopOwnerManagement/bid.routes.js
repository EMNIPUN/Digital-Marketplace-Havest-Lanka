import express from "express";
import bidController from "../../controllers/shopOwnerManagement/bid.controller.js";

const route = express.Router();

route.get("/getBids/:postId", bidController.getBids);
route.post("/addBids", bidController.addBids);
<<<<<<< HEAD
route.get("/getAllBids/:shopOwnerId", bidController.getAllBids);
=======
route.put("/updateBid/:bidId", bidController.updateBid);
>>>>>>> dabb83b4fd0246dfd7b9b715982d702eed816dc5

export default route;
