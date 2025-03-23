import Bid from "../../models/shopOwnerManagement/bid.js";

// get details
const getBids = (req, res) => {
   const postId = req.params.postId;

   Bid.find({ postId })
      .then((response) => {
         res.json(response);
      })
      .catch((error) => {
         res.json(error);
      });
};

// get all bids
const getAllBids = (req, res) => {
   const shopOwnerId = req.params.shopOwnerId;

   Bid.find({ shopOwnerId })
      .then((response) => {
         res.json(response);
      })
      .catch((error) => {
         res.json(error);
      });
};

// add details
const addBids = (req, res) => {
   const bid = new Bid({
      farmerId: req.body.farmerId,
      shopOwnerId: req.body.shopOwnerId,
      postId: req.body.postId,
      product: req.body.product,
      quantity: req.body.quantity,
      price: req.body.price,
      status: req.body.status,
   });

   bid.save()
      .then((response) => res.json(response))
      .catch((error) => res.json(error));
};

export default { getBids, addBids, getAllBids };
