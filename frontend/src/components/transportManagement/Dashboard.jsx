import React from "react";
import {
   FaTruck,
   FaRoute,
   FaWarehouse,
   FaExclamationTriangle,
   FaUser,
   FaClock,
   FaBell,
   FaDownload,
   FaPhoneAlt,
   FaThermometerHalf,
   FaCheckCircle,
   FaTools,
   FaQuestionCircle,
} from "react-icons/fa";

const Dashboard = () => {
   return (
      <div className="min-h-screen bg-gray-100 p-6 px-32">
         <Header />
         <StatsSection />
         <NotificationsSection />
         <VehicleStatsSection />
         <WeeklySummarySection />
         <DriverFeedbackSection />
         <ReviewsSection />
         <HelpButton />
      </div>
   );
};

const Header = () => (
   <div className="flex flex-col md:flex-row justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-800">Transport Dashboard</h1>
   </div>
);

const StatsSection = () => (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
         icon={<FaTruck />}
         title="Total Deliveries"
         value="234/250"
         subtitle="93.6% Completed"
         bgColor="bg-green-500"
      />
      <StatCard
         icon={<FaCheckCircle />}
         title="On-Time Deliveries"
         value="228"
         subtitle="Above Target"
         bgColor="bg-blue-500"
      />
      <StatCard
         icon={<FaClock />}
         title="Avg Delivery Time"
         value="45min"
         subtitle="Faster than last week"
         bgColor="bg-green-600"
      />
      <StatCard
         icon={<FaExclamationTriangle />}
         title="Active Delays"
         value="3"
         subtitle="Requires attention"
         bgColor="bg-amber-500"
      />
   </div>
);

const NotificationsSection = () => (
   <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>
      <NotificationItem
         icon={<FaExclamationTriangle />}
         title="Delivery Delay"
         message="Vehicle SH003 is running 15 minutes late"
      />
      <NotificationItem
         icon={<FaThermometerHalf />}
         title="Weather Alert"
         message="Heavy rain expected in Colombo region"
      />
      <NotificationItem
         icon={<FaTools />}
         title="Maintenance Due"
         message="Vehicle KN002 requires scheduled service"
      />
   </div>
);

const VehicleStatsSection = () => (
   <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Vehicle Performance Summary</h2>
      <VehicleStat id="KN002" mileage="12,540 km" fuel="8.5 km/l" maintenance="Next: 2025-06-15" />
      <VehicleStat id="SH003" mileage="9,210 km" fuel="9.2 km/l" maintenance="Next: 2025-06-01" />
   </div>
);

const VehicleStat = ({ id, mileage, fuel, maintenance }) => (
   <div className="border-b py-2 flex justify-between text-sm text-gray-700">
      <span><strong>{id}</strong></span>
      <span>Mileage: {mileage}</span>
      <span>Fuel Efficiency: {fuel}</span>
      <span>{maintenance}</span>
   </div>
);

const WeeklySummarySection = () => (
   <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Weekly Delivery Summary</h2>
      <SummaryRow label="Total Deliveries" value="248" />
      <SummaryRow label="Successful Deliveries" value="243 (98%)" />
      <SummaryRow label="Failed Deliveries" value="5" />
      <SummaryRow label="Average Time" value="47 mins" />
   </div>
);

const SummaryRow = ({ label, value }) => (
   <div className="flex justify-between py-1 text-sm text-gray-700">
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
   </div>
);

const DriverFeedbackSection = () => (
   <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Driver Feedback</h2>
      <FeedbackRow name="Nimal Perera" score="4.9/5" comment="Very professional!" />
      <FeedbackRow name="Ravi Silva" score="4.5/5" comment="Smooth delivery experience." />
   </div>
);

const FeedbackRow = ({ name, score, comment }) => (
   <div className="border-b py-2 text-sm">
      <p><strong>{name}</strong> – Rating: {score}</p>
      <p className="text-gray-600">{comment}</p>
   </div>
);

const ReviewsSection = () => (
   <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
      <CustomerReview name="Sarah M." rating={5} comment="Excellent service!" />
      <CustomerReview
         name="John D."
         rating={4}
         comment="Good delivery service, but tracking updates could be better."
      />
   </div>
);

const HelpButton = () => (
   <div className="fixed bottom-4 left-4">
      <button className="bg-white shadow-lg px-4 py-2 rounded-full text-gray-600 hover:bg-gray-50 flex items-center space-x-2">
         <FaQuestionCircle className="text-green-600" />
         <span>Need Help?</span>
      </button>
   </div>
);

const StatCard = ({ icon, title, value, subtitle, bgColor }) => (
   <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
      <div className="flex items-center space-x-3">
         <div className={`${bgColor} text-white p-2 rounded-full`}>{icon}</div>
         <div>
            <h3 className="text-lg font-bold">{value}</h3>
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-xs text-gray-500">{subtitle}</p>
         </div>
      </div>
   </div>
);

const NotificationItem = ({ icon, title, message }) => (
   <div className="flex items-center space-x-3 mb-2">
      <div className="text-red-500">{icon}</div>
      <div>
         <h4 className="font-semibold">{title}</h4>
         <p className="text-sm text-gray-600">{message}</p>
      </div>
   </div>
);

const CustomerReview = ({ name, rating, comment }) => (
   <div className="border-b pb-2 mb-2">
      <h4 className="font-semibold">{name}</h4>
      <p className="text-sm text-gray-600">Rating: {rating}⭐</p>
      <p className="text-sm text-gray-500">{comment}</p>
   </div>
);

export default Dashboard;
