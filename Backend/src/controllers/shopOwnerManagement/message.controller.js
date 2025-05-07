import { response } from "express";
import Message from "../../models/shopOwnerManagement/message.js";

const sendMessage = async (req, res) => {
   const { content, orderId, sender } = req.body;

   const message = new Message({
      sender: sender,
      content: content,
      orderId: orderId,
   });

   if (!message.sender || !message.content || !message.orderId) {
      return res.status(400).json({ message: "Missing Required Fields" });
   }

   await message
      .save()
      .then((response) => {
         res.status(200).json(response);
      })
      .catch((error) => {
         res.state(400).json(error);
      });
};

const getAllMessages = async (req, res) => {
   const orderId = req.params.orderId;

   Message.find({ orderId })
      .then((response) => {
         res.status(200).json(response);
      })
      .catch((error) => {
         res.status(400).json(error);
      });
};

export default { sendMessage, getAllMessages };
