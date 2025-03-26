import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EditBidPost({ vehicleId, setIsOpenUpdateForm }) {
console.log(vehicleId);

  const navigate = useNavigate();

  const [vehicleDetails, setVehicleDetails] = useState({});
  const [driverVehicleData, setDriverVehicleData] = useState({
    driverFirstName: '',
    driverLastName: '',
    email: '',
    address: '',
    location: '',
    contactNumber: '',
    vehicleType: '',
    vehicleNumber: ''
  });

  const [loading, setLoading] = useState(true); // Loading state to handle data fetch

  const districts = [
    "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya", "Galle", "Matara", "Hambantota",
    "Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee",
    "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla", "Monaragala", "Ratnapura", "Kegalle"
  ];

  const vehicleTypes = ["Car", "Van", "Truck", "Bus", "Motorbike", "Three-Wheeler"];

  const handleChange = (e) => {
    setDriverVehicleData({ ...driverVehicleData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios.get(`http://localhost:8005/api/vehicle/getvehiclebuyid/` + vehicleId)
      .then(response => {
        setVehicleDetails(response.data);
        setLoading(false); // Set loading to false once data is fetched
        setDriverVehicleData({
          driverFirstName: response.data.driverFirstName || '',
          driverLastName: response.data.driverLastName || '',
          email: response.data.email || '',
          address: response.data.address || '',
          location: response.data.location || '',
          contactNumber: response.data.contactNumber || '',
          vehicleType: response.data.vehicleType || '',
          vehicleNumber: response.data.vehicleNumber || ''
        });
      })
      .catch(error => {
        console.error(error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, [vehicleId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8005/api/vehicle/updatevehicle/${vehicleId}`, driverVehicleData);
      alert('Driver and Vehicle details updated successfully!');
      navigate('/transport/management');
    } catch (error) {
      alert('Error updating driver and vehicle details!');
    }
  };

  // If the data is loading, show a loading message or spinner
  if (loading) {
    return <div>Loading...</div>;
  }

  const closeUpdateForm = (e) => {
   
      setIsOpenUpdateForm(false)
      setDriverVehicleData({
        driverFirstName: '',
        driverLastName: '',
        email: '',
        address: '',
        location: '',
        contactNumber: '',
        vehicleType: '',
        vehicleNumber: ''
      })
      navigate('/transport/management')
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-8 relative">
        <div className='text-xl absolute top-5 right-5 cursor-pointer' onClick={closeUpdateForm}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Driver and Vehicle Details</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Driver Name */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="driverFirstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="driverFirstName"
              name="driverFirstName"
              value={driverVehicleData.driverFirstName}
              onChange={handleChange}
              required
              className="mt-1 p-1 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label htmlFor="driverLastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="driverLastName"
              name="driverLastName"
              value={driverVehicleData.driverLastName}
              onChange={handleChange}
              required
              className="mt-1 p-1 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Email and Address */}
        <div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={driverVehicleData.email}
              onChange={handleChange}
              required
              className="mt-1 p-1 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={driverVehicleData.address}
              onChange={handleChange}
              required
              className="mt-1 p-1 border border-gray-300 rounded-md w-full h-24 focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Location and Contact Number */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location (District)
            </label>
            <select
              id="location"
              name="location"
              value={driverVehicleData.location}
              onChange={handleChange}
              required
              className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={driverVehicleData.contactNumber}
              onChange={handleChange}
              required
              className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Vehicle Type and Vehicle Number */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">
              Vehicle Type
            </label>
            <select
              id="vehicleType"
              name="vehicleType"
              value={driverVehicleData.vehicleType}
              onChange={handleChange}
              required
              className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Vehicle Type</option>
              {vehicleTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="vehicleNumber" className="block text-sm font-medium text-gray-700">
              Vehicle Number
            </label>
            <input
              type="text"
              id="vehicleNumber"
              name="vehicleNumber"
              value={driverVehicleData.vehicleNumber}
              onChange={handleChange}
              required
              className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBidPost;
