import Vehicle from "../../models/transportManagement/Vehicle.modle.js";

export const getAllVehicles = async (req, res) => {
  const vehicles = await Vehicle.find();
  res.status(200).json(vehicles);
}

export const getVehicleById = async (req, res) => {
    const vehicleId = req.params.id;
    const vehicle = await Vehicle.findById(vehicleId);

    if(vehicle) {
        res.status(200).json(vehicle);
    } else {
        res.status(404).json({
            message: "Vehicle not found!"
        });
    }
}


export const createVehicle = async (req, res) => {
    const vehicle = req.body;

    if(
      !vehicle.driverFirstName || 
      !vehicle.driverLastName || 
      !vehicle.email || !vehicle.address || 
      !vehicle.location || !vehicle.contactNumber || 
      !vehicle.vehicleType || !vehicle.vehicleNumber || 
      !vehicle.password) 
      {
        return res.status(400).json({
          message: "All fields are required!"
        });
    }

    await Vehicle.create({
        driverFirstName: vehicle.driverFirstName,
        driverLastName: vehicle.driverLastName,
        email: vehicle.email,
        address: vehicle.address,
        location: vehicle.location,
        contactNumber: vehicle.contactNumber,
        vehicleType: vehicle.vehicleType,
        vehicleNumber: vehicle.vehicleNumber,
        password: vehicle.password
    })

    res.status(200).json({
        message: "Vehicle created successfully!"
    });
    return;
}

export const updateVehicle = async (req, res) => {
    const vehicleId = req.params.id;
    const updateVehicle = req.body;


    await Vehicle.findByIdAndUpdate
    (vehicleId,updateVehicle)

    res.status(200).json({
        message: "Vehicle updated successfully!"
    })
    return;
}

export const deleteVehicle =  async (req, res) => {
    const vehicleId = req.params.id;
    await Vehicle.findByIdAndDelete(vehicleId);
    res.status(200).json({
        message: "Vehicle deleted successfully!"
    });
}

