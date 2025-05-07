import mongoose from "mongoose";

const TrasnportSchema = new mongoose.Schema({
    farmerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    bidPostId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BidPost',
        required: true
    },
    pickupLocation:{
        type: String,
        required:true
    },
    deliveryLocation:{
        type: String,
        required:true
    },
    cargoType:{
        type: String,
        required: true
    },
    contactNumber:{
        type: String,
        required :true
    },
    pickupDate:{
        type: Date,
        required: true
    },
    cargoWeight:{
        type: Number,
        required: true
    },
    specialInstructions:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default: 'Transport Pending'
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    driverName:{
        type: String,
        required: true
    },
    contactNumberDriver:{
        type: String,
        required: true
    },
    vehcaleNo:{
        type: String,
        required: true
    }
})

const Transport = mongoose.model('Transport', TrasnportSchema);
export default Transport;