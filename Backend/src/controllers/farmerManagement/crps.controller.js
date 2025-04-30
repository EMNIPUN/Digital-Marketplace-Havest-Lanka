import Crops from "../../models/farmerManagement/crops.modle.js";

export const getAllCrops = async (req, res) => {
    const crops =  await Crops.find();
    res.status(200).json(crops);
};

export const getCropsById = async (req, res) => {
    const cropsId = req.params.cropsId;
    const crops = await Crops.findById(cropsId);
    res.status(200).json(crops);
};

export const addCrops = async (req, res) => {
    const crops = req.body;

    if(
        !crops.name ||
        !crops.image ||
        !crops.idealTemp ||
        !crops.humidity ||
        !crops.soilType ||
        !crops.growthPeriod||
        !crops.description
    ){
        res.status(400).json({ message: "Please add all the fields" });
        return;
    }

    await Crops.create({
        name: crops.name,
        image: crops.image,
        idealTemp: crops.idealTemp,
        humidity: crops.humidity,
        soilType: crops.soilType,
        growthPeriod: crops.growthPeriod,
        description: crops.description,
    })

    res.status(201).json({ message: "Crops added successfully" });
    return;
};

export const updateCrops = async (req, res) => {};

export const deleteCrops = async (req, res) => {};