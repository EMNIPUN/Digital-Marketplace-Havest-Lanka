import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaBox, FaInfoCircle } from 'react-icons/fa';
import { MessageCircle } from 'lucide-react';
import Token from '@/components/userManagement/logins/Token';
import { useParams } from 'react-router-dom';

function RequestTransport() {
    const { id } = useParams();
    const token = Token();
    const farmerId = token.userId;
    const [showSuccess, setShowSuccess] = useState(false);
    const [data, setData] = useState([]);
    const [submittedRequests, setSubmittedRequests] = useState([]);
    const [formData, setFormData] = useState({
        farmerId: farmerId,
        bidPostId: id,
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
        status: 'On Going',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        // Fetch bid post data
        const fetchBidPostData = async () => {
            try {
                const response = await axios.get(`http://localhost:8005/api/transport/bidpost/${id}`);
                setData(response.data);
                console.log("Fetched data:", response.data); // Debug log
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchBidPostData();
    }, [id]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await axios.post("http://localhost:8005/api/transport/add", formData);
            console.log("Transport Added Successfully");
            
            
            setShowSuccess(true);
            // Reset form
            setFormData({
                farmerId: farmerId,
                bidPostId: id,
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
                status: 'Transport Pending'
            });
            
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        } catch (error) {
            console.error("Error submitting transport request:", error);
        }
    };

    const Pickupdistricts = [
        "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya",
        "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar",
        "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee",
        "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla",
        "Monaragala", "Ratnapura", "Kegalle"
    ];

    const Deliverydistricts = [
        "Dambulla"
    ];
    
    const cargoTypes = [
        "Vegetables", "Fruits", "Grains", "Spices", "Tea", "Other"
    ];

    return (
        <div className="space-y-8">
            {showSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Success! </strong>
                    <span className="block sm:inline">Your transport request has been submitted successfully.</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-green-600 mb-6">New Transport Request</h2>
                
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
                            {Pickupdistricts.map((district) => (
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
                            {Deliverydistricts.map((district) => (
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

            <div>
                <h2 className="text-2xl font-bold text-green-600 mb-6">Transport Information</h2>
                {data && data.length > 0 ? (
                    data.map((item, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm p-6 space-y-6 mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-gray-700 mb-3">Pickup Details</h3>
                                    <div className="space-y-2">
                                        <p className="flex items-center text-gray-600">
                                            <FaMapMarkerAlt className="mr-2 text-green-600" />
                                            <span className="font-medium">Location:</span> {item.pickupLocation}
                                        </p>
                                        <p className="flex items-center text-gray-600">
                                            <FaCalendarAlt className="mr-2 text-green-600" />
                                            <span className="font-medium">Date:</span> {item.pickupDate}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-gray-700 mb-3">Delivery Details</h3>
                                    <div className="space-y-2">
                                        <p className="flex items-center text-gray-600">
                                            <FaMapMarkerAlt className="mr-2 text-green-600" />
                                            <span className="font-medium">Location:</span> {item.deliveryLocation}
                                        </p>
                                        <p className="flex items-center text-gray-600">
                                            <FaBox className="mr-2 text-green-600" />
                                            <span className="font-medium">Cargo Type:</span> {item.cargoType}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-center items-center gap-4'>
                                <div className="bg-gray-50 p-4 rounded-lg w-[400px]">
                                    <h3 className="font-semibold text-gray-700 mb-3">Cargo Information</h3>
                                    <div className="space-y-2">
                                        <p className="text-gray-600">
                                            <span className="font-medium">Cargo Weight:</span> {item.cargoWeight} kg
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="font-medium">Contact Number:</span> {item.contactNumber}
                                        </p>
                                        {item.specialInstructions && (
                                            <p className="text-gray-600">
                                                <span className="font-medium">Special Instructions:</span> {item.specialInstructions}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg w-[400px]">
                                    <h3 className="font-semibold text-gray-700 mb-3">Driver Information</h3>
                                    <div className="space-y-2">
                                        <p className="text-gray-600">
                                            <span className="font-medium">Driver Name:</span> {item.driverName}
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="font-medium">Driver Contact:</span> {item.contactNumberDriver}
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="font-medium">Vehicle Number:</span> {item.vehcaleNo}
                                        </p>
                                    </div>
                                </div>      
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg text-center flex justify-between items-center gap-4">
                                <p className="text-gray-600">
                                    <span className="font-bold">Status:</span> 
                                    <span className={`font-medium ${
                                        item.status === 'Transport Pending' ? 'text-yellow-500' :
                                        item.status === 'On Going' ? 'text-blue-500' :
                                        item.status === 'Completed' ? 'text-green-500' :
                                        'text-gray-500'
                                    }`}> {item.status}</span> 
                                </p>
                                <button 
                                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-sm"
                                >
                                    <FaCalendarAlt className="text-white" />
                                    Confirm Pickup
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                        <p className="text-gray-600">No transport information available.</p>
                    </div>
                )}
            </div>
        </div>
        
    );
}

export default RequestTransport;