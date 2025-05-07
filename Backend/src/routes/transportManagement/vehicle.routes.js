import express from "express";
import{
    createVehicle,
    getAllVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle
} from "../../controllers/transportManagement/vehicle.controller.js";

const vehicleRouter = express.Router();

vehicleRouter.post('/createVehicle', createVehicle);  
vehicleRouter.get('/getallvehicles', getAllVehicles);
vehicleRouter.get('/getvehiclebuyid/:id', getVehicleById);
vehicleRouter.put('/updatevehicle/:id', updateVehicle);
vehicleRouter.delete('/deletevehicle/:id', deleteVehicle);


export default vehicleRouter;