import React from 'react';
import {  FaTruck, FaRoute, FaWarehouse, FaExclamationTriangle, FaUser, FaClock, FaBell, FaDownload, FaPhoneAlt, FaMapMarkedAlt,FaThermometerHalf, FaCheckCircle, FaTools, FaCalendarCheck, FaComment, FaThumbsUp,FaChartBar, FaUsers, FaClipboardList, FaComments, FaTachometerAlt, FaQuestionCircle
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-semibold text-green-800">Harvest Lanka</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <NavLink 
                text="Dashboard"
                to="/"
              />
              <NavLink 
                text="Vehicle & Driver"
                to="/transport/management"
              />
              <NavLink 
                text="Transport Requests"
                to="/transport-requests"
              />
             
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3 group">
                <div className="text-right hidden md:block group-hover:opacity-75 transition-opacity">
                  <p className="text-sm font-medium text-gray-800">Admin Portal</p>
                  <p className="text-xs text-gray-500">Transport Manager</p>
                </div>
                <div className="h-9 w-9 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center transform hover:scale-105 transition-transform duration-200">
                  <FaUser className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with Key Metrics - Enhanced */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Transport Dashboard
            </h1>
            <p className="text-gray-500 mt-1">Today's Overview</p>
          </div>
          <div className="flex items-center">
            <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
              + New Shipment
            </button>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<FaTruck className="h-6 w-6" />}
            title="Total Deliveries"
            value="234/250"
            bgColor="bg-green-500"
            subtitle="93.6% Completed"
          />
          <StatCard
            icon={<FaCheckCircle className="h-6 w-6" />}
            title="On-Time Deliveries"
            value="228"
            bgColor="bg-blue-500"
            subtitle="Above Target"
          />
          <StatCard
            icon={<FaClock className="h-6 w-6" />}
            title="Avg Delivery Time"
            value="45min"
            bgColor="bg-green-600"
            subtitle="Faster than last week"
          />
          <StatCard
            icon={<FaExclamationTriangle className="h-6 w-6" />}
            title="Active Delays"
            value="3"
            negative
            bgColor="bg-amber-500"
            subtitle="Requires attention"
          />
        </div>

        {/* Vehicle Status and Notifications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
         

          {/* Notifications Panel */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Recent Alerts</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <NotificationItem
                  icon={<FaExclamationTriangle className="h-4 w-4" />}
                  title="Delivery Delay"
                  message="Vehicle SH003 is running 15 minutes late"
                  time="5 min ago"
                  type="warning"
                />
                <NotificationItem
                  icon={<FaThermometerHalf className="h-4 w-4" />}
                  title="Weather Alert"
                  message="Heavy rain expected in Colombo region"
                  time="10 min ago"
                  type="info"
                />
                <NotificationItem
                  icon={<FaTools className="h-4 w-4" />}
                  title="Maintenance Due"
                  message="Vehicle KN002 requires scheduled service"
                  time="1 hour ago"
                  type="maintenance"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Map and Driver Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Map Section */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Live Vehicle Tracking</h2>
                  <p className="text-sm text-gray-500 mt-1">Real-time location of all vehicles</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="flex items-center space-x-1">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-600">On Time (42)</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    <span className="text-sm text-gray-600">Delayed (3)</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="h-[400px] bg-gray-50 p-4">
              <div className="h-full bg-white rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
                <FaMapMarkedAlt className="h-16 w-16 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Driver Information */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Active Drivers</h2>
                <div className="flex items-center space-x-2">
                  
                  <button className="px-3 py-1 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
                    View All
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <DriverCard
                  name="Nimal Perera"
                  status="In Transit"
                  route="Colombo - Kandy"
                  phone="+94 77 123 4567"
                />
                <DriverCard
                  name="Ravi Silva"
                  status="Loading"
                  route="Galle - Matara"
                  phone="+94 77 234 5678"
                />
                <DriverCard
                  name="Janaka Bandara"
                  status="Completed"
                  route="Jaffna - Vavuniya"
                  phone="+94 77 345 6789"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Shipments Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Active Shipments</h2>
                <p className="text-sm text-gray-500 mt-1">Overview of ongoing deliveries</p>
              </div>
      
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="w-1/6 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="w-1/4 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                  <th className="w-1/4 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                  <th className="w-1/6 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="w-1/6 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ETA</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
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
                <ShipmentRow
                  id="SH003"
                  driver="Janaka Bandara"
                  destination="Kegalle"
                  status="Delayed"
                  eta="4:00 PM"
                />
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing 3 of 24 shipments
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                View All Shipments →
              </button>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section - Moved to bottom */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Recent Reviews</h2>
                <p className="text-sm text-gray-500 mt-1">Latest customer feedback</p>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                <FaComment className="h-4 w-4" />
                <span>View All Reviews</span>
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <CustomerReview
                name="Sarah M."
                rating={5}
                date="Today"
                comment="Excellent service! Driver was very professional and delivery was right on time."
                deliveryId="SH001"
              />
              <CustomerReview
                name="John D."
                rating={4}
                date="Yesterday"
                comment="Good delivery service, but the tracking updates could be more frequent."
                deliveryId="SH045"
              />
              <CustomerReview
                name="Priya K."
                rating={5}
                date="2 days ago"
                comment="Very satisfied with the careful handling of my fragile items. Will definitely use again!"
                deliveryId="SH032"
              />
            </div>
          </div>
          <div className="px-6 pb-6">
            <div className="flex items-center justify-between text-sm bg-green-50 p-3 rounded-lg">
              <div className="flex items-center text-green-700">
               
              </div>
              
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-4 left-4">
        <button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg text-gray-600 hover:bg-gray-50">
          <FaQuestionCircle className="h-5 w-5 text-green-600" />
          <span>Need Help?</span>
        </button>
      </div>
    </div>
  );
};

