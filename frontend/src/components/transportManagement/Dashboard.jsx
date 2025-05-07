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
   FaMapMarkedAlt,
   FaThermometerHalf,
   FaCheckCircle,
   FaTools,
   FaCalendarCheck,
   FaComment,
   FaThumbsUp,
   FaChartBar,
   FaUsers,
   FaClipboardList,
   FaComments,
   FaTachometerAlt,
   FaQuestionCircle,
} from "react-icons/fa";
import Token from "../userManagement/logins/Token";

const Dashboard = () => {
   return (
      <div className="min-h-screen bg-gray-100 p-6 px-32">
         <Header />
         <StatsSection />
         <NotificationsSection />
         <TrackingAndDriversSection />
         <ShipmentsSection />
         <ReviewsSection />
         <HelpButton />
      </div>
   );
};

const Header = () => (
   <div className="flex flex-col md:flex-row justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-800">Transport Dashboard</h1>
      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
         + New Shipment
      </button>
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

const TrackingAndDriversSection = () => (
   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <MapSection />
      <DriversSection />
   </div>
);

const MapSection = () => (
   <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-2">Live Vehicle Tracking</h2>
      <div className="h-[300px] bg-gray-100 flex items-center justify-center border border-dashed border-gray-300">
         <FaMapMarkedAlt className="text-gray-500 text-4xl" />
      </div>
   </div>
);

const DriversSection = () => (
   <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Active Drivers</h2>
      <DriverCard
         name="Nimal Perera"
         route="Colombo - Kandy"
         phone="+94 77 123 4567"
      />
      <DriverCard
         name="Ravi Silva"
         route="Galle - Matara"
         phone="+94 77 234 5678"
      />
   </div>
);

const ShipmentsSection = () => (
   <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Active Shipments</h2>
      <ShipmentRow
         id="SH001"
         driver="Nimal Perera"
         destination="Colombo"
         status="In Transit"
         eta="2:30 PM"
      />
      <ShipmentRow
         id="SH002"
         driver="Ravi Silva"
         destination="Kandy"
         status="Loading"
         eta="3:15 PM"
      />
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
   <div
      className={`p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition`}
   >
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

const DriverCard = ({ name, route, phone }) => (
   <div className="border-b pb-2 mb-2">
      <h4 className="font-semibold">{name}</h4>
      <p className="text-sm text-gray-600">{route}</p>
      <p className="text-xs text-gray-500">{phone}</p>
   </div>
);

const ShipmentRow = ({ id, driver, destination, status, eta }) => (
   <div className="border-b py-2 flex justify-between text-sm">
      <span>{id}</span>
      <span>{driver}</span>
      <span>{destination}</span>
      <span>{status}</span>
      <span>{eta}</span>
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
