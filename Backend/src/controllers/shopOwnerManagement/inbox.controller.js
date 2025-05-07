import { response } from "express";
import Chat from "../../models/shopOwnerManagement/chat.js";

const chats = [
   {
      id: 1,
      chatName: "Supun",
      users: [
         {
            name: "Akila",
            email: "akila@gmail.com",
         },
         {
            name: "Supun",
            email: "Supun@gmail.com",
         },
      ],
   },
   {
      id: 2,
      chatName: "Menaka",
      users: [
         {
            name: "Menaka",
            email: "menaka@gmail.com",
         },
         {
            name: "Supun",
            email: "Supun@gmail.com",
         },
      ],
   },
];

const getInboxData = async (req, res) => {
   await Chat.find()
      .then((response) => {
         res.status(200).json(response);
      })
      .catch((error) => {
         res.status(400).json(error);
      });
};

const getTnboxDataById = async (req, res) => {
   const id = Number(req.params.id);
   const singleChat = chats.find((c) => c.id === id);
   res.send(singleChat);
};

export default { getInboxData, getTnboxDataById };
