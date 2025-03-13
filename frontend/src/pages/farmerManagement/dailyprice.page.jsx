import React, { useState } from 'react';

const DailyPriceList = () => {
  // Sample vegetable price data
  const [vegetables, setVegetables] = useState([
    { id: 1, name: "Tomatoes", price: 2.99, unit: "kg", previousPrice: 3.25, inStock: true, category: "fruit" },
    { id: 2, name: "Potatoes", price: 1.49, unit: "kg", previousPrice: 1.49, inStock: true, category: "root" },
    { id: 3, name: "Onions", price: 1.29, unit: "kg", previousPrice: 1.39, inStock: true, category: "root" },
    { id: 4, name: "Carrots", price: 1.89, unit: "kg", previousPrice: 1.75, inStock: true, category: "root" },
    { id: 5, name: "Bell Peppers", price: 3.99, unit: "kg", previousPrice: 4.25, inStock: true, category: "fruit" },
    { id: 6, name: "Lettuce", price: 1.79, unit: "head", previousPrice: 1.99, inStock: true, category: "leafy" },
    { id: 7, name: "Broccoli", price: 2.49, unit: "head", previousPrice: 2.29, inStock: true, category: "flower" },
    { id: 8, name: "Spinach", price: 2.99, unit: "bunch", previousPrice: 2.99, inStock: true, category: "leafy" },
    { id: 9, name: "Cucumber", price: 1.29, unit: "each", previousPrice: 1.49, inStock: true, category: "fruit" },
    { id: 10, name: "Zucchini", price: 1.99, unit: "kg", previousPrice: 1.79, inStock: false, category: "fruit" }
  ]);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('name');
  const [market, setMarket] = useState('central');
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));

  // Filter vegetables based on search term
  const filteredVegetables = vegetables.filter(vegetable => 
    vegetable.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort vegetables based on criteria
  const sortedVegetables = [...filteredVegetables].sort((a, b) => {
    switch(sortCriteria) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'change':
        return (b.previousPrice - b.price) - (a.previousPrice - a.price);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  // Calculate price change percentage
  const getPriceChange = (current, previous) => {
    if (current === previous) return 0;
    return ((current - previous) / previous) * 100;
  };

  // Change date (for demonstration purposes)
  const changeDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    setCurrentDate(date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center text-green-800 mb-6">Daily Vegetable Price Tracker</h1>
      
      <div className="mb-4">
        <label htmlFor="market" className="mr-2 font-medium">Select Market:</label>
        <select 
          id="market"
          className="p-2 border rounded"
          value={market}
          onChange={(e) => setMarket(e.target.value)}
        >
          <option value="central">Central Market</option>
          <option value="north">North Market</option>
          <option value="south">South Market</option>
          <option value="wholesale">Wholesale Market</option>
        </select>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <button 
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
          onClick={() => changeDate(-1)}
        >
          ← Previous Day
        </button>
        <div className="text-lg font-medium">{currentDate}</div>
        <button 
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
          onClick={() => changeDate(1)}
        >
          Next Day →
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Search vegetables..."
          className="p-2 border rounded flex-grow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="price-low">Sort by Price (Low to High)</option>
          <option value="price-high">Sort by Price (High to Low)</option>
          <option value="change">Sort by Price Change</option>
        </select>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Vegetable</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Unit</th>
              <th className="p-3 text-left">Change</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedVegetables.map((vegetable) => {
              const priceChange = getPriceChange(vegetable.price, vegetable.previousPrice);
              let changeColor = "text-gray-500";
              if (priceChange > 0) changeColor = "text-red-600";
              if (priceChange < 0) changeColor = "text-green-600";
              
              return (
                <tr key={vegetable.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{vegetable.name}</td>
                  <td className="p-3">${vegetable.price.toFixed(2)}</td>
                  <td className="p-3">per {vegetable.unit}</td>
                  <td className={`p-3 font-medium ${changeColor}`}>
                    {priceChange === 0 ? 
                      "No change" : 
                      `${priceChange > 0 ? '+' : ''}${priceChange.toFixed(1)}%`
                    }
                  </td>
                  <td className="p-3">
                    {vegetable.inStock ? 
                      <span className="text-green-600 font-medium">In Stock</span> : 
                      <span className="text-red-600 font-medium">Out of Stock</span>
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {filteredVegetables.length === 0 && (
        <div className="text-center p-4 text-gray-500">
          No vegetables found matching your search.
        </div>
      )}
    </div>
  );
};

export default DailyPriceList;