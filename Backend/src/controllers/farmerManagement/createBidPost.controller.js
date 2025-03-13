import BidPost from "../../models/farmerManagement/createBidPost.modle.js";

export const createBidPost = async (req, res) => {
    const bidPost = req.body;

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
    })
    
    res.status(201).send();
    return;
}