const NavLink = ({ text, to }) => {
  const location = useLocation();
  const active = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        active 
          ? 'bg-gradient-to-r from-green-50 to-green-100 text-green-600 shadow-sm' 
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
      }`}
    >
      {text}
    </Link>
  );
};

const StatCard = ({ icon, title, value, change, negative, bgColor, subtitle }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className={`p-6 ${bgColor} bg-opacity-10`}>
        <div className="flex items-center justify-between">
          <div className={`${bgColor} bg-opacity-20 p-3 rounded-lg`}>
            <div className={`${bgColor.replace('bg-', 'text-')}`}>{icon}</div>
          </div>
          <span className={`text-sm font-medium px-2 py-1 rounded-full ${negative ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
            {change}
          </span>
        </div>
        <h3 className="mt-4 text-2xl font-bold text-gray-800">{value}</h3>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      </div>
    </div>
  );
};

const VehicleStatusCard = ({ status, count, color }) => {
  return (
    <div className={`p-4 rounded-lg ${color} bg-opacity-20`}>
      <div className="flex justify-between items-center">
        <span className="font-medium">{status}</span>
        <span className="text-2xl font-bold">{count}</span>
      </div>
    </div>
  );
};

const NotificationItem = ({ icon, title, message, time, type }) => {
  const getTypeStyles = (type) => {
    switch (type) {
      case 'warning': return 'bg-red-100 text-red-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
      <div className={`p-2 rounded-full ${getTypeStyles(type)}`}>
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{message}</p>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
    </div>
  );
};

const DriverCard = ({ name, status, route, phone }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'in transit': return 'bg-green-100 text-green-800';
      case 'loading': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 rounded-lg border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500">{route}</p>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>
      
      {/* Performance Metrics */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center p-2 bg-gray-50 rounded">
          <div className="text-sm font-semibold text-green-600">98%</div>
          <div className="text-xs text-gray-500">On-Time</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded">
          <div className="text-sm font-semibold text-blue-600">4.8</div>
          <div className="text-xs text-gray-500">Rating</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded">
          <div className="text-sm font-semibold text-purple-600">45</div>
          <div className="text-xs text-gray-500">Deliveries</div>
        </div>
      </div>

      {/* Availability Schedule */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-600">Today's Schedule</span>
          <span className="text-xs text-gray-500">8:00 AM - 5:00 PM</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 rounded-full" style={{ width: '60%' }}></div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center text-gray-500">
          <FaPhoneAlt className="h-3 w-3 mr-2" />
          {phone}
        </div>
        <button className="text-green-600 hover:text-green-700 text-sm font-medium">
          View Details
        </button>
      </div>
    </div>
  );
};

const ShipmentRow = ({ id, driver, destination, status, eta }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'in transit': return 'bg-green-100 text-green-800';
      case 'loading': return 'bg-yellow-100 text-yellow-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      <td className="w-1/6 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">{id}</td>
      <td className="w-1/4 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{driver}</td>
      <td className="w-1/4 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{destination}</td>
      <td className="w-1/6 px-6 py-4 whitespace-nowrap text-right">
        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(status)} inline-block`}>
          {status}
        </span>
      </td>
      <td className="w-1/6 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{eta}</td>
    </tr>
  );
};

const CustomerReview = ({ name, rating, date, comment, deliveryId }) => {
  return (
    <div className="p-4 rounded-lg border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full bg-green-100 text-green-800`}>
          {rating}
        </span>
      </div>
      <p className="text-sm text-gray-600">{comment}</p>
      <div className="mt-3">
        <button className="text-green-600 hover:text-green-700 text-sm font-medium">
          View Delivery
        </button>
      </div>
    </div>
  );
};

export default Dashboard; 