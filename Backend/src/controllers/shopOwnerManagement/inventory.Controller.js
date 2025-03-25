import { response } from "express";
import Inventory from "../../models/shopOwnerManagement/inventory.js";

// get details
const getInventoryDetails = async (req, res) => {
   await Inventory.find()
      .then((response) => {
         res.status(200).json(response);
      })
      .catch((error) => {
         res.status(400).json(error);
      });
};

// get details by id
const getInventoryDetailsById = async (req, res) => {
   const shopOwnerId = req.params.shopOwnerId;

   await Inventory.find({ shopOwnerId })
      .then((response) => {
         res.status(200).json(response);
      })
      .catch((error) => {
         res.status(400).json(error);
      });
};

// add details
const addItem = async (req, res) => {
   const inventory = new Inventory({
      shopOwnerId: req.body.shopOwnerId,
      itemName: req.body.itemName,
      itemCategory: req.body.itemCategory,
      quantity: req.body.quantity,
   });

   await inventory
      .save()
      .then((response) => {
         res.status(200).json(response);
      })
      .catch((error) => {
         res.status(400).json(error);
      });
};

// update details
const updateItem = async (req, res) => {
   const { id } = req.params;
   const { shopOwnerId, itemName, itemCategory, quantity } = req.body;

   await Inventory.findByIdAndUpdate(
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
         res.status(200).json(response);
      })
      .catch((error) => {
         res.status(400).json(error);
      });
};

//delete details
const deleteItem = async (req, res) => {
   const { id } = req.params;

   await Inventory.findByIdAndDelete(id)
      .then((response) => {
         res.status(200).json(response);
      })
      .catch((error) => {
         res.status(400).json(error);
      });
};

// find items from category name
const getInventoryDetailsByCategory = async (req, res) => {
   const category = req.params;

   await Inventory.find({ category })
      .then((response) => {
         res.status(200).json(response);
      })
      .catch((error) => {
         res.status(400).json(error);
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
