import Crops from "../../models/farmerManagement/crops.modle.js";

export const getAllCrops = async (req, res) => {
    const crops =  await Crops.find();
    res.status(200).json(Crops);
};

export const getCropsById = async (req, res) => {
    const cropsId = req.params.cropsId;
    const crops = await Crops.findById(cropsId);
    res.status(200).json(crops);
};

export const addCrops = async (req, res) => {
    const cropsId = req.body;

    if (!cropsId) {
        return res.status(400).json({
            message: "Missing required fields",
        });
    }

    await Crops.create({
        name: cropsId.name,
        image: cropsId.image,
        idealTemp: cropsId.idealTemp,
        humidity: cropsId.humidity,
        soilType: cropsId.soilType,
        growthPeriod: cropsId.growthPeriod,
        description: cropsId.description,
    });

    res.status(201).send();
};

export const updateCrops = async (req, res) => {};

export const deleteCrops = async (req, res) => {};