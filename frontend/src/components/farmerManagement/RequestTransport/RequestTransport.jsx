import axios from 'axios';
import React, { useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaBox, FaInfoCircle } from 'react-icons/fa';
import { MessageCircle } from 'lucide-react';
import Token from '@/components/userManagement/logins/Token';

function RequestTransport() {

    const token = Token();
    const farmerId = token.userId;
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        farmerId: farmerId,
        pickupLocation: '',
        deliveryLocation: '',
        pickupDate: '',
        cargoType: '',
        cargoWeight: '',
        specialInstructions: '',
        contactNumber: '',
        driverName: 'Not Available',
        contactNumberDriver: 'Not Available',
        vehcaleNo: 'Not Available',
        status: 'Pending'
    });

    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await axios.post("http://localhost:8005/api/transport/add", formData);
            console.log("Transport Added Successfully");
            console.log('Form submitted:', formData);
            setShowSuccess(true);
            setTimeout(() => {
                setIsSubmitted(true);
            }, 2000);
        } catch (error) {
            console.error("Error submitting transport request:", error);
        }
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

    const RequestDetails = () => (
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-green-600 mb-2">Transport Request Submitted</h2>
                <p className="text-gray-600">Your request has been successfully submitted. We'll contact you soon.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-3">Pickup Details</h3>
                    <div className="space-y-2">
                        <p className="flex items-center text-gray-600">
                            <FaMapMarkerAlt className="mr-2 text-green-600" />
                            <span className="font-medium">Location:</span> {formData.pickupLocation}
                        </p>
                        <p className="flex items-center text-gray-600">
                            <FaCalendarAlt className="mr-2 text-green-600" />
                            <span className="font-medium">Date:</span> {formData.pickupDate}
                        </p>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-3">Delivery Details</h3>
                    <div className="space-y-2">
                        <p className="flex items-center text-gray-600">
                            <FaMapMarkerAlt className="mr-2 text-green-600" />
                            <span className="font-medium">Location:</span> {formData.deliveryLocation}
                        </p>
                        <p className="flex items-center text-gray-600">
                            <FaBox className="mr-2 text-green-600" />
                            <span className="font-medium">Cargo Type:</span> {formData.cargoType}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3">Additional Information</h3>
                <div className="space-y-2">
                    <p className="text-gray-600">
                        <span className="font-medium">Cargo Weight:</span> {formData.cargoWeight} kg
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">Contact Number:</span> {formData.contactNumber}
                    </p>
                    {formData.specialInstructions && (
                        <p className="text-gray-600">
                            <span className="font-medium">Special Instructions:</span> {formData.specialInstructions}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
                <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                    <MessageCircle size={20} />
                    Contact Support
                </button>
            </div>
        </div>
    );

    return (
        <>
            {!isSubmitted ? (
                <>
                    {showSuccess ? (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <strong className="font-bold">Success! </strong>
                            <span className="block sm:inline">Your transport request has been submitted successfully.</span>
                        </div>
                    ) : (
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
                    )}
                </>
            ) : (
                <RequestDetails />
            )}
        </>
    )
}

export default RequestTransport