import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaPlus, FaSearch, FaFilter, FaFileExport, FaCog, FaUser, FaTruck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import EditBidPost from './EditBidPost';




const TransportManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isDriverVehicleModalOpen, setIsDriverVehicleModalOpen] = useState(false);
  const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
  const navigate = useNavigate();

  const [driverFormData, setDriverFormData] = useState({
    driverFirstName: '',
    driverLastName: '',
    email: '',
    address: '',
    location: '',
    contactNumber: '',
    vehicleType: '',
    vehicleNumber: '',
    password: ''
  });

  const districts = [
    "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya", "Galle", "Matara", "Hambantota",
    "Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee",
    "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla", "Monaragala", "Ratnapura", "Kegalle"
  ];

  const handleDriverFormChange = (e) => {
    setDriverFormData({ ...driverFormData, [e.target.name]: e.target.value });
  };


  const vehicleTypes = ["Car", "Van", "Truck", "Bus", "Motorbike", "Three-Wheeler"];

  const getAllData = async () => {
    try {
      const response = await axios.get('http://localhost:8005/api/vehicle/getallvehicles');
      setVehicles(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const deleteVehicle = async (vehicleId) => {
    try {
      await axios.delete(`http://localhost:8005/api/vehicle/deletevehicle/${vehicleId}`);
      alert('Vehicle deleted successfully');
      getAllData();
      navigate('/transport/management');
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllData();
  }, []);    

  const handleDriverFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8005/api/vehicle/createVehicle', driverFormData);
      alert('Vehicle added successfully');
      setIsDriverVehicleModalOpen(false);
      getAllData();
    
      navigate('/transport/management');
    } catch (error) {
      console.error(error);
      alert('Error adding vehicle');
    }
  };

  const [vehicleId, setVehicleId] = useState('');

  

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Transport Management
            </h1>
            <p className="text-gray-500 mt-1">Manage vehicles and drivers</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsDriverVehicleModalOpen(true)} 
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-sm hover:shadow-md flex items-center"
            >
              <FaPlus className="mr-2" /> Add Vehicle
            </button>
          </div>
        </div>

        {/* Vehicles Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Vehicle Fleet</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Driver</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact Number</th>
                  <th className="px-12 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
              {vehicles && vehicles.length > 0 ? (
                vehicles.map((vehicle, index) => (
                  <tr key={vehicle._id || index}>
                    <td className="px-6 py-4 text-sm text-gray-700">{vehicle.driverFirstName}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{vehicle.driverLastName}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{vehicle.email} {vehicle.address}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{vehicle.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{vehicle.contactNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 flex space-x-2">
                      <button onClick={() => {setIsOpenUpdateForm(true); setVehicleId(vehicle._id)}}  className="text-blue-600 hover:text-blue-800">Edit</button>
                      <button onClick={() => deleteVehicle(vehicle._id)} className="text-red-600 hover:text-red-800">Delete</button>
                    </td>
                  </tr>
                  
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-4">
                    No vehicles found
                  </td>
                </tr>
              )}
              {isOpenUpdateForm && (
                      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center' id="update-form" >
                        <EditBidPost vehicleId={vehicleId} setIsOpenUpdateForm={setIsOpenUpdateForm} />
                      </div>
                    )}
              </tbody>
            </table>
          </div>
        </div>



        {/* Driver and Vehicle Modal */}
        {isDriverVehicleModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            
            <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Driver and Vehicle Details</h2>
              <form onSubmit={handleDriverFormSubmit}>
                <input
                  type="text"
                  name="driverFirstName"
                  placeholder="First Name"
                  value={driverFormData.driverFirstName}
                  onChange={handleDriverFormChange}
                  required
                  className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-green-500 mb-4"
                />

                <input
                  type="text"
                  name="driverLastName"
                  placeholder="Last Name"
                  value={driverFormData.driverLastName}
                  onChange={handleDriverFormChange}
                  required
                  className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-green-500 mb-4"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={driverFormData.email}
                  onChange={handleDriverFormChange}
                  required
                  className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-green-500 mb-4"
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={driverFormData.password}
                  onChange={handleDriverFormChange}
                  required
                  className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-green-500 mb-4"
                />

                <textarea
                  name="address"
                  placeholder="Address"
                  value={driverFormData.address}
                  onChange={handleDriverFormChange}
                  className="p-3 border border-gray-300 rounded-md w-full h-24 focus:ring-2 focus:ring-green-500 mb-4"
                  required
                />

                <div className="flex space-x-4 mb-4">
                  <select
                    name="location"
                    value={driverFormData.location}
                    onChange={handleDriverFormChange}
                    className="p-3 border border-gray-300 rounded-md w-1/2 focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select District</option>
                    {districts.map((district) => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>

                  <input
                    type="text"
                    name="contactNumber"
                    placeholder="Contact Number"
                    value={driverFormData.contactNumber}
                    onChange={handleDriverFormChange}
                    required
                    className="p-3 border border-gray-300 rounded-md w-1/2 focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
               <select
                name="vehicleType"
                value={driverFormData.vehicleType}
                onChange={handleDriverFormChange}
                required
                className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-green-500 mb-4"
               >
                <option value="">Select Vehicle Type</option>
                {vehicleTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
                ))}
                </select>

                <input
                  type="text"
                  name="vehicleNumber"
                  placeholder="Vehicle Number"
                  value={driverFormData.vehicleNumber}
                  onChange={handleDriverFormChange}
                  required
                  className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-green-500 mb-4"
                />

                <div className="col-span-2 flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsDriverVehicleModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TransportManagement;
