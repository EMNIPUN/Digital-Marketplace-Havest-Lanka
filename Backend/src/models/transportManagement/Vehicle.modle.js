import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    driverFirstName: {
        type: String,
        required: true,
    },
    driverLastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: Number,
        required: true,
    },
    vehicleType: {
        type: String,
        required: true,
    },
    vehicleNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }

});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
