import Navigation from '@/components/farmerManagement/Navigation/Navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LoaderCircle, AlertCircle, Search } from 'lucide-react';

function CropsPredictionPage() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    setLoading(true);
    setError(null);
    axios
      .get(`http://localhost:8005/api/crops/search/retrive?query=${searchQuery}`)
      .then((response) => {
        setCrops(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError('Failed to search crops. Please try again later.');
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(`http://localhost:8005/api/crops/`)
      .then((response) => {
        setCrops(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        setError('Failed to fetch crops data. Please try again later.');
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, []);

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-100 p-8">
        {/* Search Section */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-green-700">
            Crop Prediction System
          </h1>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                  placeholder="Search crops..."
                />
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              </div>
              <button
                onClick={handleSearch}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Crops Display Section */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Search Results</h2>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <LoaderCircle className="w-12 h-12 text-green-600 animate-spin" />
              <p className="mt-4 text-gray-600">Loading crops data...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="w-12 h-12 text-red-600" />
              <p className="mt-4 text-red-600">{error}</p>
            </div>
          ) : crops.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No crops found. Try a different search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {crops.map((item, index) => {
                const crop = item.crops || item;
                return (
                  <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img
                      src={crop.image}
                      alt={crop.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{crop.name}</h3>
                      <p className="text-gray-600 mb-4">{crop.description}</p>
                      <div className="space-y-2">
                        <p className="text-sm"><span className="font-medium">Ideal Temperature:</span> {crop.idealTemp}</p>
                        <p className="text-sm"><span className="font-medium">Humidity:</span> {crop.humidity}</p>
                        <p className="text-sm"><span className="font-medium">Soil Type:</span> {crop.soilType}</p>
                        <p className="text-sm"><span className="font-medium">Growth Period:</span> {crop.growthPeriod}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CropsPredictionPage;
