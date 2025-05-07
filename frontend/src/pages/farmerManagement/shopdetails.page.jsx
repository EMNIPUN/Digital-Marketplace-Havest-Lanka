import Navigation from '@/components/farmerManagement/Navigation/Navigation';
import FooterLandingPage from '@/components/other/FooterLandingPage';
import React, { useState } from 'react';

// Mock data for demonstration
const mockShops = [
  {
    id: 1,
    name: "Fresh Harvest Market",
    image: "https://media.istockphoto.com/id/962517864/photo/supermarket.jpg?s=612x612&w=0&k=20&c=AsbbNMe5ameK50IeedsXhHRVIk1kimWCDu2VJjodRrQ=",
    rating: 4.5,
    location: "Colombo, Sri Lanka",
    phone: "+94 11 234 5678",
    email: "fresh@harvest.com",
    description: "Premium quality organic vegetables and fruits",
    categories: ["Vegetables", "Fruits", "Organic"],
    openingHours: "8:00 AM - 6:00 PM"
  },
  {
    id: 2,
    name: "Green Valley Farms",
    image: "https://media.istockphoto.com/id/867412558/photo/fresh-and-healthy-vegetables-and-colorful-fruit.jpg?s=612x612&w=0&k=20&c=3SutctIHiDWwvgSxxaR1B_1ZS-QSkMMhcjSMBW1rAPE=",
    rating: 4.2,
    location: "Kandy, Sri Lanka",
    phone: "+94 81 234 5678",
    email: "green@valley.com",
    description: "Fresh dairy products and seasonal produce",
    categories: ["Dairy", "Vegetables", "Local Produce"],
    openingHours: "7:00 AM - 7:00 PM"
  },
  {
    id: 3,
    name: "Organic Paradise",
    image: "https://media.istockphoto.com/id/635946862/photo/farmers-market.jpg?s=612x612&w=0&k=20&c=oYC720wxO4EL-gpnL476pubGrIKSu4UMhN0NBzdc0ps=",
    rating: 4.8,
    location: "Galle, Sri Lanka",
    phone: "+94 91 234 5678",
    email: "organic@paradise.com",
    description: "100% organic certified products from local farmers",
    categories: ["Organic", "Vegetables", "Fruits", "Herbs"],
    openingHours: "7:30 AM - 6:30 PM"
  },
  {
    id: 4,
    name: "Spice Garden",
    image: "https://media.istockphoto.com/id/2184092876/photo/vegetable-market.jpg?s=612x612&w=0&k=20&c=B5e_mZGebvMysZhi_2GREyoJwasRorsqwe2AJQkW2fM=",
    rating: 4.6,
    location: "Matale, Sri Lanka",
    phone: "+94 66 234 5678",
    email: "spice@garden.com",
    description: "Authentic Sri Lankan spices and herbs",
    categories: ["Spices", "Herbs", "Organic"],
    openingHours: "8:00 AM - 5:00 PM"
  },
  {
    id: 5,
    name: "Coconut Grove",
    image: "https://media.istockphoto.com/id/2184092867/photo/vegetable-market.jpg?s=612x612&w=0&k=20&c=AdN9SO006h1vucvHOSVaW_ivTVOXjLIXBaZbZ6WY8FU=",
    rating: 4.3,
    location: "Kurunegala, Sri Lanka",
    phone: "+94 37 234 5678",
    email: "coconut@grove.com",
    description: "Fresh coconut products and tropical fruits",
    categories: ["Coconut", "Fruits", "Local Produce"],
    openingHours: "6:00 AM - 4:00 PM"
  },
  {
    id: 6,
    name: "Tea Valley",
    image: "https://media.istockphoto.com/id/1254786761/photo/supermarket-vegetable-pile.jpg?s=612x612&w=0&k=20&c=1929yvkcQXzxRidGvacIGEzIGLg2DJ1ZRAuVWMuHGkY=",
    rating: 4.7,
    location: "Nuwara Eliya, Sri Lanka",
    phone: "+94 52 234 5678",
    email: "tea@valley.com",
    description: "Premium Ceylon tea and related products",
    categories: ["Tea", "Organic", "Herbs"],
    openingHours: "8:30 AM - 5:30 PM"
  },
  {
    id: 7,
    name: "Rice Fields",
    image: "https://media.istockphoto.com/id/1155049652/photo/vegetables.jpg?s=612x612&w=0&k=20&c=E9_pH1cqs62VL9P95VcBvT_VGLwAHWcXb5rjI_SqR9k=",
    rating: 4.4,
    location: "Polonnaruwa, Sri Lanka",
    phone: "+94 27 234 5678",
    email: "rice@fields.com",
    description: "Traditional rice varieties and grains",
    categories: ["Rice", "Grains", "Local Produce"],
    openingHours: "7:00 AM - 6:00 PM"
  },
  {
    id: 8,
    name: "Honey Haven",
    image: "https://media.istockphoto.com/id/463095605/photo/vegetables-and-groceries-in-supermarket.jpg?s=612x612&w=0&k=20&c=RDXBNbfpleeK9PwjDyHpnxMownv6hcLEQP8e2xrO9F0=",
    rating: 4.9,
    location: "Badulla, Sri Lanka",
    phone: "+94 55 234 5678",
    email: "honey@haven.com",
    description: "Pure natural honey and bee products",
    categories: ["Honey", "Organic", "Natural Products"],
    openingHours: "9:00 AM - 5:00 PM"
  },
  {
    id: 9,
    name: "Tropical Fruits",
    image: "https://media.istockphoto.com/id/1147854920/photo/fresh-vegetables-in-supermarket-concept-of-healthy-food-bio-vegetarian-diet.jpg?s=612x612&w=0&k=20&c=all204dQzM78I3x17ALffMoau3VCOQUpzegFJ_7dToo=",
    rating: 4.5,
    location: "Ratnapura, Sri Lanka",
    phone: "+94 45 234 5678",
    email: "tropical@fruits.com",
    description: "Exotic tropical fruits and seasonal produce",
    categories: ["Fruits", "Tropical", "Seasonal"],
    openingHours: "7:00 AM - 7:00 PM"
  }
];

function ShopDetailsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const filteredShops = mockShops
    .filter(shop => 
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`text-lg ${
              index < Math.floor(rating)
                ? 'text-yellow-400'
                : index < rating && index >= Math.floor(rating)
                ? 'text-yellow-400 opacity-50'
                : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <>
        <Navigation/>
        <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Shop Directory</h1>
            <p className="text-gray-600">Discover local farmers and their products</p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
            <input
                type="text"
                placeholder="Search shops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
            <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
            </div>

            <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
            >
            <option value="rating">Sort by Rating</option>
            <option value="name">Sort by Name</option>
            </select>
        </div>

        {/* Shop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShops.map((shop) => (
            <div 
                key={shop.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
                <div className="relative h-48">
                <img
                    src={shop.image}
                    alt={shop.name}
                    className="w-full h-full object-cover"
                />
                </div>
                
                <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-semibold text-gray-800">{shop.name}</h2>
                    {renderStars(shop.rating)}
                </div>

                <p className="text-gray-600 mb-4">{shop.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {shop.categories.map((category) => (
                    <span
                        key={category}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                        {category}
                    </span>
                    ))}
                </div>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                    <span className="mr-2">📍</span>
                    <span>{shop.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                    <span className="mr-2">📞</span>
                    <span>{shop.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                    <span className="mr-2">✉️</span>
                    <span>{shop.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                    <span className="mr-2">🕒</span>
                    <span>{shop.openingHours}</span>
                    </div>
                </div>

                <button
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300"
                    onClick={() => {/* Handle view details */}}
                >
                    View Details
                </button>
                </div>
            </div>
            ))}
        </div>
        </div>
        <FooterLandingPage/>
    </>
  );
}

export default ShopDetailsPage;