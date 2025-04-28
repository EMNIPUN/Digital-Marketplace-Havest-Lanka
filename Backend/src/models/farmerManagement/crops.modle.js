import mongoose from "mongoose";

const CropsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    idealTemp:{
        type:String,
        required:true
    },
    humidity:{
        type:String,
        required:true
    },
    soilType:{
        type:String,
        required:true
    },
    growthPeriod:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})