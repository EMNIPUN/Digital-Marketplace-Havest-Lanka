import mongoose from "mongoose";

const BidPostSchema = new mongoose.Schema({
    farmerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    cropsName:{
        type:String,
        required:true
    },
    cropsCategory:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
      type: Number,
      required: true,
    },
    quantity:{
      type: Number,
      required: true,
    },
    location:{
      type: String,
      required: true,
    },
    bidEndTime:{
      type: Date,
      required: true,
    },
    
});

const BidPost = mongoose.model('BidPost', BidPostSchema);
export default BidPost;