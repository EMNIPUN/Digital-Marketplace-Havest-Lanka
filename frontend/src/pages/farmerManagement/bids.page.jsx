import React, { useState, useEffect } from 'react';
import { Loader, AlertCircle, Search, LoaderCircle, Filter } from 'lucide-react';
import Navigation from '@/components/farmerManagement/Navigation/Navigation';
import MyBidsCard from '@/components/farmerManagement/MyBidsCard/MyBidsCard';
import axios from 'axios';
import Token from '@/components/userManagement/logins/Token';
import BidsTypeTab from '@/components/farmerManagement/BidsTypeTab/BidsTypeTab';
import VegetablePriceMarqueeWithStyles from '@/components/farmerManagement/VegetablePriceMarquee/VegetablePriceMarquee';
import FooterLandingPage from '@/components/other/FooterLandingPage';
import { ToastContainer } from 'react-toastify';

function Bids() {
  const token = Token();
  const [selectedBidsType, setSelectedBidsType] = useState("All Bids");
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [shopOwnerBidDetails, setShopOwnerBidDetails] = useState([]);
  const [bidPlacementDetails, setBidPlacementDetails] = useState([]);

  const BidsType = ["All Bids", "Active", "Payment Pending", "payment Approved", "Transport Completed"];
  const farmerId = token.userId;

  const handleTypeClick = (BidsType) => {
    setSelectedBidsType(BidsType);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8005/api/bid/getBids/${farmerId}`)
      .then((response) => {
        setShopOwnerBidDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8005/api/BidPost/ownbids/${farmerId}`)
      .then((response) => {
        setBids(response.data);
        getAllBidPlacemenDetails();
      })
      .catch((error) => {
        console.error(error);
      });

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);


  const filteredBids = bids.filter((bid) => {
    return (
      (selectedBidsType === "All Bids" || bid.status.toLowerCase().includes(selectedBidsType.toLowerCase())) &&
      (bid.cropsName.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="h-[300px] w-full relative bg-gradient-to-r from-green-900 to-green-700 overflow-hidden">
          <img 
            src="https://img.freepik.com/free-photo/fresh-vegetables-fruits-healthy-eating-organic-variety-generated-by-artificial-intelligence_25030-60646.jpg?t=st=1741985890~exp=1741989490~hmac=e8bd564f5c073ddf5a113825913066c64b78852c5289ca9659e3f055c961b502&w=1380" 
            alt="Vegetables and fruits" 
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">My Posted Bids</h1>
            <p className="text-gray-100 text-lg">Manage your posted bids here</p>
          </div>
        </div>
        <div>
          <VegetablePriceMarqueeWithStyles />
        </div>
        <div className="flex flex-col items-center justify-center h-64">
          <LoaderCircle className="h-12 w-12 text-green-600 animate-spin mb-4" />
          <p className="text-gray-600 font-medium">Loading your bids...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="h-[300px] w-full relative bg-gradient-to-r from-green-900 to-green-700 overflow-hidden">
        <img 
          src="https://img.freepik.com/free-photo/fresh-vegetables-fruits-healthy-eating-organic-variety-generated-by-artificial-intelligence_25030-60646.jpg?t=st=1741985890~exp=1741989490~hmac=e8bd564f5c073ddf5a113825913066c64b78852c5289ca9659e3f055c961b502&w=1380" 
          alt="Vegetables and fruits" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">My Posted Bids</h1>
          <p className="text-gray-100 text-lg">Manage your posted bids here</p>
        </div>
      </div>
      
      <div>
        <VegetablePriceMarqueeWithStyles />
        
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center p-4 border-b border-gray-200">
            <div className="overflow-x-auto w-full md:w-auto mb-4 md:mb-0 scrollbar-hide">
              <div className="flex gap-2">
                {BidsType.map((type, index) => (
                  <BidsTypeTab key={index} bids={type} selectedBidsType={selectedBidsType} onClick={handleTypeClick} />
                ))}
              </div>
            </div>
            
            <div className="relative w-full md:w-auto">
              <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 px-3 py-2 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500">
                <Search className="text-gray-400 w-5 h-5 mr-2" />
                <input
                  type="text"
                  placeholder="Search crop names..."
                  className="w-full md:w-80 bg-transparent text-sm focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="sr-only">Clear search</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          <section className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedBidsType === "All Bids" 
                  ? "All Your Bids" 
                  : `${selectedBidsType} Bids`}
              </h2>
              <div className="text-sm text-gray-500">
                {filteredBids.length} {filteredBids.length === 1 ? 'bid' : 'bids'} found
              </div>
            </div>

            {filteredBids.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredBids.map((bid, index) => (
                  <MyBidsCard key={index} bid={bid} bidIdNo={bid._id}/>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Bids Found</h3>
                <p className="text-gray-500 mb-4">No bids match your current filter criteria.</p>
                {selectedBidsType !== "All Bids" && (
                  <button 
                    onClick={() => setSelectedBidsType("All Bids")}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    View All Bids
                  </button>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
      
      <div className="mt-20">
        <FooterLandingPage />
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default Bids;