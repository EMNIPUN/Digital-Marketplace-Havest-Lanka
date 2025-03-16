import Inventory from "../../models/shopOwnerManagement/inventory.js";

const getInventoryDetails = (req, res) => {
   Inventory.find()
      .then((response) => {
         res.json(response);
      })
      .catch((error) => {
         res.json(error);
      });
};

export default { getInventoryDetails };
