import React, { use, useState } from 'react';
import BidsTypeTab from '../BidsTypeTab/BidsTypeTab';
import BidsCard from '../BidsCard/BidsCard';

function BindsList() {
  const [selectedBidsType, setSelectedBidsType] = useState("All Bids");

  const BidsType = ["All Bids", "Active Bids", "Expired Bids", "Saved Bids"];


  const BidsLists = [
    {
      imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1374&auto=format&fit=crop",
      farmer: {
        name: "Sunil Perera",
        location: "Anuradhapura"
      },
      crop: {
        name: "Nadu Rice",
        quantity: "500",
        price: 120,
        description: "High-quality Nadu rice harvested this season. Well-dried and ready for bulk orders. Ideal for wholesalers, retailers, and direct consumers looking for premium Sri Lankan rice."
      },
      status: "Saved Bids"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1605697826744-6f04f7f94ca3?q=80&w=1374&auto=format&fit=crop",
      farmer: {
        name: "Kamal Silva",
        location: "Jaffna"
      },
      crop: {
        name: "Red Onions",
        quantity: "200",
        price: 80,
        description: "Fresh red onions from Jaffna, known for their rich flavor and long shelf life. Suitable for bulk buyers, hotels, and supermarkets seeking the best local produce."
      },
      status: "Expired Bids"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1514970732014-ca329502ef29?q=80&w=1374&auto=format&fit=crop",
      farmer: {
        name: "Rohana Jayasuriya",
        location: "Kandy"
      },
      crop: {
        name: "Cinnamon Sticks",
        quantity: "100",
        price: 250,
        description: "Organically grown and carefully processed cinnamon sticks from Kandy. Sun-dried to retain natural oils and aroma, perfect for export, spice traders, and local markets."
      },
      status: "Active Bids"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1572441712293-e2cd31870d8c?q=80&w=1374&auto=format&fit=crop",
      farmer: {
        name: "Priyantha Kumara",
        location: "Nuwara Eliya"
      },
      crop: {
        name: "Carrots",
        quantity: "300",
        price: 55,
        description: "Bright orange, crisp, and freshly harvested carrots from Nuwara Eliya. Ideal for supermarkets, restaurants, and vegetable suppliers looking for high-quality produce."
      },
      status: "Expired Bids"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1604882735677-389d1aa2f603?q=80&w=1374&auto=format&fit=crop",
      farmer: {
        name: "Nimal Fernando",
        location: "Matale"
      },
      crop: {
        name: "Black Pepper",
        quantity: "150",
        price: 180,
        description: "Export-quality black pepper from Matale, renowned for its strong aroma and rich flavor. Sun-dried and ready for spice markets, wholesalers, and direct customers."
      },
      status: "Expired Bids"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1569202226109-bd923cc34e18?q=80&w=1374&auto=format&fit=crop",
      farmer: {
        name: "Amal Wickramasinghe",
        location: "Badulla"
      },
      crop: {
        name: "Tea Leaves",
        quantity: "400",
        price: 90,
        description: "Premium-grade tea leaves from the highlands of Badulla. Hand-picked and carefully processed to maintain the best flavor, ideal for tea manufacturers and direct buyers."
      },
      status: "Expired Bids"
    }
  ];

  const handleTypeClick = (BidsType) => {
    setSelectedBidsType(BidsType);
  }

  const filterBidsType = selectedBidsType === "All Bids" ?
    BidsLists : BidsLists.filter((BidsList) => {
      return BidsList.status.toLowerCase().includes(selectedBidsType.toLowerCase());
    });

  return (
    <div className='mt-10 mx-auto mb-40 pr-4'>
      <h1 className='text-2xl font-bold'>Checkout Other Farmers' Bids</h1>

      <div className='flex flex-wrap items-center gap-5 font-light mt-2 border-b-2 border-gray-200 pb-1'>
        {
          BidsType.map((bids, index) => {
            return (
              <BidsTypeTab
                key={index}
                bids={bids}
                selectedBidsType={selectedBidsType}
                onClick={handleTypeClick}
              />
            );
          })
        }
      </div>

      {/* Bids Card Container with Fixed Height */}
      <div className='mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-auto min-h-[500px] '>
        {
          filterBidsType.map((bids, index) => {
            return <BidsCard key={index} bids={bids} />;
          })
        }
      </div>
    </div>
  );
}

export default BindsList;
