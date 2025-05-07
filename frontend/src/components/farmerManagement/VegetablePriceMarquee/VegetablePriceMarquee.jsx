import React, { useEffect, useState } from "react";

const VegetablePriceMarquee = () => {
   // Sample vegetable price data
   // In a real implementation, you would fetch this from an API
   const [priceData, setPriceData] = useState([
      {
         id: 1,
         name: "Tomatoes",
         price: 2.45,
         unit: "kg",
         trend: "up",
         change: 0.15,
      },
      {
         id: 2,
         name: "Potatoes",
         price: 1.2,
         unit: "kg",
         trend: "down",
         change: 0.05,
      },
      {
         id: 3,
         name: "Onions",
         price: 1.75,
         unit: "kg",
         trend: "up",
         change: 0.2,
      },
      {
         id: 4,
         name: "Carrots",
         price: 1.3,
         unit: "kg",
         trend: "down",
         change: 0.1,
      },
      {
         id: 5,
         name: "Cabbage",
         price: 1.85,
         unit: "kg",
         trend: "stable",
         change: 0,
      },
      {
         id: 6,
         name: "Bell Peppers",
         price: 3.5,
         unit: "kg",
         trend: "up",
         change: 0.25,
      },
      {
         id: 7,
         name: "Cucumbers",
         price: 1.95,
         unit: "kg",
         trend: "stable",
         change: 0,
      },
      {
         id: 8,
         name: "Spinach",
         price: 2.75,
         unit: "kg",
         trend: "down",
         change: 0.15,
      },
      {
         id: 9,
         name: "Eggplant",
         price: 2.1,
         unit: "kg",
         trend: "up",
         change: 0.1,
      },
      {
         id: 10,
         name: "Lettuce",
         price: 1.6,
         unit: "kg",
         trend: "down",
         change: 0.05,
      },
   ]);

   // For a realistic effect, we'll update one random price every few seconds
   useEffect(() => {
      const interval = setInterval(() => {
         setPriceData((currentPrices) => {
            const newPrices = [...currentPrices];
            const randomIndex = Math.floor(Math.random() * newPrices.length);
            const randomChange = (Math.random() * 0.3 - 0.15).toFixed(2);
            const newPrice = +(
               newPrices[randomIndex].price + +randomChange
            ).toFixed(2);

            newPrices[randomIndex] = {
               ...newPrices[randomIndex],
               price: newPrice > 0 ? newPrice : 0.1,
               trend:
                  randomChange > 0
                     ? "up"
                     : randomChange < 0
                     ? "down"
                     : "stable",
               change: Math.abs(randomChange),
            };

            return newPrices;
         });
      }, 5000);

      return () => clearInterval(interval);
   }, []);

   // Function to render trend indicator
   const renderTrendIndicator = (trend, change) => {
      if (trend === "up") {
         return (
            <span className="flex items-center text-green-600 font-medium">
               <svg
                  className="w-3 h-3 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M5 15l7-7 7 7"
                  ></path>
               </svg>
               {change.toFixed(2)}
            </span>
         );
      } else if (trend === "down") {
         return (
            <span className="flex items-center text-red-600 font-medium">
               <svg
                  className="w-3 h-3 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M19 9l-7 7-7-7"
                  ></path>
               </svg>
               {change.toFixed(2)}
            </span>
         );
      } else {
         return (
            <span className="flex items-center text-gray-500 font-medium">
               <svg
                  className="w-3 h-3 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M5 12h14"
                  ></path>
               </svg>
               0.00
            </span>
         );
      }
   };

   return (
      <div className="w-full bg-white border border-gray-200 shadow-sm  overflow-hidden">
         <div className="flex items-center bg-green-700 text-white p-3">
            <div className="flex items-center mr-2">
               <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  ></path>
               </svg>
               <h2 className="font-bold text-lg">Live Market Prices</h2>
            </div>
            <div className="text-xs bg-green-800 py-1 px-2 rounded">
               Last Updated: {new Date().toLocaleTimeString()}
            </div>
         </div>

         <div className="relative overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap py-3 bg-gray-50">
               {priceData.map((item) => (
                  <div
                     key={item.id}
                     className="flex items-center mx-6 px-4 py-2 bg-white rounded-md shadow-sm border border-gray-100"
                  >
                     <span className="font-semibold text-gray-800 mr-2">
                        {item.name}:
                     </span>
                     <span className="text-gray-900 font-bold">
                        Rs.{item.price.toFixed(2)}
                     </span>
                     <span className="text-xs text-gray-500 mx-1">
                        /{item.unit}
                     </span>
                     <div className="ml-2">
                        {renderTrendIndicator(item.trend, item.change)}
                     </div>
                  </div>
               ))}

               {/* Duplicate the items to create a seamless loop */}
               {priceData.map((item) => (
                  <div
                     key={`dup-${item.id}`}
                     className="flex items-center mx-6 px-4 py-2 bg-white rounded-md shadow-sm border border-gray-100"
                  >
                     <span className="font-semibold text-gray-800 mr-2">
                        {item.name}:
                     </span>
                     <span className="text-gray-900 font-bold">
                        Rs.{item.price.toFixed(2)}
                     </span>
                     <span className="text-xs text-gray-500 mx-1">
                        /{item.unit}
                     </span>
                     <div className="ml-2">
                        {renderTrendIndicator(item.trend, item.change)}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

// Add this CSS for the marquee animation
const styles = `
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-marquee {
  animation: marquee 30s linear infinite;
}
`;

const VegetablePriceMarqueeWithStyles = () => (
   <>
      <style>{styles}</style>
      <VegetablePriceMarquee />
   </>
);

export default VegetablePriceMarqueeWithStyles;
