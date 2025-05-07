import express from "express";
import {
    getAllTransport,
    getTransportById,
    getTransportByBidPostId,
    addTransport,
    updateTransport,
    deleteTransport,
} from "../../controllers/farmerManagement/RequestTransport.controller.js";


const transportRoutes = express.Router();

transportRoutes.route("/").get(getAllTransport);
transportRoutes.route("/:id").get(getTransportById);
transportRoutes.route("/bidpost/:id").get(getTransportByBidPostId);
transportRoutes.route("/add").post(addTransport);
transportRoutes.route("/update/:id").put(updateTransport);
transportRoutes.route("/delete/:id").delete(deleteTransport);

export default transportRoutes;