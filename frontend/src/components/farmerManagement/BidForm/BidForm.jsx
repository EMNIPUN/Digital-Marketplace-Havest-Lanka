import React, { useState } from "react";
import { Send, MapPin, Check } from "lucide-react";
import axios from "axios";
import Token from "@/components/userManagement/logins/Token";

function BidForm() {
  const token = Token();
  const farmerId = token.userId;

  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    cropsName: "",
    cropsCategory: "",
    description: "",
    price: "",
    quantity: "",
    location: "",
  });

  const [errors, setErrors] = useState({});

  const districts = [
    "Ampara","Anuradhapura","Badulla","Batticaloa","Colombo","Galle","Gampaha","Hambantota","Jaffna","Kalutara","Kandy","Kegalle","Kilinochchi",
    "Kurunegala","Mannar","Matale","Matara","Monaragala","Mullaitivu","Nuwara Eliya","Polonnaruwa","Puttalam","Ratnapura","Trincomalee","Vavuniya"
  ];

  const Category = ["Vegetables", "Fruits", "Nuts", "Spices", "Other"];

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (formData.cropsName.length === 0) {
      newErrors.cropsName = "(Crops Name is required)";
      isValid = false;
    }

    if (!formData.cropsCategory) {
      newErrors.cropsCategory = "(lease select a category)";
      isValid = false;
    }

    if (formData.description.length === 0) {
      newErrors.description = "(Description is required)";
      isValid = false;
    }

    if (!formData.price) {
      newErrors.price = "(Price is required)";
      isValid = false;
    } else if (formData.price <= 0) {
      newErrors.price = "(Price must be greater than 0)";
      isValid = false;
    }

    if (!formData.quantity) {
      newErrors.quantity = "(Quantity is required)";
      isValid = false;
    } else if (formData.quantity <= 0) {
      newErrors.quantity = "(Quantity must be greater than 0)";
      isValid = false;
    }

    if (!formData.location) {
      newErrors.location = "(Please select a district)";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const bidPostData = {
        farmerId: farmerId,
        ...formData,
      };

      await axios.post("http://localhost:8005/api/BidPost", bidPostData);
      setShowForm(false);
      
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return showForm ? (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <div className="flex gap-6">
        <div className="w-[300px]">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            Crops Name {errors.description && <p className="text-xs text-red-500">{errors.cropsName}</p>}
        </label>
          <input
            name="cropsName"
            value={formData.cropsName}
            onChange={handleChange}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="Enter a descriptive title"
          />
        </div>

        <div className="w-[300px]">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            Crops Category {errors.description && <p className="text-xs text-red-500">{errors.cropsCategory}</p>}
            </label>
          <select
            name="cropsCategory"
            value={formData.cropsCategory}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
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

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            Description 
            {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 h-32"
          placeholder="Describe your product"
        ></textarea>

      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            Price {errors.price && <p className="text-xs text-red-500">{errors.price}</p>}
            </label>
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            type="number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="0.00 (Price per kg)"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            Quantity Available
            {errors.quantity && <p className="text-xs text-red-500">{errors.quantity}</p>}
            </label>
          <input
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            type="number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="0 (kg)"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4" />
          <label className=" flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            Select District {errors.location && <p className="text-xs text-red-500">{errors.location}</p>}
          </label>
        </div>
        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select a district</option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
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
  );
}

export default BidForm;
