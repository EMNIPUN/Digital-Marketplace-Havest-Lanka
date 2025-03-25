import React, { useState } from "react";

function AddInventoryItem(props) {
   const {
      setIsClickAddItem,
      addInventoryItem,
      handelChange,
      inventoryFormData,
      alreadyIn,
      isEmpty,
      setIsEmpty,
      setInventoryFormData,
      sid,
   } = props;

   // close function for item add form
   const closeForm = (e) => {
      if (e.target.id === "AddInventoryForm") {
         setIsClickAddItem(false);
         setIsEmpty({ name: false, category: false, quantity: false });
         setInventoryFormData({
            shopOwnerId: sid,
            itemName: "",
            itemCategory: "",
            quantity: "",
         });
      }
   };

   return (
      <div
         className="w-full h-screen z-[100] bg-black/80 fixed top-0 left-0 flex items-center justify-center"
         id="AddInventoryForm"
         onClick={closeForm}
      >
         <form
            onSubmit={(e) => {
               e.preventDefault();
               addInventoryItem(inventoryFormData);
            }}
            action=""
            className="bg-white px-10 py-10 w-1/3 flex flex-col gap-6 items-center text-gray-700 rounded shadow"
         >
            <div className="text-lg font-semibold uppercase ">
               Add Item to Inventory
            </div>

            <div className="flex flex-col gap-1 text-sm w-full">
               <label htmlFor="" className="font-medium text-black">
                  Item Name
               </label>
               <input
                  type="text"
                  name="itemName"
                  className="border border-gray-300 py-2 px-5 w-full rounded-sm font-light text-sm"
                  required
                  placeholder="Eg: Carrots"
                  value={inventoryFormData.itemName}
                  onChange={handelChange}
                  pattern="[A-Za-z\s]+"
                  title="Only letters and spaces are allowed"
               />
               {/* error for check already in */}
               {alreadyIn && (
                  <div className="text-xs w-full py-2 bg-red-100 text-center rounded-sm text-gray-600">
                     <i className="bi bi-exclamation-circle text-red-700 pr-3"></i>
                     This item already added to the inventory
                  </div>
               )}
               {/* Error for check length of input */}
               {isEmpty.name && (
                  <div className="text-xs w-full py-2 bg-red-100 text-center rounded-sm text-gray-600">
                     <i className="bi bi-exclamation-circle text-red-700 pr-3"></i>
                     Please enter a name with 2 to 25 characters.
                  </div>
               )}
            </div>

            <div className="flex flex-col gap-1 text-sm w-full">
               <label htmlFor="" className="font-medium text-black">
                  Item Category
               </label>
               <select
                  className="border border-gray-300 py-2 px-5 w-full rounded-sm text-gray-600 text-sm"
                  required
                  name="itemCategory"
                  value={inventoryFormData.itemCategory}
                  onChange={handelChange}
               >
                  <option value="" disabled>
                     Select Category
                  </option>
                  <option value="Fruit">Fruit</option>
                  <option value="Vegetable">Vegetable</option>
                  <option value="Nuts">Nuts</option>
                  <option value="Spices">Spices</option>
                  <option value="Other">Other</option>
               </select>
            </div>
            <div className="flex flex-col gap-1 text-sm w-full">
               <label htmlFor="" className="font-medium text-black">
                  Quantity You Have(Kg)
               </label>
               <input
                  type="number"
                  name="quantity"
                  className="border border-gray-300 py-2 px-5 w-full rounded-sm text-sm"
                  required
                  placeholder="Eg: 100Kg"
                  value={inventoryFormData.quantity}
                  onChange={handelChange}
               />
               {/* Error for check length of input */}
               {isEmpty.quantity && (
                  <div className="text-xs w-full py-2 bg-red-100 text-center rounded-sm text-gray-600">
                     <i className="bi bi-exclamation-circle text-red-700 pr-3"></i>
                     The quantity must be between 1 and 999 999.
                  </div>
               )}
            </div>
            {alreadyIn || isEmpty.name || isEmpty.quantity ? (
               <button
                  type="submit"
                  disabled
                  className="w-full bg-gray-400 border border-gray-300 text-gray-100 py-2 rounded-sm"
               >
                  Add Item
               </button>
            ) : (
               <button
                  type="submit"
                  className="w-full bg-main-green text-white py-2 rounded-sm"
               >
                  Add Item
               </button>
            )}
         </form>
      </div>
   );
}

export default AddInventoryItem;
