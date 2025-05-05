import Transport from "../../models/farmerManagement/Transport.js";

export const getAllTransport = async (req, res) => {
   try {
      const transport = await Transport.find({});
      res.status(200).json(transport);
   } catch (error) {
      res.status(500).json({ message: "Error in fetching transports" });
   }
};

export const getTransportById = async (req, res) => {
   try {
      const transport = await Transport.findById(req.params.id);
      res.status(200).json(transport);
   } catch (error) {
      res.status(500).json({ message: "Error in fetching transports" });
   }
};

export const addTransport = async (req, res) => {
   try {
      const transport = req.body;  

      if (!transport.farmerId ||
          !transport.pickupLocation || 
          !transport.deliveryLocation || 
          !transport.cargoType || 
          !transport.contactNumber || 
          !transport.pickupDate || 
          !transport.cargoWeight || 
          !transport.specialInstructions ||
          !transport.driverName ||
          !transport.contactNumberDriver ||
          !transport.vehcaleNo
        ) {
         return res.status(400).json({ message: "Missing required fields" });
      }

      await Transport.create({
         farmerId: transport.farmerId,
         pickupLocation: transport.pickupLocation,
         deliveryLocation: transport.deliveryLocation,
         cargoType: transport.cargoType,
         contactNumber: transport.contactNumber,
         pickupDate: transport.pickupDate,
         cargoWeight: transport.cargoWeight,
         specialInstructions: transport.specialInstructions,
         driverName: transport.driverName,
         contactNumberDriver: transport.contactNumberDriver,
         vehcaleNo: transport.vehcaleNo,
      });
      res.status(201).send("Transport added successfully");

   } catch (error) {
      res.status(500).json({ message: "Error in creating transport" });
   }
};

export const updateTransport = async (req, res) => {
   try {
      const transport = await Transport.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
      });
      res.status(200).json(transport);
   } catch (error) {
      res.status(500).json({ message: "Error in updating transport" });
   }
};

export const deleteTransport = async (req, res) => {
   try {
      const transport = await Transport.findByIdAndDelete(req.params.id);
      res.status(200).json(transport);
   } catch (error) {
      res.status(500).json({ message: "Error in deleting transport" });
   }
};