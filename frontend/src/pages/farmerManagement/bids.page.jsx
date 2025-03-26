import React, { useState, useEffect } from 'react';
import { Loader, AlertCircle, Search,LoaderCircle } from 'lucide-react';
import Navigation from '@/components/farmerManagement/Navigation/Navigation';
import MyBidsCard from '@/components/farmerManagement/MyBidsCard/MyBidsCard';
import axios from 'axios';
import Token from '@/components/userManagement/logins/Token';
import BidsTypeTab from '@/components/farmerManagement/BidsTypeTab/BidsTypeTab';
import VegetablePriceMarqueeWithStyles from '@/components/farmerManagement/VegetablePriceMarquee/VegetablePriceMarquee';
import FooterLandingPage from '@/components/other/FooterLandingPage';

function Bids() {
  const token = Token();
  const [selectedBidsType, setSelectedBidsType] = useState("All Bids");
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [shopOwnerBidDetails, setShopOwnerBidDetails] = useState([]);
  const [bidPlacementDetails, setBidPlacementDetails] = useState([]);

  const BidsType = ["All Bids", "Active", "Payment Pending", "payment Approved", "Completed"];
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
      <div className='h-[300px] w-full relative'
            style={{
              backgroundImage: 'url("https://img.freepik.com/free-photo/fresh-vegetables-fruits-healthy-eating-organic-variety-generated-by-artificial-intelligence_25030-60646.jpg?t=st=1741985890~exp=1741989490~hmac=e8bd564f5c073ddf5a113825913066c64b78852c5289ca9659e3f055c961b502&w=1380")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
          <div className='absolute top-[200px] left-[600px] bg-black/70 rounded-full px-8 py-1'>
            <h1 className=" text-xl font-bold text-gray-100 text-center">
                My Posted Bids
            </h1>
            <p className='text-gray-100'>Manage your posted bids here</p>
          </div>
        </div>
      <div>
        <VegetablePriceMarqueeWithStyles />
      </div>
      <div>
        <LoaderCircle  className="h-15 w-15 text-gray-400 animate-spin" />
      </div>

      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className='h-[300px] w-full relative'
            style={{
              backgroundImage: 'url("https://img.freepik.com/free-photo/fresh-vegetables-fruits-healthy-eating-organic-variety-generated-by-artificial-intelligence_25030-60646.jpg?t=st=1741985890~exp=1741989490~hmac=e8bd564f5c073ddf5a113825913066c64b78852c5289ca9659e3f055c961b502&w=1380")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
          <div className='absolute top-[200px] left-[600px] bg-black/70 rounded-full px-8 py-1'>
            <h1 className=" text-xl font-bold text-gray-100 text-center">
                My Posted Bids
            </h1>
            <p className='text-gray-100'>Manage your posted bids here</p>
          </div>
        </div>
      <div>
        <VegetablePriceMarqueeWithStyles />
        <div className="border-b border-gray-200 px-4 mt-8 flex justify-between items-center">
          <div className="flex flex-wrap gap-4">
            {BidsType.map((type, index) => (
              <BidsTypeTab key={index} bids={type} selectedBidsType={selectedBidsType} onClick={handleTypeClick} />
            ))}
          </div>
          <div className='flex items-center gap-2 border-b border-gray-300 py-2'>
            <input
              type="text"
              placeholder="Search bids..."
              className="w-[400px] pl-3 pr-4 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="text-gray-400 w-5 h-5" />
          </div>
        </div>

        <section className='mt-8 p-6'>
          {filteredBids.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredBids.map((bid, index) => (
                <MyBidsCard key={index} bid={bid} bidId={bid._id}/>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Bids Found</h3>
              <p className="text-gray-500">Try a different search term.</p>
            </div>
          )}
        </section>
      </div>
      <div className='mt-32'>
        <FooterLandingPage />
      </div>
    </>
  );
}

export default Bids;
