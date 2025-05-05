import React, { useState } from 'react';
import { FaTruck, FaMapMarkerAlt, FaCalendarAlt, FaBox, FaInfoCircle } from 'react-icons/fa';

function RequestTransport() {

    const [formData, setFormData] = useState({
        pickupLocation: '',
        deliveryLocation: '',
        pickupDate: '',
        cargoType: '',
        cargoWeight: '',
        specialInstructions: '',
        contactNumber: '',
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
      };
    
      const districts = [
        "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya",
        "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar",
        "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee",
        "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla",
        "Monaragala", "Ratnapura", "Kegalle"
      ];
    
      const cargoTypes = [
        "Vegetables", "Fruits", "Grains", "Spices", "Tea", "Other"
      ];

  return (
   <>                
    <form onSubmit={handleSubmit} className="space-y-6">
        {/* Pickup and Delivery Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaMapMarkerAlt className="inline-block mr-2 text-green-600" />
            Pickup Location
            </label>
            <select
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
            <option value="">Select District</option>
            {districts.map((district) => (
                <option key={district} value={district}>{district}</option>
            ))}
            </select>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaMapMarkerAlt className="inline-block mr-2 text-green-600" />
            Delivery Location
            </label>
            <select
            name="deliveryLocation"
            value={formData.deliveryLocation}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
            <option value="">Select District</option>
            {districts.map((district) => (
                <option key={district} value={district}>{district}</option>
            ))}
            </select>
        </div>
        </div>

        {/* Pickup Date and Cargo Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaCalendarAlt className="inline-block mr-2 text-green-600" />
            Pickup Date
            </label>
            <input
            type="date"
            name="pickupDate"
            value={formData.pickupDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaBox className="inline-block mr-2 text-green-600" />
            Cargo Type
            </label>
            <select
            name="cargoType"
            value={formData.cargoType}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
            <option value="">Select Cargo Type</option>
            {cargoTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
            ))}
            </select>
        </div>
        </div>

        {/* Cargo Weight and Contact Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
            Cargo Weight (kg)
            </label>
            <input
            type="number"
            name="cargoWeight"
            value={formData.cargoWeight}
            onChange={handleChange}
            required
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Number
            </label>
            <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            placeholder="07XXXXXXXX"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
        </div>
        </div>

        {/* Special Instructions */}
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaInfoCircle className="inline-block mr-2 text-green-600" />
            Special Instructions
        </label>
        <textarea
            name="specialInstructions"
            value={formData.specialInstructions}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            placeholder="Any special requirements or instructions for the transportation..."
        />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
        <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
        >
            Request Transportation
        </button>
        </div>
    </form>
    </>
  )
}

export default RequestTransport