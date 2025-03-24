import React from 'react'

function DailyPrice() {
  // Sample data - replace with your actual data
  const dailyPrices = [
    {
      id: 1,
      crop: "Rice",
      price: "₹35/kg",
      image: "https://example.com/rice.jpg", // Replace with actual image URL
      change: "+2.5%",
      trend: "up"
    },
    {
      id: 2,
      crop: "Wheat",
      price: "₹28/kg",
      image: "https://example.com/wheat.jpg", // Replace with actual image URL
      change: "-1.2%",
      trend: "down"
    },
    // Add more crops as needed
  ];

  return (
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

        {/* Price Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dailyPrices.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DailyPrice 