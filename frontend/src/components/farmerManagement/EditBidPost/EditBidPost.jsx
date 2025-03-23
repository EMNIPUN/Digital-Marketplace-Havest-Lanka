import React, { useState } from 'react'
import { Send, MapPin, Check, TrainTrack, Loader } from 'lucide-react';
import axios from 'axios';

function EditBidPost({bidDetails, onUpdate}) {

  // console.log(bidDetails);
  // const id = bidDetails._id;
  // console.log(bidDetails._id);

  const [showForm, setShowForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [cropsName, setCropsName] = useState(bidDetails.cropsName);
  const [cropsCategory, setCropsCategory] = useState(bidDetails.cropsCategory);
  const [description, setDescription] = useState(bidDetails.description);
  const [price, setPrice] = useState(bidDetails.price);
  const [quantity, setQuantity] = useState(bidDetails.quantity);
  const [location, setLocation] = useState(bidDetails.location);



  const districts = ["Ampara","Anuradhapura","Badulla","Batticaloa","Colombo","Galle","Gampaha","Hambantota","Jaffna","Kalutara","Kandy","Kegalle","Kilinochchi",
    "Kurunegala","Mannar","Matale","Matara","Monaragala","Mullaitivu","Nuwara Eliya","Polonnaruwa","Puttalam","Ratnapura","Trincomalee","Vavuniya"];

  const handleUpdateicons = async () => {
    setIsLoading(true);
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const updateBidPostData = {
      cropsName: cropsName,
      cropsCategory: cropsCategory,
      description: description,
      price: price,
      quantity: quantity,
      location: location,
    };
    console.log(updateBidPostData);
    try {

      await axios.put("http://localhost:8005/api/BidPost/" + bidDetails._id, updateBidPostData);
      console.log("Bid Post Updated Successfully");
      setShowForm(false);
      onUpdate(updateBidPostData);

    } catch (error) {

      console.log(error);

    }
  }

  return showForm ? (  
      <form onSubmit={handleUpdateSubmit} className="space-y-6">
        <div className='flex gap-1'>
            <div className='w-[300px]'>
            <label htmlFor="cropsName" className="block text-sm font-medium text-gray-700 mb-1">
                Crops Name
            </label>
            <input
                type="text"
                id="cropsName"
                name="cropsName"
                value={cropsName}
                onChange={(e) => setCropsName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
            />
            </div>

            <div className='w-[300px]'>
            <label htmlFor="cropsCategory" className="block text-sm font-medium text-gray-700 mb-1">
                Crops Category
            </label>
            <select
                id="cropsCategory"
                name="cropsCategory"
                value={cropsCategory}
                onChange={(e) => setCropsCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
            >
                <option value="">Select a category</option>
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Grains">Grains</option>
                <option value="Pulses">Pulses</option>
                <option value="Others">Others</option>
            </select>
            </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          ></textarea>
        </div>

        {/* Price */}
          <div className='flex gap-1 '>
            <div className='w-[300px]'>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price (per unit)
                </label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                    min="0"
                    step="0.01"
                />
            </div>
            <div className='w-[300px]'>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                </label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                    min="1"
                />
            </div>          
          </div>

        <div className="mb-4">
                <div className='flex'>
                    <MapPin className="mr-2 h-4 w-4" />
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select District</label>
                </div>
                <select 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                    <option value="">Select a district</option>
                    {districts.map((district) => (
                        <option key={district} value={district}>
                            {district}
                        </option>
                    ))}
                </select>
            </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button 
            type="button" 
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="w-[200px] flex justify-center items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={handleUpdateicons}
          >
            {
              isLoading ? <Loader className="h-4 w-4 animate-spin" /> : "Update Bid" 
            }
          </button>
        </div>
      </form>
  ): (
      <div className="flex justify-center items-center p-8">
          <div className="bg-white rounded-lg shadow-xl p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <Check className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Post Published Successfully!</h2>
              <p className="text-gray-600 mb-6">Your bid post has been created and is now visible to buyers.</p>
          </div>
      </div>
  )
}

export default EditBidPost