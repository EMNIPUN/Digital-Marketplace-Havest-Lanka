// src/pages/TransportRequest.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const TransportRequest = () => {
   const [transportRequests, setTransportRequest] = useState([]);
   const [vehicles, setVehicles] = useState([]);
   const [selectedDrivers, setSelectedDrivers] = useState({});
   const [loading, setLoading] = useState(true);
   const [successMessage, setSuccessMessage] = useState("");

   // get transport details
   const getTransportDetails = async () => {
      try {
         setLoading(true);
         const response = await axios.get(
            "http://localhost:8005/api/transport"
         );
         setTransportRequest(response.data);
         setLoading(false);
      } catch (error) {
         console.log(error);
         setLoading(false);
      }
   };

   useEffect(() => {
      getTransportDetails();
   }, []);

   // get vehicle data
   const getAllData = async () => {
      try {
         const response = await axios.get(
            "http://localhost:8005/api/vehicle/getallvehicles"
         );
         setVehicles(response.data);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      getAllData();
   }, []);

   // update REQUEST data
   const assignDriver = async (vehicleId, reqId) => {
      try {
         const selectedVehicle = vehicles.find((v) => v._id === vehicleId);
         if (!selectedVehicle) {
            console.error("Vehicle not found");
            return;
         }

         const updatedData = {
            driverName: `${selectedVehicle.driverFirstName} ${selectedVehicle.driverLastName}`,
            contactNumberDriver: selectedVehicle.contactNumber,
            vehicaleNo: selectedVehicle.vehicleNumber,
         };

         await axios.put(
            `http://localhost:8005/api/transport/update/${reqId}`,
            updatedData
         );

         setSuccessMessage("Driver assigned successfully!");
         setTimeout(() => setSuccessMessage(""), 3000);
         getTransportDetails(); // refresh the data after update
      } catch (error) {
         console.log(error);
      }
   };

   // Format date for better display
   const formatDate = (dateString) => {
      const options = {
         year: "numeric",
         month: "long",
         day: "numeric",
         hour: "2-digit",
         minute: "2-digit",
      };
      return new Date(dateString).toLocaleDateString(undefined, options);
   };

   // Get status badge styling
   const getStatusBadge = (status) => {
      switch (status.toLowerCase()) {
         case "pending":
            return "bg-yellow-100 text-yellow-800";
         case "completed":
            return "bg-green-100 text-green-800";
         case "cancelled":
            return "bg-red-100 text-red-800";
         default:
            return "bg-gray-100 text-gray-800";
      }
   };

   return (
      <div className="bg-gray-50 min-h-screen">
         <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <header className="mb-8">
               <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-gray-900">
                     Transport Request Management
                  </h1>
                  <span className="text-sm text-gray-500">
                     {transportRequests.length} requests found
                  </span>
               </div>
               <p className="mt-2 text-sm text-gray-600">
                  Manage and assign drivers to transport requests
               </p>
            </header>

            {successMessage && (
               <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4 rounded">
                  <div className="flex">
                     <div className="flex-shrink-0">
                        <svg
                           className="h-5 w-5 text-green-400"
                           fill="currentColor"
                           viewBox="0 0 20 20"
                        >
                           <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                           />
                        </svg>
                     </div>
                     <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">
                           {successMessage}
                        </p>
                     </div>
                  </div>
               </div>
            )}

            {loading ? (
               <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
               </div>
            ) : transportRequests.length === 0 ? (
               <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <p className="text-gray-500">No transport requests found</p>
               </div>
            ) : (
               <div className="space-y-6">
                  {transportRequests.map((request) => (
                     <div
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                        key={request._id}
                     >
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                           <div className="flex items-center justify-between">
                              <h2 className="text-lg font-semibold text-gray-900">
                                 Request #{request._id.substring(0, 8)}
                              </h2>
                              <span
                                 className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                                    request.status
                                 )}`}
                              >
                                 {request.status}
                              </span>
                           </div>
                        </div>

                        <div className="px-6 py-6 flex flex-col lg:flex-row gap-8">
                           <div className="lg:w-1/2">
                              <h3 className="text-lg font-medium text-gray-900 mb-4">
                                 Request Details
                              </h3>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                                 <div>
                                    <p className="text-sm font-medium text-gray-500">
                                       Farmer ID
                                    </p>
                                    <p className="mt-1 text-gray-900">
                                       {request.farmerId}
                                    </p>
                                 </div>
                                 <div>
                                    <p className="text-sm font-medium text-gray-500">
                                       Contact Number
                                    </p>
                                    <p className="mt-1 text-gray-900">
                                       {request.contactNumber}
                                    </p>
                                 </div>
                                 <div className="sm:col-span-2">
                                    <p className="text-sm font-medium text-gray-500">
                                       Pickup Location
                                    </p>
                                    <p className="mt-1 text-gray-900">
                                       {request.pickupLocation}
                                    </p>
                                 </div>
                                 <div className="sm:col-span-2">
                                    <p className="text-sm font-medium text-gray-500">
                                       Delivery Location
                                    </p>
                                    <p className="mt-1 text-gray-900">
                                       {request.deliveryLocation}
                                    </p>
                                 </div>
                                 <div>
                                    <p className="text-sm font-medium text-gray-500">
                                       Cargo Type
                                    </p>
                                    <p className="mt-1 text-gray-900">
                                       {request.cargoType}
                                    </p>
                                 </div>
                                 <div>
                                    <p className="text-sm font-medium text-gray-500">
                                       Cargo Weight
                                    </p>
                                    <p className="mt-1 text-gray-900">
                                       {request.cargoWeight} kg
                                    </p>
                                 </div>
                                 <div className="sm:col-span-2">
                                    <p className="text-sm font-medium text-gray-500">
                                       Pickup Date
                                    </p>
                                    <p className="mt-1 text-gray-900">
                                       {formatDate(request.pickupDate)}
                                    </p>
                                 </div>
                                 <div className="sm:col-span-2">
                                    <p className="text-sm font-medium text-gray-500">
                                       Special Instructions
                                    </p>
                                    <p className="mt-1 text-gray-900 whitespace-pre-wrap">
                                       {request.specialInstructions ||
                                          "None provided"}
                                    </p>
                                 </div>
                              </div>

                              {request.driverName && (
                                 <div className="mt-6 pt-6 border-t border-gray-200">
                                    <h4 className="text-lg font-medium text-gray-900 mb-4">
                                       Assigned Transport
                                    </h4>
                                    <div className="bg-blue-50 p-4 rounded-md">
                                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                                          <div>
                                             <p className="text-sm font-medium text-gray-500">
                                                Driver Name
                                             </p>
                                             <p className="mt-1 font-medium text-gray-900">
                                                {request.driverName}
                                             </p>
                                          </div>
                                          <div>
                                             <p className="text-sm font-medium text-gray-500">
                                                Driver Contact
                                             </p>
                                             <p className="mt-1 font-medium text-gray-900">
                                                {request.contactNumberDriver}
                                             </p>
                                          </div>
                                          <div>
                                             <p className="text-sm font-medium text-gray-500">
                                                Vehicle Number
                                             </p>
                                             <p className="mt-1 font-medium text-gray-900">
                                                {request.vehicaleNo}
                                             </p>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              )}
                           </div>

                           <div className="lg:w-1/2 lg:border-l lg:border-gray-200 lg:pl-8">
                              <form
                                 className="bg-gray-50 p-6 rounded-lg h-full"
                                 onSubmit={(e) => {
                                    e.preventDefault();
                                    assignDriver(
                                       selectedDrivers[request._id],
                                       request._id
                                    );
                                 }}
                              >
                                 <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Assign Driver
                                 </h3>

                                 {request.driverName ? (
                                    <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                                       <div className="flex">
                                          <div className="flex-shrink-0">
                                             <svg
                                                className="h-5 w-5 text-yellow-400"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                             >
                                                <path
                                                   fillRule="evenodd"
                                                   d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                                   clipRule="evenodd"
                                                />
                                             </svg>
                                          </div>
                                          <div className="ml-3">
                                             <p className="text-sm text-yellow-700">
                                                A driver is already assigned.
                                                Reassigning will override
                                                current assignment.
                                             </p>
                                          </div>
                                       </div>
                                    </div>
                                 ) : null}

                                 <div className="mb-6">
                                    <label
                                       htmlFor={`driver-${request._id}`}
                                       className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                       Select Driver & Vehicle
                                    </label>
                                    <select
                                       id={`driver-${request._id}`}
                                       required
                                       value={
                                          selectedDrivers[request._id] || ""
                                       }
                                       onChange={(e) =>
                                          setSelectedDrivers({
                                             ...selectedDrivers,
                                             [request._id]: e.target.value,
                                          })
                                       }
                                       className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    >
                                       <option value="">
                                          -- Select a driver --
                                       </option>
                                       {vehicles.map((item) => (
                                          <option
                                             key={item._id}
                                             value={item._id}
                                          >
                                             {item.driverFirstName}{" "}
                                             {item.driverLastName} •{" "}
                                             {item.vehicleType} •{" "}
                                             {item.vehicleNumber}
                                          </option>
                                       ))}
                                    </select>
                                 </div>

                                 {selectedDrivers[request._id] && (
                                    <div className="mb-6">
                                       <p className="text-sm font-medium text-gray-700 mb-2">
                                          Selected Vehicle Details
                                       </p>
                                       {(() => {
                                          const selected = vehicles.find(
                                             (v) =>
                                                v._id ===
                                                selectedDrivers[request._id]
                                          );
                                          return selected ? (
                                             <div className="bg-white p-4 rounded border border-gray-200">
                                                <p>
                                                   <span className="font-medium">
                                                      Driver:
                                                   </span>{" "}
                                                   {selected.driverFirstName}{" "}
                                                   {selected.driverLastName}
                                                </p>
                                                <p>
                                                   <span className="font-medium">
                                                      Vehicle:
                                                   </span>{" "}
                                                   {selected.vehicleType}
                                                </p>
                                                <p>
                                                   <span className="font-medium">
                                                      Number:
                                                   </span>{" "}
                                                   {selected.vehicleNumber}
                                                </p>
                                                <p>
                                                   <span className="font-medium">
                                                      Contact:
                                                   </span>{" "}
                                                   {selected.contactNumber}
                                                </p>
                                             </div>
                                          ) : null;
                                       })()}
                                    </div>
                                 )}

                                 <button
                                    type="submit"
                                    disabled={!selectedDrivers[request._id]}
                                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                                       ${
                                          selectedDrivers[request._id]
                                             ? "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                             : "bg-blue-300 cursor-not-allowed"
                                       }`}
                                 >
                                    {request.driverName
                                       ? "Reassign Driver"
                                       : "Assign Driver"}
                                 </button>
                              </form>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>
   );
};

export default TransportRequest;
