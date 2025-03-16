import { response } from "express";
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

const addItem = (req, res) => {
   const inventory = new Inventory({
      shopOwnerId: req.body.shopOwnerId,
      itemName: req.body.itemName,
      itemCategory: req.body.itemCategory,
      quantity: req.body.quantity,
   });

   inventory
      .save()
      .then((response) => {
         res.json(response);
      })
      .catch((error) => {
         res.json(error);
      });
};

const updateItem = (req, res) => {
   const { id } = req.params;
   const { shopOwnerId, itemName, itemCategory, quantity } = req.body;

   Inventory.findByIdAndUpdate(
      id,
      {
         shopOwnerId,
         itemName,
         itemCategory,
         quantity,
      },
      { new: true }
   )
      .then((response) => {
         res.json(response);
      })
      .catch((error) => {
         res.json(error);
      });
};

const deleteItem = (req, res) => {
   const { id } = req.params;

   Inventory.findByIdAndDelete(id)
      .then((response) => {
         res.json(response);
      })
      .catch((error) => {
         res.json(error);
      });
};

export default { getInventoryDetails, addItem, updateItem, deleteItem };
