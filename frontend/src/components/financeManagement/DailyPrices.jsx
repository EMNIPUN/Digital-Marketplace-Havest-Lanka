import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DailyPrices = () => {
  const [priceData, setPriceData] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await axios.get('http://localhost:8005/api/recent-prices');
        setPriceData(res.data);
      } catch (err) {
        console.error('Error fetching price data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  
  const grouped = {};
  priceData.forEach((item) => {
    if (!grouped[item.name]) grouped[item.name] = [];
    grouped[item.name].push(item);
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Last 7 Days Price Data (From 8th May 2025)</h2>

      {loading ? (
        <p>Loading...</p>
      ) : Object.keys(grouped).length === 0 ? (
        <p>No price data found.</p>
      ) : (
        Object.keys(grouped).map((name) => (
          <div key={name} className="mb-6 border rounded p-4 shadow-md">
            <h3 className="text-lg font-semibold mb-2">{name}</h3>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">Date</th>
                  
                  <th className="border px-4 py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {grouped[name]
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((item, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{item.date.slice(0,10)}</td>
                     
                      <td className="border px-4 py-2">{item.price}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default DailyPrices;
