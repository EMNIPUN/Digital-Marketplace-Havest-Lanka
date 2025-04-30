import Navigation from '@/components/farmerManagement/Navigation/Navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LoaderCircle, AlertCircle, Search, Filter, X, ChevronDown, ChevronUp, Info, Star } from 'lucide-react';
import FooterLandingPage from '@/components/other/FooterLandingPage';
import VegetablePriceMarqueeWithStyles from '@/components/farmerManagement/VegetablePriceMarquee/VegetablePriceMarquee';

function CropsPredictionPage() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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

  const categories = ['Vegetables', 'Fruits', 'Nuts', 'Spices', 'Grains', 'Legumes'];

  return (
    <>
      <Navigation />
      <VegetablePriceMarqueeWithStyles/>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            Smart Crop Prediction System
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the perfect crops for your farm based on environmental conditions and soil types
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full p-3 pl-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                placeholder="Search for crops, soil types, or conditions..."
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium"
              >
                Search
              </button>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-between gap-14 mt-4">

            <div className="flex flex-wrap gap-2 mt-3">
              {categories.map((category, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200"
                >
                  {category}
                </span>
              ))}
            </div>

            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-md transition-colors duration-300 ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-md transition-colors duration-300 ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Crops Display Section */}
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Recommended Crops</h2>
            <p className="text-gray-600">
              {crops.length} {crops.length === 1 ? 'crop' : 'crops'} found
            </p>
          </div>
          
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
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <p className="text-gray-600">No crops found. Try a different search term.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {crops.map((item, index) => {
                const crop = item.crops || item;
                return (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                    onClick={() => setSelectedCrop(crop)}
                  >
                    <div className="relative">
                      <img
                        src={crop.image}
                        alt={crop.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {crop.soilType}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-gray-800">{crop.name}</h3>
                        <div className="flex items-center text-yellow-400">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="ml-1 text-sm text-gray-600">4.8</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-2">{crop.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <span className="font-medium text-gray-700 w-32">Temperature:</span>
                          <span className="text-gray-600">{crop.idealTemp}°C</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="font-medium text-gray-700 w-32">Humidity:</span>
                          <span className="text-gray-600">{crop.humidity}%</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="font-medium text-gray-700 w-32">Growth Period:</span>
                          <span className="text-gray-600">{crop.growthPeriod}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {crops.map((item, index) => {
                const crop = item.crops || item;
                return (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedCrop(crop)}
                  >
                    <div className="flex">
                      <img
                        src={crop.image}
                        alt={crop.name}
                        className="w-48 h-48 object-cover"
                      />
                      <div className="p-6 flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold text-gray-800">{crop.name}</h3>
                          <div className="flex items-center text-yellow-400">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="ml-1 text-sm text-gray-600">4.8</span>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-4">{crop.description}</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center text-sm">
                            <span className="font-medium text-gray-700 w-32">Temperature:</span>
                            <span className="text-gray-600">{crop.idealTemp}°C</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="font-medium text-gray-700 w-32">Humidity:</span>
                            <span className="text-gray-600">{crop.humidity}%</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="font-medium text-gray-700 w-32">Soil Type:</span>
                            <span className="text-gray-600">{crop.soilType}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="font-medium text-gray-700 w-32">Growth Period:</span>
                            <span className="text-gray-600">{crop.growthPeriod}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Crop Detail Modal */}
        {selectedCrop && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <img
                  src={selectedCrop.image}
                  alt={selectedCrop.name}
                  className="w-full h-64 object-cover rounded-t-xl"
                />
                <button
                  onClick={() => setSelectedCrop(null)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{selectedCrop.name}</h2>
                  <div className="flex items-center text-yellow-400">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="ml-1 text-gray-600">4.8 (120 reviews)</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{selectedCrop.description}</p>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Growing Conditions</h3>
                    <div className="space-y-2">
                      <p className="text-sm"><span className="font-medium">Temperature:</span> {selectedCrop.idealTemp}°C</p>
                      <p className="text-sm"><span className="font-medium">Humidity:</span> {selectedCrop.humidity}%</p>
                      <p className="text-sm"><span className="font-medium">Soil Type:</span> {selectedCrop.soilType}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Growth Information</h3>
                    <div className="space-y-2">
                      <p className="text-sm"><span className="font-medium">Growth Period:</span> {selectedCrop.growthPeriod}</p>
                      <p className="text-sm"><span className="font-medium">Water Needs:</span> Moderate</p>
                      <p className="text-sm"><span className="font-medium">Sunlight:</span> Full sun</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                    Save for Later
                  </button>
                  <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300">
                    Add to Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <FooterLandingPage/>
    </>
  );
}

export default CropsPredictionPage;
