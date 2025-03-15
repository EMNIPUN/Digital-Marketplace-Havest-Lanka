import BidPost from "../../models/farmerManagement/BidPost.modle.js";

export const getAllBidPosts = async (req, res) => {
    const bidPosts = await BidPost.find();
    res.status(200).json(bidPosts);
};

export const getBidsByFarmerId = async (req, res) => {
    
    const farmerId = req.params.farmerId;
    const bidPosts = await BidPost.find({ farmerId});
    res.status(200).json(bidPosts);
    return;
}

export const createBidPost = async (req, res) => {
    const bidPost = req.body;

    const bidEndTime = new Date();
    bidEndTime.setHours(bidEndTime.getHours()+24);

    if (
        !bidPost.farmerId ||
        !bidPost.cropsName ||
        !bidPost.cropsCategory ||
        !bidPost.description ||
        !bidPost.price ||
        !bidPost.quantity ||
        !bidPost.location
    ) {
        return res.status(400).json({
            message: "Missing required fields",
        });
    }

    await BidPost.create({
        farmerId: bidPost.farmerId,
        cropsName: bidPost.cropsName,
        cropsCategory: bidPost.cropsCategory,
        description: bidPost.description,
        price: bidPost.price,
        quantity: bidPost.quantity,
        location: bidPost.location,
        bidEndTime: bidEndTime,
    })
    
    res.status(201).send();
    return;
}