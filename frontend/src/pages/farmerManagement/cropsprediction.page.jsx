import Navigation from '@/components/farmerManagement/Navigation/Navigation';
import React, { useState } from 'react';

function CropsPredictionPage() {
  const [searchParams, setSearchParams] = useState({
    temperature: '',
    humidity: '',
    rainfall: '',
    soilType: '',
  });

  // Sample vegetable data (in a real app, this would come from your backend)
  const vegetables = [
    {
      name: 'Tomatoes',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea',
      idealTemp: '20-25°C',
      humidity: '60-80%',
      soilType: 'Well-drained loamy',
      growthPeriod: '60-80 days',
      description: 'Perfect for warm weather, requires regular watering and full sun exposure.'
    },
    {
      name: 'Carrots',
      image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979',
      idealTemp: '15-20°C',
      humidity: '50-70%',
      soilType: 'Sandy loam',
      growthPeriod: '70-80 days',
      description: 'Root vegetable that thrives in cool weather and loose, deep soil.'
    },
    {
      name: 'Lettuce',
      image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1',
      idealTemp: '15-18°C',
      humidity: '60-70%',
      soilType: 'Rich, well-drained',
      growthPeriod: '45-55 days',
      description: 'Cool-season crop, perfect for beginners, grows quickly.'
    },
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vegetables.map((vegetable, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={vegetable.image}
                  alt={vegetable.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{vegetable.name}</h3>
                  <p className="text-gray-600 mb-4">{vegetable.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="font-medium">Ideal Temperature:</span> {vegetable.idealTemp}</p>
                    <p className="text-sm"><span className="font-medium">Humidity:</span> {vegetable.humidity}</p>
                    <p className="text-sm"><span className="font-medium">Soil Type:</span> {vegetable.soilType}</p>
                    <p className="text-sm"><span className="font-medium">Growth Period:</span> {vegetable.growthPeriod}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CropsPredictionPage;