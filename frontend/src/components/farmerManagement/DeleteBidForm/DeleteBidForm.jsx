import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function DeleteBidForm({bidDetails}) {

    const navigate = useNavigate();

    console.log(bidDetails._id)
    console.log(bidDetails.cropsName)

  const handleDelete = async () => {
    try{
        await axios
            .delete("http://localhost:8005/api/BidPost/"+bidDetails._id);
            console.log("Delete Successfull");
            navigate('/farmer/mybids');
    }catch(error){
        console.error("Bid Not Deleted")
    }
  }

  const handleCancel = () => {
    // Add your cancel logic here
    console.log('Delete cancelled')
  }

  return (
    <div className="delete-bid-form p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Delete Bid</h2>
      <p className="text-gray-600 mb-6 text-center">
        Are you sure you want to delete this bid?
      </p>
      <div className="flex justify-center space-x-4">
        <button 
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
        <button 
          onClick={handleCancel}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default DeleteBidForm