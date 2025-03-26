import FinanceFooter from "./FinanceFooter";
import FinanceNavBar from "./FinanceNavBar";
import FinanceSidebar from "./FinanceSidebar";

export default function FinanceAnalysis() {
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
                  <div className="relative">
                     <input
                        type="text"
                        placeholder="Enter crop name (e.g., Tomatoes, Apples, Potatoes)"
                        className="w-full px-4 py-2 border rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     />
                     <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg
                           className="h-5 w-5 text-gray-400"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                           />
                        </svg>
                     </div>
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                     Prediction Timeline
                  </label>
                  <select className="w-full px-4 py-2 border rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                     <option value="7">Next 7 Days</option>
                     <option value="14">Next 14 Days</option>
                     <option value="21">Next 21 Days</option>
                     <option value="28">Next 28 Days</option>
                  </select>
               </div>
            </div>

            {/* Price Prediction Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                     Price Prediction
                  </h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                     High Confidence
                  </span>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                     <div className="text-sm text-gray-600 mb-1">
                        Current Price
                     </div>
                     <div className="text-2xl font-bold text-gray-900">
                        LKR 45/kg
                     </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                     <div className="text-sm text-gray-600 mb-1">
                        Predicted High
                     </div>
                     <div className="text-2xl font-bold text-green-600">
                        LKR 52/kg
                     </div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                     <div className="text-sm text-gray-600 mb-1">
                        Predicted Low
                     </div>
                     <div className="text-2xl font-bold text-red-600">
                        LKR 41/kg
                     </div>
                  </div>
               </div>
            </div>

            {/* Detailed Analysis */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
               <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Market Analysis
               </h3>
               <div className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed mb-4">
                     Based on our comprehensive market analysis of tomatoes over
                     the next 14 days, we predict a moderate price increase due
                     to several key factors. Historical data shows a typical
                     15-20% price surge during this season, and current weather
                     conditions in major growing regions remain favorable.
                     Market demand is expected to increase by 25% due to
                     upcoming festivals and events, while supply chains are
                     operating at 85% efficiency.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                     Key market indicators suggest a strong likelihood of price
                     appreciation, with wholesale markets showing early signs of
                     supply constraints. Transportation costs have increased by
                     8% compared to last month, which may impact final pricing.
                     Consumer demand patterns indicate a shift towards premium
                     quality produce, potentially driving up average market
                     prices.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                     Recommendation: Consider securing inventory within the next
                     7 days before the anticipated price increase. Market
                     volatility index is currently low, suggesting a reliable
                     prediction window. Monitor weather forecasts for potential
                     supply chain disruptions.
                  </p>
               </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
               <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Download Full Analysis
               </button>
            </div>
         </div>
      </>
   );
}
