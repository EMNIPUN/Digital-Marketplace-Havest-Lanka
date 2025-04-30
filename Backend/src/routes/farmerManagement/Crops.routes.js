import express from "express";
import {
    getAllCrops,
    getCropsById,
    addCrops,
    updateCrops,
    deleteCrops,
} from "../../controllers/farmerManagement/crps.controller.js";

const CropsRouter = express.Router();

CropsRouter.route("/").get(getAllCrops).post(addCrops);

CropsRouter.route("/:id").get(getCropsById).put(updateCrops).delete(deleteCrops);

export default CropsRouter;