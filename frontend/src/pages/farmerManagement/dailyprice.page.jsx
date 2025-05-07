import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Navigation from '@/components/farmerManagement/Navigation/Navigation';
import FooterLandingPage from '@/components/other/FooterLandingPage';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function DailyPrice() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price');
  const [selectedCrop, setSelectedCrop] = useState(null);

  // Sample data - replace with your actual data
  const dailyPrices = [
    {
      id: 1,
      crop: "Rice",
      price: "₹35/kg",
      image: "https://media.istockphoto.com/id/1344292091/photo/ripening-ears-of-rice-in-the-field.jpg?s=612x612&w=0&k=20&c=z8CSwhlo3WGgH-yHTJ8SkJ4VRFhQ_7B-fRFC3VyG188=",
      change: "+2.5%",
      trend: "up",
      description: "Premium quality rice with high nutritional value",
      history: [32, 33, 34, 33, 35],
      market: "Local Market",
      lastUpdated: "2024-03-20T10:00:00"
    },
    {
      id: 2,
      crop: "Wheat",
      price: "₹28/kg",
      image: "https://media.istockphoto.com/id/1673457545/photo/farmer-examining-ripe-ear-of-wheat-in-field-before-the-harvest.jpg?s=612x612&w=0&k=20&c=sG-Ro-n-3FmkmbXmWtwpxzYN1kJNMb5x0DbSmzITdVM=",
      change: "-1.2%",
      trend: "down",
      description: "High-quality wheat suitable for all purposes",
      history: [29, 28, 29, 28, 28],
      market: "Regional Market",
      lastUpdated: "2024-03-20T10:00:00"
    },
    {
      id: 3,
      crop: "Corn",
      price: "₹22/kg",
      image: "https://media.istockphoto.com/id/2056049643/photo/corn-plants-on-the-field.jpg?s=612x612&w=0&k=20&c=V5Rc3dys31CLxrEyuqGLhgLncLEI9nBl3HIbhEaMzXk=",
      change: "+0.8%",
      trend: "up",
      description: "Fresh corn with high yield",
      history: [21, 21, 22, 22, 22],
      market: "National Market",
      lastUpdated: "2024-03-20T10:00:00"
    },
    {
      id: 4,
      crop: "Potatoes",
      price: "₹18/kg",
      image: "https://media.istockphoto.com/id/1390936024/photo/the-concept-of-growing-food-fresh-organic-new-potatoes-in-a-farmers-field-a-rich-harvest-of.jpg?s=612x612&w=0&k=20&c=oABJdrnWhMTwPp1Wlunor8Fgb7uNTc-DIwhmflcjlxo=",
      change: "+1.5%",
      trend: "up",
      description: "Fresh organic potatoes, perfect for all cooking needs",
      history: [17, 17, 18, 18, 18],
      market: "Local Market",
      lastUpdated: "2024-03-20T10:00:00"
    },
    {
      id: 5,
      crop: "Tomatoes",
      price: "₹25/kg",
      image: "https://media.istockphoto.com/id/2171026469/photo/hands-harvesting-ripe-tomatoes-from-a-lush-green-plant.jpg?s=612x612&w=0&k=20&c=qpw8HiFK9aubRHPaOZWtGtJQst3GCSCsUhOP5srglXk=",
      change: "-2.0%",
      trend: "down",
      description: "Ripe, juicy tomatoes from local farms",
      history: [27, 26, 25, 25, 25],
      market: "Regional Market",
      lastUpdated: "2024-03-20T10:00:00"
    },
    {
      id: 6,
      crop: "Onions",
      price: "₹20/kg",
      image: "https://media.istockphoto.com/id/171158822/photo/red-onions-background.jpg?s=612x612&w=0&k=20&c=-jkt0464Xku9H0_eSrcz6RJc8TqeQwUFNI2AF9oFGL8=",
      change: "+0.5%",
      trend: "up",
      description: "Fresh red onions with long shelf life",
      history: [19, 19, 20, 20, 20],
      market: "National Market",
      lastUpdated: "2024-03-20T10:00:00"
    },
    {
      id: 7,
      crop: "Carrots",
      price: "₹15/kg",
      image: "https://media.istockphoto.com/id/185275579/photo/bundles-of-organic-carrots-with-the-stems-still-attached.jpg?s=612x612&w=0&k=20&c=OIdIDUtDF9jxpCFnZlb7ld5tOj8pDMol1XIcfsHFlEk=",
      change: "+1.0%",
      trend: "up",
      description: "Organic carrots rich in vitamins",
      history: [14, 14, 15, 15, 15],
      market: "Local Market",
      lastUpdated: "2024-03-20T10:00:00"
    },
    {
      id: 8,
      crop: "Cabbage",
      price: "₹12/kg",
      image: "https://media.istockphoto.com/id/1341385091/photo/cabbage-cultivation-close-up.jpg?s=612x612&w=0&k=20&c=KlKO9b5L2nzeEcOTT8wfKWq41h234M7AH9rS-OSaoDM=",
      change: "-0.8%",
      trend: "down",
      description: "Fresh green cabbage, perfect for salads and cooking",
      history: [13, 12, 12, 12, 12],
      market: "Regional Market",
      lastUpdated: "2024-03-20T10:00:00"
    },
    {
      id: 9,
      crop: "Green Beans",
      price: "₹30/kg",
      image: "https://media.istockphoto.com/id/1412931086/photo/fresh-green-bean-pods-texture-close-up-top-view.jpg?s=612x612&w=0&k=20&c=59qXWquEIFyaUc4AxvPcBzIIwtG823L8cuej7lDwHZE=",
      change: "+2.0%",
      trend: "up",
      description: "Fresh green beans, hand-picked daily",
      history: [28, 29, 30, 30, 30],
      market: "Local Market",
      lastUpdated: "2024-03-20T10:00:00"
    }
  ];

  const filteredPrices = dailyPrices
    .filter(item => item.crop.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price') {
        return parseInt(b.price) - parseInt(a.price);
      }
      return a.crop.localeCompare(b.crop);
    });

  const chartData = selectedCrop ? {
    labels: ['5 days ago', '4 days ago', '3 days ago', '2 days ago', 'Today'],
    datasets: [
      {
        label: `${selectedCrop.crop} Price History`,
        data: selectedCrop.history,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  } : null;

  return (
    <>
    <Navigation/>
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Daily Crop Prices
          </h1>
          <p className="mt-3 text-gray-500">
            Updated prices as of {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="w-full sm:w-96">
            <input
              type="text"
              placeholder="Search crops..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="price">Sort by Price</option>
              <option value="name">Sort by Name</option>
            </select>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              onClick={() => window.location.reload()}
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Price Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPrices.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => setSelectedCrop(item)}
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={item.image}
                  alt={item.crop}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {item.crop}
                </h3>
                <p className="mt-2 text-gray-600 text-sm">{item.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {item.price}
                  </div>
                  <div
                    className={`flex items-center ${
                      item.trend === "up"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.trend === "up" ? (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 9.707l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 8.414V15a1 1 0 11-2 0V8.414L6.707 11.121a1 1 0 01-1.414-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14.707 10.293l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 11.586V5a1 1 0 112 0v6.586l2.293-2.293a1 1 0 111.414 1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    <span className="ml-1">{item.change}</span>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  <p>Market: {item.market}</p>
                  <p>Last Updated: {new Date(item.lastUpdated).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Price History Chart */}
        {selectedCrop && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Price History - {selectedCrop.crop}</h3>
            <div className="h-64">
              <Line data={chartData} options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: false
                  }
                }
              }} />
            </div>
          </div>
        )}
      </div>
    </div>
    <FooterLandingPage/>
    </>
  );
}

export default DailyPrice; 