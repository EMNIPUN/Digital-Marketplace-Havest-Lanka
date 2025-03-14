import React, { useState, useEffect } from 'react';
import { 
  Loader, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Wheat, 
  IndianRupee,
  Calendar,
  Package
} from 'lucide-react';
import Navigation from '@/components/farmerManagement/Navigation/Navigation';
import MyBidsCard from '@/components/farmerManagement/MyBidsCard/MyBidsCard';

function MyBids() {

  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching bids
    const sampleBids = [
      {
        id: 1,
        cropName: 'Rice',
        description: 'High-quality Nadu rice harvested this season. Well-dried and ready for bulk orders. Ideal for wholesalers, retailers, and direct consumers looking for premium Sri Lankan rice.',
        price : '120',
        quantity: '1000 kg',
        location: 'Anuradhapura',
      },
      {
        id: 2,
        cropName: 'Wheat',
        description: 'High-quality Nadu rice harvested this season. Well-dried and ready for bulk orders. Ideal for wholesalers, retailers, and direct consumers looking for premium Sri Lankan rice.',
        price : '120',
        quantity: '1000 kg',
        location: 'Anuradhapura',
      }
    ];
    
    // Simulate API call
    setTimeout(() => {
      setBids(sampleBids);
      setLoading(false);
    }, 1000);
  }, []);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <>
        <Navigation />
        <div className="p-6">
          <h1 className="text-2xl font-light mb-6 text-gray-800 flex items-center gap-2 justify-center">
              My Posted Bids
          </h1>

          <section>
              <h1>Onging Bids</h1>
              {bids.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                    {
                      bids.map((bid, index) => {
                        return <MyBidsCard key={index} bid={bid} />
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

export default MyBids;