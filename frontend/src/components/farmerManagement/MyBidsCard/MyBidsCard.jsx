import React, { useState } from 'react';
import { X, CheckCircle, Wheat, Leaf, Truck, FileText, Clock, AlertCircle } from 'lucide-react';
import HandleBitPlacement from '../HandleBitPlacement/HandleBitPlacement';
import EditBidPost from '../EditBidPost/EditBidPost';
import { Link } from 'react-router-dom';
import TimeCountDown from '../TimeCountDown/TimeCountDown';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const MyBidsCard = ({ bid, bidId }) => {
  console.log(bidId);

  const [showDetails, setShowDetails] = useState(false);
  const [bidPlacementDetails, setBidPlacementDetails] = useState([]);

  // const getBidPlacementDetails = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8005/api/bid/getBids/'+id);
  //     console.log(response.data)
  //     setBidPlacementDetails(response.data)
  //   } catch (error) {
  //     console.error("Error fetching bid placement details")
  //   }
  // }

  const generateInvoice = () => {
    const doc = new jsPDF();

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text("Bid Invoice - Harvest Lanaka", 70, 20);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text("This document serves as the official bid invoice for the crops placed by the seller in the bidding platform.,", 20, 40);
    doc.text("It contains the details of the crops being offered the quantity, pricing, and total cost of the bid.", 20, 45);
  
    doc.setFont('helvetica', 'bold');
    doc.text("Seller: John Doe (Seller Company)", 20, 56);
    doc.text("Seller Address: 123 Market Street, Colombo, Sri Lanka", 20, 61); 

    doc.setFontSize;
  
    autoTable(doc, {
      startY: 74,
      head: [['Field', 'Details']],
      body: [
        ['Crops Name', bid.cropsName],
        ['Quantity', `${bid.quantity} kg`],
        ['Price per kg', `Rs. ${bid.price}.00`],
      ],
    });
  
    doc.save(`Invoice_${bid._id}.pdf`);
  };

  const getStatusConfig = (status) => {
    switch(status) {
      case "Active":
        return { 
          bgColor: "bg-green-100", 
          textColor: "text-green-700", 
          borderColor: "border-green-200", 
          dotColor: "bg-green-600",
          icon: <Clock size={16} className="mr-2 text-green-600" />
        };
      case "Payment Pending":
        return { 
          bgColor: "bg-yellow-100", 
          textColor: "text-yellow-700", 
          borderColor: "border-yellow-200", 
          dotColor: "bg-yellow-500",
          icon: <AlertCircle size={16} className="mr-2 text-yellow-600" />
        };
      case "Payment Failed":
        return { 
          bgColor: "bg-red-100", 
          textColor: "text-red-700", 
          borderColor: "border-red-200", 
          dotColor: "bg-red-600",
          icon: <X size={16} className="mr-2 text-red-600" />
        };
      default:
        return { 
          bgColor: "bg-green-100", 
          textColor: "text-green-700", 
          borderColor: "border-green-200",
          dotColor: "bg-green-600",
          icon: <CheckCircle size={16} className="mr-2 text-green-600" />
        };
    }
  };

  const statusConfig = getStatusConfig(bid.status);


  if (bid.status === "Payment Pending") {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 w-full max-w-3xl">
        <div className="flex justify-between mb-2">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-green-100">
              <CheckCircle className="text-green-600 w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Bid Accepted Successfully</h2>
          </div>
          <div className="flex items-center gap-2">
            <Link to={'/farmer/mybids/'+bid._id}>
              <button 
                className="text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-100 transition-colors px-4 py-1.5 rounded-lg font-medium text-sm flex items-center"
                onClick={() => setShowDetails(!showDetails)}
              > 
                View Details
              </button>
            </Link>
          </div>
        </div>

        <p className="text-gray-600 mb-5 text-center">
          Congratulations! Your bid has been accepted. Here are the details:
        </p>
        
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg text-left flex-1 border border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Bid Details</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-700 flex justify-between"><span>Crops Name:</span> <span className="font-medium">{bid.cropsName}</span></p>
              <p className="text-sm text-gray-700 flex justify-between"><span>Quantity:</span> <span className="font-medium">{bid.quantity} kg</span></p>
              <p className="text-sm text-gray-700 flex justify-between"><span>Price per kg:</span> <span className="font-medium">Rs.{bid.price}.00</span></p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg text-left flex-1 border border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Delivery Information</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-700 flex justify-between"><span>Estimated Delivery:</span> <span className="font-medium">Within 3-5 days</span></p>
              <p className="text-sm text-gray-700 flex justify-between"><span>Total Amount:</span> <span className="font-medium">Rs.{bid.price * bid.quantity}.00</span></p>
              <p className="text-sm text-gray-700 flex justify-between"><span>Status:</span> <span className="font-medium text-yellow-600">Payment Pending</span></p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button disabled className="flex items-center justify-center px-4 py-2.5 bg-gray-100 text-gray-500 text-sm 
                font-medium rounded-lg cursor-not-allowed opacity-70 border border-gray-200 shadow-sm"
          >
            <Truck className="mr-2" size={16} />
            Request Transport
          </button>
            
          <button 
            className="flex items-center justify-center px-4 py-2.5 bg-blue-50 text-blue-600 text-sm font-medium 
              rounded-lg hover:bg-blue-100 transition-colors duration-200 border border-blue-200 
              shadow-sm"
            onClick={generateInvoice}
          >
            <FileText className="mr-2" size={16} />
            Generate Invoice
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="p-6">
        {/* Header with status and actions */}
        <div className="flex items-center justify-between mb-5">
          <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 ${statusConfig.bgColor} ${statusConfig.textColor} text-sm font-medium shadow-sm`}>
            <div className="relative flex items-center">
              {statusConfig.icon}
              <div className={`w-2 h-2 rounded-full ${statusConfig.dotColor}`}></div>
              <div className={`w-2 h-2 rounded-full absolute top-0 left-0 animate-ping ${statusConfig.dotColor} opacity-75`}></div>
            </div>   
            <h2 className="font-semibold">{bid.status}</h2>        
          </div>
          <div className="flex items-center gap-2">
            <Link to={'/farmer/mybids/'+bid._id}>
              <button 
                className="text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-100 transition-colors px-4 py-1.5 rounded-lg font-medium text-sm flex items-center"
                onClick={() => setShowDetails(!showDetails)}
              > 
                View Details
              </button>
            </Link>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex justify-between items-start gap-6">
          <div className="flex-1">
            <div className="bg-white">
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-lg bg-green-50 mr-3">
                  <Wheat className="text-green-600" size={20} />
                </div>
                <h1 className="text-xl font-semibold text-gray-800">{bid.cropsName}</h1>
              </div>
              <div className="flex items-start mb-4">
                <Leaf className="mr-3 mt-1 text-green-500 flex-shrink-0" size={16} />
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {bid.description}
                </p>
              </div>
            </div>
            
            {/* Key metrics */}
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <span className="text-xs uppercase tracking-wider text-gray-500 block mb-1 font-medium">Starting Price</span>
                <span className="text-lg font-bold text-gray-800">Rs. {bid.price}.00</span>
                <span className="text-xs text-gray-500 block mt-1">per kilogram</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <span className="text-xs uppercase tracking-wider text-gray-500 block mb-1 font-medium">Quantity</span>
                <span className="text-lg font-bold text-gray-800">{bid.quantity} Kg</span>
                <span className="text-xs text-gray-500 block mt-1">total available</span>
              </div>
            </div>
          </div>
          
          {/* Countdown timer */}
          <div className="bg-green-50 rounded-xl p-4 border border-green-100 shadow-sm">
            <TimeCountDown bidTime={bid.bidEndTime} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBidsCard;