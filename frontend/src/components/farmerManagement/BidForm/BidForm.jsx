import React, { useState } from 'react'
import { Send, MapPin, Check } from 'lucide-react';
import axios from 'axios';
import Token from '@/components/userManagement/logins/Token';

function BidForm() {

    const token = Token();

    const [showForm, setShowForm] = useState(true);

    const [cropsName, setCropsName] = useState("");
    const [cropsCategory, setCropsCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [location, setLocation] = useState("");

  const districts = ["Ampara","Anuradhapura","Badulla","Batticaloa","Colombo","Galle","Gampaha","Hambantota","Jaffna","Kalutara","Kandy","Kegalle","Kilinochchi",
    "Kurunegala","Mannar","Matale","Matara","Monaragala","Mullaitivu","Nuwara Eliya","Polonnaruwa","Puttalam","Ratnapura","Trincomalee","Vavuniya"];

    const Category = ["Vegetables","Fruits","Nuts","Spices","Other"];

    // console.log(token);
    const farmerId = token.userId;
    // console.log(farmerId);


    const handleSubmit = async (e) => {

        try{
            e.preventDefault();
            const bidPostData = {
                farmerId: farmerId,
                cropsName: cropsName,
                cropsCategory: cropsCategory,
                description: description,
                price: price,
                quantity: quantity,
                location: location,
            };
            console.log(bidPostData);
            await axios.post("http://localhost:8005/api/BidPost", bidPostData);
            setShowForm(false);
        }catch(error){
            console.log(error);
            alert("Something went wrong");
        }
    }

  return showForm ? (
    <form onSubmit={handleSubmit}>              
        <div className="mb-6 flex gap-6">
            <div className='w-[300px]'>
                <label className="block text-sm font-medium text-gray-700 mb-2">Crops Name</label>
                <input 
                    name='cropsName'
                    value={cropsName}
                    onChange={(e) => setCropsName(e.target.value)}
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    placeholder="Enter a descriptive title for your post"
                />
            </div>
            <div className='w-[300px]'>
                <label className="block text-sm font-medium text-gray-700 mb-2">Crops Category</label>
                <select
                    name='cropsCategory'
                    value={cropsCategory}
                    onChange={(e) => setCropsCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                    <option value="">Select a category</option>
                    {Category.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

        </div>
        
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea 
                name='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent h-32"
                placeholder="Describe your products, pricing, and other relevant details"
            ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price (per kg)</label>
            <input 
                name='price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                placeholder="0.00"
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity Available (kg)</label>
            <input 
                name='quantity'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type="number" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                placeholder="0"
            />
            </div>
        </div>
        
        <div className="flex flex-wrap gap-3 mb-6">
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
        </div>  

        <div className="flex justify-end items-center p-6 border-t bg-gray-50">
            <button 
                type='submit'
                className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
            <div className="flex items-center">
                <Send className="mr-2 h-4 w-4" />
                Publish Post
            </div>
            </button>
        </div>                 
    </form>
  ) : (
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

export default BidForm;