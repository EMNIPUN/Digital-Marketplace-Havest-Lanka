import BidPost from "../../models/farmerManagement/BidPost.modle.js";

export const getAllBidPosts = async (req, res) => {
    const bidPosts = await BidPost.find();
    res.status(200).json(bidPosts);
};

export const getBidPostById = async (req, res) => {
    const bitpostId = req.params.bitpostId;
    const bidPost = await BidPost.findById(bitpostId);
    res.status(200).json(bidPost);
    return;
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

    if (bidPost.price <= 0 || bidPost.quantity <= 0) {
        return res.status(400).json({
            message: "Price and quantity should be greater than 0",
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

export const updateBitPost = async (req, res) => {
    const bitpostId = req.params.bitpostId;
    const updatebidPost = req.body;

    // if (
    //     !updatebidPost.cropsName ||
    //     !updatebidPost.cropsCategory ||
    //     !updatebidPost.description ||
    //     !updatebidPost.price ||
    //     !updatebidPost.quantity ||
    //     !updatebidPost.location ||
    //     !updatebidPost.status
    // ) {
    //     return res.status(400).json({
    //         message: "Missing required fields",
    //     });
    // }

    await BidPost.findByIdAndUpdate
    (bitpostId, updatebidPost)

    res.status(200).send();
    return;
}

export const deleteBitPost = async (req, res) => {
    const {bitpostId} = req.params;
    await BidPost.findByIdAndDelete(bitpostId);

    if (!bitpostId) {
        return res.status(404).json({ message: "Bid post not found" });
    }

    res.json({ message: "Bid post deleted successfully" });

    return;

}
    