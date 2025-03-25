import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Pencil, Trash2,X, CheckCircle } from 'lucide-react';

import axios from 'axios'
import TimeCountDown from '@/components/farmerManagement/TimeCountDown/TimeCountDown';
import EditBidPost from '@/components/farmerManagement/EditBidPost/EditBidPost';
import BidPlacementCard from '@/components/farmerManagement/BidPlacementCard/BidPlacementCard';

function Bid({}) {

  const [isVisibale, setIsVisible] = useState(false);
  const [bidplacementDetails, setBidPlacementDetails] = useState([]);
  const [shopOwnerDetails, setShopOwnerDetails] = useState([]);

  const { id } = useParams();
  console.log(id);

  const [bidDetails, setBidDetails] = useState({});

  const getBidDetails = async () => {
    try {
      const response = await axios.get('http://localhost:8005/api/BidPost/'+id);
      console.log(response.data)
      setBidDetails(response.data)
    } catch (error) {
      console.error("Error fetching bid details")
    }
  }

  const getBidPlacementDetails = async () => {
    try {
      const response = await axios.get('http://localhost:8005/api/bid/getBids/'+id);
      console.log(response.data)
      setBidPlacementDetails(response.data)
    } catch (error) {
      console.error("Error fetching bid placement details")
    }
  }

  // const getShopOwnerDetails = async () => {
  //   try{
  //     const response = await axios.get('http://localhost:8005/api/shopOwner/getShopOwners/67d449c87529dbd1f613d6f4');
  //     console.log(response.data)
  //     setShopOwnerDetails(response.data)
  //   }catch(error){
  //     console.error("Error fetching shop owner details")
  //   }
  // }
  
  useEffect(() => {
    getBidDetails();
    getBidPlacementDetails();
    // getShopOwnerDetails();
  },[]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">

            <div className="md:flex-shrink-0">
              <img
                className="h-96 w-full object-cover md:w-96"
                src="https://images.unsplash.com/photo-1582515073490-39981397c445?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2Fycm90fGVufDB8fDB8fHww"
                alt={bidDetails.cropName}
              />
            </div>
            
            <div className="p-8">
              <div className='flex justify-between items-center'>
                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {bidDetails.cropsName}
                </h2>
                <div className='flex gap-3'>
                    <button onClick={()=>setIsVisible(!isVisibale)}><Pencil size={20} className="text-green-600" /></button>
                    <button><Trash2 size={20} className="text-red-500" /></button>
                </div>
              </div>
              <div className="mt-4 space-y-4">
                <p className="text-gray-600">{bidDetails.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-500">Base Price:</span>
                    <span className="ml-2 font-semibold">{bidDetails.price}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Quantity:</span>
                    <span className="ml-2 font-semibold">{bidDetails.quantity}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">End Date:</span>
                    <span className="ml-2 font-semibold">{bidDetails.bidEndTime}</span>
                  </div>
                </div>
                <div>
                  <TimeCountDown bidTime={bidDetails.bidEndTime} />
                </div>

              </div>
            </div>
          </div>
        </div>

        {isVisibale && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden animate-fade-in">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-semibold text-gray-800">Create New Post</h2>
                <button 
                  onClick={() => setIsVisible(!isVisibale)} 
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-6">
                <EditBidPost bidDetails={bidDetails} onUpdate={getBidDetails()}  />
              </div>
            </div>
          </div>
        )}
        

        <div className="mt-8">

          { bidDetails.status === "Active" ? (
            <>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Bids</h3>
              {bidplacementDetails.map((bidplacementDetail, index) => (
                <BidPlacementCard key={index} bidplacementDetails={bidplacementDetail} shopOwnerDetails={shopOwnerDetails} />
              ))}
            </>
          ) : (
            <div className="flex justify-center items-center p-4">
              <div className="bg-white shadow-2xl rounded-xl p-8 text-center w-full border border-gray-200">
                <div className="flex justify-center items-center mb-6">
                  <CheckCircle className="text-green-600 w-12 h-12 mr-4" strokeWidth={2} />
                  <h2 className="text-2xl font-bold text-gray-900">Bid Accepted Successfully</h2>
                </div>
                <p className="text-gray-600 mb-8 text-base leading-relaxed">
                  Congratulations! Your bid has been successfully accepted. You can now proceed with the next steps of the process.
                </p>
                <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-base font-semibold rounded-lg shadow-md transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  Continue to Next Step
                </button>
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  )
}

export default Bid;
