import React, { useEffect, useState } from "react";
import axios from "axios";
import AddInventoryItem from "../../components/shopOwnerManagement/AddInventoryItem";
import UpdateInventoryItem from "../../components/shopOwnerManagement/UpdateInventoryItem";
import DeleteInventoryItem from "../../components/shopOwnerManagement/deleteInventoryItem";

function ManageInventory(props) {
   const [isClickAddItem, setIsClickAddItem] = useState(false);
   const [isClickUpdateItem, setIsClickUpdateItem] = useState(false);
   const [isClickDeleteItem, setIsClickDeleteItem] = useState(false);
   const [selectedItem, setSelectedItemId] = useState("");
   const [inventoryData, setInventoryData] = useState([]);
   const [inventoryFormData, setInventoryFormData] = useState({
      shopOwnerId: "",
      itemName: "",
      itemCategory: "",
      quantity: "",
   });

   useEffect(() => {
      getInventoryData();
   }, []);

   // Inventory data getting func
   const getInventoryData = () => {
      axios
         .get("http://localhost:8005/api/inventory/getInventory")
         .then((response) => {
            setInventoryData(response.data);
         })
         .catch((error) => {
            console.log(error);
         });
   };

   // Inventory data adding func
   const addInventoryItem = (data) => {
      const payload = {
         shopOwnerId: data.shopOwnerId,
         itemName: data.itemName,
         itemCategory: data.itemCategory,
         quantity: Number(data.quantity),
      };
      axios
         .post("http://localhost:8005/api/inventory/addItem", payload)
         .then(() => {
            setInventoryFormData({
               shopOwnerId: "",
               itemName: "",
               itemCategory: "",
               quantity: "",
            });
            getInventoryData();
            setIsClickAddItem(false);
         })
         .catch((error) => {
            console.log(error);
         });
   };

   // handle input value change func
   const handelChange = (e) => {
      setInventoryFormData({
         ...inventoryFormData,
         [e.target.name]: e.target.value,
      });
   };

   // Inventory update func
   const updateItem = (data, id) => {
      const payload = {
         shopOwnerId: data.shopOwnerId,
         itemName: data.itemName,
         itemCategory: data.itemCategory,
         quantity: Number(data.quantity),
      };
      axios
         .post(`http://localhost:8005/api/inventory/updateItem/${id}`, payload)
         .then(() => {
            setInventoryFormData({
               shopOwnerId: "",
               itemName: "",
               itemCategory: "",
               quantity: "",
            });
            getInventoryData();
            setIsClickUpdateItem(false);
            setSelectedItemId("");
         })
         .catch((error) => {
            console.log(error);
         });
   };

   const deleteItem = (id) => {
      axios
         .post(`http://localhost:8005/api/inventory/deleteItem/${id}`)
         .then(() => {
            getInventoryData();
            setIsClickDeleteItem(false);
            setSelectedItemId("");
         })
         .catch((error) => {
            console.log(error);
         });
   };

   return (
      <div className="p-[20px]">
         <div className=" bg-white p-5 shadow-sm rounded-sm border border-gray-200 ">
            <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-200">
               <h2 className="text-xl font-semibold text-gray-800">
                  Manage Inventory
               </h2>
               <button
                  onClick={() => {
                     setIsClickAddItem(true);
                  }}
                  className="bg-sec-green text-white px-4 py-2 rounded-sm hover:bg-opacity-80"
               >
                  + Add Item
               </button>
            </div>

            <div className="overflow-x-auto">
               <table className="w-full border-collapse bg-white rounded-sm shadow-sm text-left">
                  <thead>
                     <tr className=" text-gray-700 border-b border-gray-200">
                        <th className="px-3 py-4 text-xs font-semibold text-gray-800 uppercase tracking-wider">
                           Item Name
                        </th>
                        <th className="px-3 py-4 text-xs font-semibold text-gray-800 uppercase tracking-wider">
                           Category
                        </th>
                        <th className="px-3 py-4 text-xs font-semibold text-gray-800 uppercase tracking-wider">
                           Quantity
                        </th>

                        <th className="px-3 py-4 text-xs font-semibold text-gray-800 uppercase tracking-wider">
                           Actions
                        </th>
                     </tr>
                  </thead>
                  <tbody className="text-gray-500 text-sm divide-y">
                     {inventoryData.map((item) => (
                        <tr className="border-b" key={item._id}>
                           <td className="px-3 py-2">{item.itemName}</td>
                           <td className="px-3 py-2">{item.itemCategory}</td>
                           <td className="px-3 py-2">{item.quantity} kg</td>

                           <td className="px-3 py-2 flex justify-start gap-1">
                              <button
                                 onClick={() => {
                                    setIsClickUpdateItem(true);
                                    setInventoryFormData({
                                       itemName: item.itemName,
                                       itemCategory: item.itemCategory,
                                       quantity: item.quantity,
                                    });
                                    setSelectedItemId(item._id);
                                 }}
                                 className="bg-sec-green text-white px-3 py-2 rounded "
                              >
                                 <i className="bi bi-pencil-fill"></i>
                              </button>
                              <button
                                 onClick={() => {
                                    setIsClickDeleteItem(true);
                                    setSelectedItemId(item._id);
                                 }}
                                 className="bg-gray-500 text-white px-3 py-2 rounded "
                              >
                                 <i className="bi bi-trash-fill"></i>
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
         {/* Invnetory adding form */}
         {isClickAddItem && (
            <AddInventoryItem
               setIsClickAddItem={setIsClickAddItem}
               addInventoryItem={addInventoryItem}
               handelChange={handelChange}
               inventoryFormData={inventoryFormData}
            />
         )}
         {isClickUpdateItem && (
            <UpdateInventoryItem
               setIsClickUpdateItem={setIsClickUpdateItem}
               updateItem={updateItem}
               handelChange={handelChange}
               inventoryFormData={inventoryFormData}
               selectedItem={selectedItem}
               setSelectedItemId={setSelectedItemId}
            />
         )}
         {isClickDeleteItem && (
            <DeleteInventoryItem
               setIsClickDeleteItem={setIsClickDeleteItem}
               selectedItem={selectedItem}
               setSelectedItemId={setSelectedItemId}
               deleteItem={deleteItem}
            />
         )}
      </div>
   );
}

export default ManageInventory;
