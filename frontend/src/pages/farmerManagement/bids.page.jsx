import React, { useState, useEffect } from 'react';
import { 
  Loader, 
  AlertCircle, 
} from 'lucide-react';
import Navigation from '@/components/farmerManagement/Navigation/Navigation';
import MyBidsCard from '@/components/farmerManagement/MyBidsCard/MyBidsCard';
import axios from 'axios';
import Token from '@/components/userManagement/logins/Token';

function Bids() {


  const token = Token();

  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  // console.log(token);
  const farmerId = token.userId;
  // console.log(farmerId);

  useEffect(() => {

    axios
      .get("http://localhost:8005/api/BidPost/ownbids/"+farmerId)
      .then((response) => {
        console.log(response.data);
        setBids(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setTimeout(() => {
      setLoading(false);
    }, 1000);
    
  }, []);


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

        <div className="flex space-x-2 justify-center items-start mt-20 bg-white h-screen">
          <span className="sr-only">Loading...</span>
          <div className="h-3 w-3 bg-black/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-3 w-3 bg-black/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-3 w-3 bg-black/60 rounded-full animate-bounce"></div>
        </div>

      </>
    );
  }

  return (
    <>
        <Navigation />
        <div className="">

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

          <section className='mt-8 p-6'>
              {bids.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                    {
                      bids.map((bid, index) => {
                        return (<MyBidsCard key={index} bid={bid} />)
                      })
                    }
                  </div>
              ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Bids Found</h3>
                  <p className="text-gray-500">Start posting your bids to see them here.</p>
                  </div>
              )}
          </section>
        </div>
    </>
  );
}

export default Bids;