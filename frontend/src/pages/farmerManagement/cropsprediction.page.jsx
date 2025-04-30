import Navigation from '@/components/farmerManagement/Navigation/Navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LoaderCircle, AlertCircle } from 'lucide-react';

function CropsPredictionPage() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useState({
    temperature: '',
    humidity: '',
    rainfall: '',
    soilType: '',
  });

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(`http://localhost:8005/api/crops`)
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-100 p-8">
        {/* Search Section */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-green-700">
            Crop Prediction System
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Temperature (°C)</label>
              <input
                type="number"
                name="temperature"
                value={searchParams.temperature}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="Enter temperature"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Humidity (%)</label>
              <input
                type="number"
                name="humidity"
                value={searchParams.humidity}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="Enter humidity"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Rainfall (mm)</label>
              <input
                type="number"
                name="rainfall"
                value={searchParams.rainfall}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="Enter rainfall"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Soil Type</label>
              <select
                name="soilType"
                value={searchParams.soilType}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select soil type</option>
                <option value="loamy">Loamy</option>
                <option value="sandy">Sandy</option>
                <option value="clay">Clay</option>
                <option value="silt">Silt</option>
              </select>
            </div>
          </div>

          <button className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300">
            Predict Suitable Crops
          </button>
        </div>

        {/* Vegetables Cards Section */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Recommended Crops</h2>
          
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {crops.map((crop, index) => (
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
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CropsPredictionPage;