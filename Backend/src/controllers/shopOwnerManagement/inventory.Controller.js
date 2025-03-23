import { response } from "express";
import Inventory from "../../models/shopOwnerManagement/inventory.js";

// get details
const getInventoryDetails = (req, res) => {
   Inventory.find()
      .then((response) => {
         res.json(response);
      })
      .catch((error) => {
         res.json(error);
      });
};

// get details by id
const getInventoryDetailsById = async (req, res) => {
   const shopOwnerId = req.params.shopOwnerId;

   Inventory.find({ shopOwnerId })
      .then((response) => {
         res.json(response);
      })
      .catch((error) => {
         res.json(error);
      });
};

// add details
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

// update details
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

//delete details
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

// find items from category name
const getInventoryDetailsByCategory = (req, res) => {
   const category = req.params;

   Inventory.find({ category })
      .then((response) => {
         res.json(response);
      })
      .catch((error) => {
         res.json(error);
      });
};

export default {
   getInventoryDetails,
   addItem,
   updateItem,
   deleteItem,
   getInventoryDetailsById,
   getInventoryDetailsByCategory,
};
