import Bid from "../../models/shopOwnerManagement/bid.js";

// get details
const getBids = async (req, res) => {
   const postId = req.params.postId;

   await Bid.find({ postId })
      .then((response) => {
         res.status(200).json(response);
      })
      .catch((error) => {
         res.status(400).json(error);
      });
};

// get all bids
const getAllBids = async (req, res) => {
   const shopOwnerId = req.params.shopOwnerId;

   await Bid.find({ shopOwnerId })
      .then((response) => {
         res.status(200).json(response);
      })
      .catch((error) => {
         res.status(400).json(error);
      });
};

// add details
const addBids = (req, res) => {
   const bid = new Bid({
      farmerId: req.body.farmerId,
      farmer: req.body.farmer,
      shopOwnerId: req.body.shopOwnerId,
      postId: req.body.postId,
      product: req.body.product,
      quantity: req.body.quantity,
      price: req.body.price,
      status: req.body.status,
   });

   if (
      !bid.farmerId ||
      !bid.farmer ||
      !bid.shopOwnerId ||
      !bid.postId ||
      !bid.product ||
      !bid.quantity ||
      !bid.price ||
      !bid.status
   ) {
      return res.status(400).json({ message: "Missing required filed" });
   }

   bid.save()
      .then((response) => res.status(200).json(response))
      .catch((error) => res.status(400).json(error));
};

// update details
const updateBid = async (req, res) => {
   const bidId = req.params.bidId;
   const updateBidData = req.body;

   await Bid.findByIdAndUpdate(bidId, updateBidData);

   res.status(200).json({ message: "Bid updated successfully" });
   return;
};

export default { getBids, addBids, updateBid, getAllBids };
