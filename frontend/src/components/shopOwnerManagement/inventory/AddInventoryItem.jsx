import React from "react";

function AddInventoryItem(props) {
   const {
      setIsClickAddItem,
      addInventoryItem,
      handelChange,
      inventoryFormData,
   } = props;

   // close function for item add form
   const closeForm = (e) => {
      if (e.target.id === "AddInventoryForm") {
         setIsClickAddItem(false);
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
            className="bg-white px-10 py-16 w-1/3 flex flex-col gap-5 items-center text-gray-700 rounded shadow"
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
                  className="border border-gray-300 py-2 px-5 w-full rounded-sm font-light"
                  required
                  placeholder="Eg: Carrots"
                  value={inventoryFormData.itemName}
                  onChange={handelChange}
               />
            </div>
            <div className="flex flex-col gap-1 text-sm w-full">
               <label htmlFor="" className="font-medium text-black">
                  Item Category
               </label>
               <select
                  className="border border-gray-300 py-2 px-5 w-full rounded-sm text-gray-600"
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
                  type="text"
                  name="quantity"
                  className="border border-gray-300 py-2 px-5 w-full rounded-sm"
                  required
                  placeholder="Eg: 100Kg"
                  value={inventoryFormData.quantity}
                  onChange={handelChange}
               />
            </div>
            <button
               type="submit"
               className="w-full bg-main-green text-white py-2 rounded-sm"
            >
               Add Item
            </button>
         </form>
      </div>
   );
}

export default AddInventoryItem;
