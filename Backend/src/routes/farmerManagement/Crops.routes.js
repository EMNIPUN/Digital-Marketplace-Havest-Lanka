import express from "express";
import {
    getAllCrops,
    getCropsById,
    addCrops,
    updateCrops,
    deleteCrops,
    generateResponse,
} from "../../controllers/farmerManagement/crps.controller.js";
import { createEmbeddings } from "../../controllers/farmerManagement/embedding.controller.js";
import { retriveCrops } from "../../controllers/farmerManagement/retrive.controller.js";

const CropsRouter = express.Router();

CropsRouter.route("/").get(getAllCrops).post(addCrops);

CropsRouter.route("/:id")
    .get(getCropsById)
    .put(updateCrops)
    .delete(deleteCrops);
 
CropsRouter.route("/llm").post(generateResponse);
CropsRouter.route("/embeddings/create").post(createEmbeddings);
CropsRouter.route("/search/retrive").get(retriveCrops);

export default CropsRouter;