import React, { useEffect, useState } from "react";
import axios from "axios";
import AddInventoryItem from "../../components/shopOwnerManagement/inventory/AddInventoryItem";
import UpdateInventoryItem from "../../components/shopOwnerManagement/inventory/UpdateInventoryItem";
import DeleteInventoryItem from "../../components/shopOwnerManagement/inventory/DeleteInventoryItem";
import Token from "@/components/userManagement/logins/Token";
import { ToastContainer, toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import SOLoading from "@/components/shopOwnerManagement/SOLoading";

function ManageInventory(props) {
   // Notification
   const notifyAdd = () => {
      toast("New Item Added", {
         hideProgressBar: true,
         autoClose: 3000,
         style: {
            background: " #108a01",
            color: "#fff",
         },
      });
   };

   const notifyUpdate = () => {
      toast("Item Details Updated Successfull!", {
         hideProgressBar: true,
         autoClose: 3000,
         style: {
            background: " #108a01",
            color: "#fff",
         },
      });
   };

   const notifyDelete = () => {
      toast("Item Deleted Successfull!", {
         hideProgressBar: true,
         autoClose: 3000,
         style: {
            background: " #108a01",
            color: "#fff",
         },
      });
   };

   // set popups
   const [isClickAddItem, setIsClickAddItem] = useState(false);
   const [isClickUpdateItem, setIsClickUpdateItem] = useState(false);
   const [isClickDeleteItem, setIsClickDeleteItem] = useState(false);

   // select id to send as a props
   const [selectedItem, setSelectedItemId] = useState("");

   // Shop-owner Id
   const token = Token();
   const sid = token.userId;

   // filter items
   const [selectedCategory, setSelectedCategory] = useState("All");

   const handelChangeOnCategory = (e) => {
      e.preventDefault();
      setSelectedCategory(e.target.value);
   };

   // loading
   const [isLoading, setIsLoading] = useState(false);

   // showing inventory items
   const [inventoryData, setInventoryData] = useState([]);

   const getInventoryDataById = async () => {
      setIsLoading(true);
      await axios
         .get(`http://localhost:8005/api/inventory/getInventoryById/${sid}`)
         .then((response) => {
            setInventoryData(response.data);
         })
         .catch((error) => {
            console.log(error);
         })
         .finally(() => {
            setIsLoading(false);
         });
   };

   useEffect(() => {
      getInventoryDataById();
   }, []);

   // Inventory data adding function
   const [inventoryFormData, setInventoryFormData] = useState({
      shopOwnerId: sid,
      itemName: "",
      itemCategory: "",
      quantity: "",
   });

   const addInventoryItem = async (data) => {
      const payload = {
         shopOwnerId: data.shopOwnerId,
         itemName: data.itemName,
         itemCategory: data.itemCategory,
         quantity: Number(data.quantity),
      };
      await axios
         .post("http://localhost:8005/api/inventory/addItem", payload)
         .then(() => {
            setInventoryFormData({
               shopOwnerId: sid,
               itemName: "",
               itemCategory: "",
               quantity: "",
            });
            getInventoryDataById();
            setIsClickAddItem(false);
            notifyAdd();
         })
         .catch((error) => {
            console.log(error);
         });
   };

   // validations
   const [alreadyIn, setAlreadyIn] = useState(false);
   const [isEmpty, setIsEmpty] = useState({
      name: false,
      category: false,
      quantity: false,
   });

   const handelChange = (e) => {
      const findedItem = inventoryData.find(
         (item) => item.itemName === e.target.value
      );

      // check item was already added
      if (findedItem != null && e.target.value === findedItem.itemName) {
         setAlreadyIn(true);
      } else {
         setAlreadyIn(false);
      }

      // check item name length
      if (e.target.name === "itemName") {
         if (e.target.value.length < 2 || e.target.value.length > 25) {
            setIsEmpty((prev) => ({ ...prev, name: true }));
         } else {
            setIsEmpty((prev) => ({ ...prev, name: false }));
         }
      }

      // check item quantity lenght
      if (e.target.name === "quantity") {
         if (e.target.value > 999999 || e.target.value < 1) {
            setIsEmpty((prev) => ({ ...prev, quantity: true }));
         } else {
            setIsEmpty((prev) => ({ ...prev, quantity: false }));
         }
      }

      setInventoryFormData({
         ...inventoryFormData,
         [e.target.name]: e.target.value,
      });
   };

   // Inventory update function
   const updateItem = async (data, id) => {
      const payload = {
         shopOwnerId: data.shopOwnerId,
         itemName: data.itemName,
         itemCategory: data.itemCategory,
         quantity: Number(data.quantity),
      };
      await axios
         .post(`http://localhost:8005/api/inventory/updateItem/${id}`, payload)
         .then(() => {
            setInventoryFormData({
               shopOwnerId: sid,
               itemName: "",
               itemCategory: "",
               quantity: "",
            });
            getInventoryDataById();
            setIsClickUpdateItem(false);
            setSelectedItemId("");
            notifyUpdate();
         })
         .catch((error) => {
            console.log(error);
         });
   };

   // Inventory item delete function
   const deleteItem = async (id) => {
      await axios
         .post(`http://localhost:8005/api/inventory/deleteItem/${id}`)
         .then(() => {
            getInventoryDataById();
            setIsClickDeleteItem(false);
            setSelectedItemId("");
            notifyDelete();
         })
         .catch((error) => {
            console.log(error);
         });
   };

   // show alert when low stock
   const findLowStockItem = inventoryData.filter((item) => item.quantity < 50);

   // generate report
   const generateReportBtn = () => {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("Inventory Report", 14, 15);

      const headers = [["Item Name", "Category", "Quantity"]];

      const filteredData = inventoryData.filter(
         (item) =>
            selectedCategory === "All" || item.itemCategory === selectedCategory
      );

      const data = filteredData.map((item) => [
         item.itemName,
         item.itemCategory,
         item.quantity + " kg",
      ]);

      autoTable(doc, {
         startY: 25,
         head: headers,
         body: data,
         theme: "striped",
      });

      const fileName =
         selectedCategory === "All"
            ? "Inventory_Report_All.pdf"
            : `Inventory_Report_${selectedCategory}.pdf`;

      doc.save(fileName);
   };

   return (
      <div className="p-[20px]">
         <div className=" bg-white p-5 shadow-sm rounded-sm border border-gray-200 ">
            {/* header */}
            <div className="flex justify-between items-center mb-4 pb-2  border-gray-200">
               <div className="flex flex-col">
                  <h2 className="text-xl font-semibold text-gray-800">
                     Manage Inventory
                  </h2>
                  <small>
                     Generate Report of your inventory{" "}
                     <button
                        onClick={generateReportBtn}
                        className="text-sec-green text-sm font-medium underline"
                     >
                        Click Here
                     </button>{" "}
                  </small>
               </div>
               <div className="flex gap-2">
                  <div className="flex gap-2 items-center ">
                     <div className="text-xs tracking-wide uppercase font-semibold text-gray-500">
                        Filter By:
                     </div>
                     <form
                        action=""
                        className="flex gap-2"
                        onSubmit={handelChangeOnCategory}
                     >
                        <select
                           name=""
                           id=""
                           defaultValue={"All"}
                           onChange={handelChangeOnCategory}
                           className="py-2 px-4 h-10 border border-gray-300 w-64 rounded text-gray-600 text-sm focus:outline-none focus:ring-gray-400"
                        >
                           <option value="All">All Category</option>
                           <option value="Fruit">Fruit</option>
                           <option value="Vegetable">Vegetable</option>
                           <option value="Nuts">Nuts</option>
                           <option value="Spices">Spices</option>
                           <option value="Other">Other</option>
                        </select>
                     </form>
                  </div>
                  <div className="line w-px h-auto6 bg-gray-200"></div>
                  <button
                     onClick={() => {
                        setIsClickAddItem(true);
                     }}
                     className="bg-sec-green text-white px-4 h-10 py-2 rounded-sm hover:bg-opacity-80"
                  >
                     + Add New Item
                  </button>
               </div>
            </div>

            {/* Shop alert on low stock */}
            {findLowStockItem.length > 0 && (
               <div className="bg-yellow-50 border border-yellow-100 rounded-sm p-4 shadow-sm mb-5">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
                     <div className="flex items-center space-x-4">
                        <div className="bg-yellow-100 p-3 rounded-full">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-yellow-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                              />
                           </svg>
                        </div>
                        <div>
                           <h3 className="text-lg font-bold text-gray-800 flex items-center">
                              Inventory Low Stock Alert
                           </h3>
                           <p className="text-sm text-gray-500">
                              Critical stock levels detected in your inventory
                           </p>
                        </div>
                     </div>
                     <div className="bg-yellow-50 px-4 py-2 rounded-full">
                        <span className="text-sm text-yellow-700 font-semibold">
                           {findLowStockItem.length} Item
                           {findLowStockItem.length > 1 ? "s" : ""} Low in Stock
                        </span>
                     </div>
                  </div>
                  <div className="space-y-2">
                     {findLowStockItem.map((lowItem) => (
                        <div
                           key={lowItem._id}
                           className="flex justify-between items-center bg-yellow-100 py-2 px-10 rounded-sm text-base"
                        >
                           <span className="text-yellow-800 font-semibold">
                              {lowItem.itemName}
                           </span>
                           <span className="text-yellow-800 font-semibold bg-yellow-200 px-2 py-1 rounded-sm text-sm">
                              {lowItem.quantity} Kg only
                           </span>
                        </div>
                     ))}
                  </div>
               </div>
            )}

            {/* Display inventory data */}
            <div className="overflow-x-auto min-h-56 ">
               {isLoading ? (
                  <div className="w-full flex items-center justify-center h-56">
                     <SOLoading />
                  </div>
               ) : (
                  <table className="w-full border-collapse bg-white rounded-sm shadow-sm text-left border border-gray-200">
                     <thead>
                        <tr className=" text-gray-700 border-b border-gray-200 bg-gray-100">
                           <th className="px-3 py-4 text-xs font-semibold text-gray-800 uppercase tracking-wider">
                              Item Name
                           </th>
                           <th className="px-3 py-4 text-xs font-semibold text-gray-800 uppercase tracking-wider">
                              Category
                           </th>
                           <th className="px-3 py-4 text-xs font-semibold text-gray-800 uppercase tracking-wider">
                              Quantity
                           </th>

                           <th className="px-3 py-4 text-xs font-semibold text-gray-800 uppercase tracking-wider w-12">
                              Actions
                           </th>
                        </tr>
                     </thead>
                     <tbody className="text-gray-500 text-sm divide-y">
                        {/* Showing all inventory data */}
                        {inventoryData
                           .filter(
                              (item) =>
                                 selectedCategory === "All" ||
                                 item.itemCategory === selectedCategory
                           )
                           .map((item) => (
                              <tr className="border-b" key={item._id}>
                                 <td className="px-3 py-2">{item.itemName}</td>
                                 <td className="px-3 py-2">
                                    {item.itemCategory}
                                 </td>
                                 <td className="px-3 py-2">
                                    {item.quantity} kg
                                 </td>

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
               )}
            </div>
         </div>
         {/* Invnetory adding form */}
         {isClickAddItem && (
            <AddInventoryItem
               setIsClickAddItem={setIsClickAddItem}
               addInventoryItem={addInventoryItem}
               handelChange={handelChange}
               inventoryFormData={inventoryFormData}
               alreadyIn={alreadyIn}
               isEmpty={isEmpty}
               setIsEmpty={setIsEmpty}
               setInventoryFormData={setInventoryFormData}
               sid={sid}
            />
         )}

         {/*Inventory update form  */}
         {isClickUpdateItem && (
            <UpdateInventoryItem
               setIsClickUpdateItem={setIsClickUpdateItem}
               updateItem={updateItem}
               handelChange={handelChange}
               inventoryFormData={inventoryFormData}
               setInventoryFormData={setInventoryFormData}
               sid={sid}
               selectedItem={selectedItem}
               setSelectedItemId={setSelectedItemId}
               isEmpty={isEmpty}
               setIsEmpty={setIsEmpty}
               alreadyIn={alreadyIn}
            />
         )}

         {/* Inventory delete popup */}
         {isClickDeleteItem && (
            <DeleteInventoryItem
               setIsClickDeleteItem={setIsClickDeleteItem}
               selectedItem={selectedItem}
               setSelectedItemId={setSelectedItemId}
               deleteItem={deleteItem}
               setInventoryFormData={setInventoryFormData}
               sid={sid}
            />
         )}

         <ToastContainer />
      </div>
   );
}

export default ManageInventory;
