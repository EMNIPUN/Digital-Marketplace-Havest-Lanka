import React, { useState } from 'react';
import axios from 'axios';

const cropList = ['Tomato',  'Carrot', 'Bell Pepper'];

export default function FinanceAnalysis() {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [predictionText, setPredictionText] = useState('');
  const [timeline, setTimeline] = useState('7');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setFiltered(
      cropList.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleSelect = (value) => {
    setQuery(value);
    setFiltered([]);
  };

  const handlePredict = async () => {
    if (!query) return;
    setLoading(true);
    try {
      // Fetch crop prices
      const priceResponse = await axios.get(`http://localhost:8005/api/prices-by-name/${query}`);
      const prices = priceResponse.data;

      // Send prices and crop name to backend for prediction
      const predictionResponse = await axios.post(`http://localhost:8005/api/predict-price`, {
        name: query,
        prices,
        timeline: parseInt(timeline),
      });

      setPredictionText(predictionResponse.data.prediction || 'No prediction returned');
    } catch (error) {
      console.error('Prediction error:', error);
      setPredictionText('Failed to fetch prediction.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-100 p-5">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Market Analysis & Price Predictions
        </h2>

        {/* Search and Timeline Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Search Crop
            </label>
            <div className="relative w-full">
              <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Enter crop name (e.g., Tomato, Onion)"
                className="w-full px-4 py-2 border rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {filtered.length > 0 && (
                <ul className="absolute z-10 bg-white border w-full mt-1 rounded-md shadow">
                  {filtered.map((item, idx) => (
                    <li
                      key={idx}
                      onClick={() => handleSelect(item)}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Prediction Timeline
            </label>
            <select
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="7">Next 7 Days</option>
              <option value="14">Next 14 Days</option>
              <option value="21">Next 21 Days</option>
              <option value="28">Next 28 Days</option>
            </select>
          </div>

          <button
            onClick={handlePredict}
            disabled={loading}
            className="w-[120px] h-[40px] p-2 bg-[#22C55E] text-white rounded-lg mt-8"
          >
            {loading ? 'Predicting...' : 'Predict Price'}
          </button>
        </div>

        {/* Detailed Analysis */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Market Analysis
          </h3>
          <div className="prose max-w-none">
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {predictionText || 'Enter a crop name and click Predict Price to view analysis.'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
