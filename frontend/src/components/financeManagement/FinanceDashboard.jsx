import React, { useState } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { format } from 'date-fns';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function FinanceDashboard() {
  const [selectedDateRange, setSelectedDateRange] = useState('week');
  const [selectedReport, setSelectedReport] = useState('sales');
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data - Replace with actual data from your backend
  const salesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Sales (USD)',
        data: [12500, 15000, 18000, 16500, 21000, 22000, 20000],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const topSellingProducts = {
    labels: ['Apples', 'Tomatoes', 'Potatoes', 'Oranges', 'Carrots'],
    datasets: [
      {
        label: 'Units Sold',
        data: [500, 450, 400, 350, 300],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
      },
    ],
  };

  const profitDistribution = {
    labels: ['Fruits', 'Vegetables', 'Herbs'],
    datasets: [
      {
        data: [45, 40, 15],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
      },
    ],
  };

  const metrics = [
    { title: 'Total Revenue', value: '$125,000', change: '+12.5%' },
    { title: 'Average Order Value', value: '$750', change: '+5.2%' },
    { title: 'Total Orders', value: '167', change: '+8.1%' },
    { title: 'Active Customers', value: '45', change: '+15.3%' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'reports', label: 'Reports' },
    { id: 'payments', label: 'Payments' },
    { id: 'analysis', label: 'Analysis' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {metrics.map((metric, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-gray-500 text-sm font-medium">{metric.title}</h3>
                  <div className="flex items-center mt-2">
                    <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                    <span className={`ml-2 text-sm ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-4 mb-6">
              <select
                className="px-4 py-2 border rounded-md bg-white"
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
              </select>

              <select
                className="px-4 py-2 border rounded-md bg-white"
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
              >
                <option value="sales">Sales Report</option>
                <option value="inventory">Inventory Report</option>
                <option value="customers">Customer Report</option>
              </select>

              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => window.print()}
              >
                Generate Report
              </button>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Sales Trend */}
              <div className="bg-white p-4 rounded-lg shadow-sm h-[400px]">
                <h2 className="text-lg font-semibold mb-4">Sales Trend</h2>
                <div className="h-[300px]">
                  <Line 
                    data={salesData} 
                    options={{ 
                      responsive: true,
                      maintainAspectRatio: true,
                      plugins: {
                        legend: {
                          position: 'top',
                        }
                      }
                    }} 
                  />
                </div>
              </div>

              {/* Top Selling Products */}
              <div className="bg-white p-4 rounded-lg shadow-sm h-[400px]">
                <h2 className="text-lg font-semibold mb-4">Top Selling Products</h2>
                <div className="h-[300px]">
                  <Bar 
                    data={topSellingProducts} 
                    options={{ 
                      responsive: true,
                      maintainAspectRatio: true,
                      plugins: {
                        legend: {
                          position: 'top',
                        }
                      }
                    }} 
                  />
                </div>
              </div>

              {/* Profit Distribution */}
              <div className="bg-white p-4 rounded-lg shadow-sm h-[400px]">
                <h2 className="text-lg font-semibold mb-4">Profit Distribution</h2>
                <div className="h-[300px]">
                  <Pie 
                    data={profitDistribution} 
                    options={{ 
                      responsive: true,
                      maintainAspectRatio: true,
                      plugins: {
                        legend: {
                          position: 'top',
                        }
                      }
                    }} 
                  />
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white p-4 rounded-lg shadow-sm h-[400px] overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { id: '#12345', customer: 'John Doe', amount: '$1,200', status: 'Completed' },
                        { id: '#12346', customer: 'Jane Smith', amount: '$850', status: 'Pending' },
                        { id: '#12347', customer: 'Bob Johnson', amount: '$2,100', status: 'Completed' },
                        { id: '#12348', customer: 'Alice Brown', amount: '$950', status: 'Processing' },
                      ].map((order, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                                order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-blue-100 text-blue-800'}`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        );
      case 'reports':
        return (
          <div className="p-6">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Business Reports</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Schedule Report
                </button>
              </div>
              
              {/* Essential Report Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Date Range</label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      className="flex-1 px-3 py-2 border rounded-md bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="date"
                      className="flex-1 px-3 py-2 border rounded-md bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Location/Warehouse</label>
                  <select className="w-full px-3 py-2 border rounded-md bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500">
                    <option value="all">All Locations</option>
                    <option value="warehouse1">Main Warehouse</option>
                    <option value="warehouse2">Cold Storage Facility</option>
                    <option value="warehouse3">Distribution Center</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Product Category</label>
                  <select className="w-full px-3 py-2 border rounded-md bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500">
                    <option value="all">All Categories</option>
                    <option value="fruits">Fruits</option>
                    <option value="vegetables">Vegetables</option>
                    <option value="herbs">Herbs</option>
                  </select>
                </div>
              </div>

              {/* Business Report Templates */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {/* Inventory & Stock Report */}
                <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Inventory & Stock</h3>
                      <p className="text-sm text-gray-600 mt-1">Stock levels, turnover, and valuation</p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Essential</span>
                  </div>
                  <ul className="text-sm text-gray-600 mb-4 space-y-2">
                    <li>• Current stock levels</li>
                    <li>• Low stock alerts</li>
                    <li>• Expiry tracking</li>
                    <li>• Storage utilization</li>
                  </ul>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                      Generate
                    </button>
                    <button className="px-3 py-2 text-gray-600 border rounded-md hover:bg-gray-50">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Sales Performance Report */}
                <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Sales Performance</h3>
                      <p className="text-sm text-gray-600 mt-1">Revenue, margins, and top products</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Financial</span>
                  </div>
                  <ul className="text-sm text-gray-600 mb-4 space-y-2">
                    <li>• Revenue breakdown</li>
                    <li>• Profit margins</li>
                    <li>• Product performance</li>
                    <li>• Customer segments</li>
                  </ul>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                      Generate
                    </button>
                    <button className="px-3 py-2 text-gray-600 border rounded-md hover:bg-gray-50">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Procurement Report */}
                <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Procurement</h3>
                      <p className="text-sm text-gray-600 mt-1">Purchase orders and supplier analysis</p>
                    </div>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Operations</span>
                  </div>
                  <ul className="text-sm text-gray-600 mb-4 space-y-2">
                    <li>• Purchase orders</li>
                    <li>• Supplier performance</li>
                    <li>• Cost analysis</li>
                    <li>• Order tracking</li>
                  </ul>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                      Generate
                    </button>
                    <button className="px-3 py-2 text-gray-600 border rounded-md hover:bg-gray-50">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Quality Control Report */}
                <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Quality Control</h3>
                      <p className="text-sm text-gray-600 mt-1">Product quality and compliance</p>
                    </div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Compliance</span>
                  </div>
                  <ul className="text-sm text-gray-600 mb-4 space-y-2">
                    <li>• Quality metrics</li>
                    <li>• Inspection results</li>
                    <li>• Compliance status</li>
                    <li>• Issue tracking</li>
                  </ul>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                      Generate
                    </button>
                    <button className="px-3 py-2 text-gray-600 border rounded-md hover:bg-gray-50">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Logistics Report */}
                <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Logistics</h3>
                      <p className="text-sm text-gray-600 mt-1">Shipping and delivery analytics</p>
                    </div>
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Operations</span>
                  </div>
                  <ul className="text-sm text-gray-600 mb-4 space-y-2">
                    <li>• Delivery performance</li>
                    <li>• Route optimization</li>
                    <li>• Vehicle utilization</li>
                    <li>• Cost per delivery</li>
                  </ul>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                      Generate
                    </button>
                    <button className="px-3 py-2 text-gray-600 border rounded-md hover:bg-gray-50">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Custom Report */}
                <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Custom Report</h3>
                      <p className="text-sm text-gray-600 mt-1">Build your own report</p>
                    </div>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Custom</span>
                  </div>
                  <ul className="text-sm text-gray-600 mb-4 space-y-2">
                    <li>• Select metrics</li>
                    <li>• Choose format</li>
                    <li>• Set schedule</li>
                    <li>• Custom filters</li>
                  </ul>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                      Create
                    </button>
                    <button className="px-3 py-2 text-gray-600 border rounded-md hover:bg-gray-50">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Reports */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Recent Reports</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Report Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Generated</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { name: 'Monthly Inventory Report', date: '2024-02-20 09:45', type: 'Inventory', status: 'Completed' },
                        { name: 'Q1 Sales Analysis', date: '2024-02-19 15:30', type: 'Sales', status: 'Processing' },
                        { name: 'Supplier Performance Review', date: '2024-02-18 11:20', type: 'Procurement', status: 'Completed' },
                        { name: 'Weekly Quality Inspection', date: '2024-02-17 16:15', type: 'Quality', status: 'Failed' },
                      ].map((report, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${report.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                                report.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'}`}>
                              {report.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="text-blue-600 hover:text-blue-800 mr-3">Download</button>
                            <button className="text-gray-600 hover:text-gray-800 mr-3">Share</button>
                            <button className="text-red-600 hover:text-red-800">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      case 'payments':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment Transactions</h2>
            
            {/* Payment Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Transaction Type</label>
                <select className="w-full px-4 py-2 border rounded-md bg-white shadow-sm">
                  <option value="all">All Transactions</option>
                  <option value="received">Received</option>
                  <option value="sent">Sent</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Date Range</label>
                <select className="w-full px-4 py-2 border rounded-md bg-white shadow-sm">
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Amount Range</label>
                <select className="w-full px-4 py-2 border rounded-md bg-white shadow-sm">
                  <option value="all">All Amounts</option>
                  <option value="0-1000">$0 - $1,000</option>
                  <option value="1001-5000">$1,001 - $5,000</option>
                  <option value="5001+">$5,001+</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select className="w-full px-4 py-2 border rounded-md bg-white shadow-sm">
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>

            {/* Transaction Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Total Transactions</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">2,459</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">$124,592</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Pending Amount</h3>
                <p className="text-2xl font-bold text-yellow-600 mt-1">$3,248</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Failed Transactions</h3>
                <p className="text-2xl font-bold text-red-600 mt-1">23</p>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { id: 'TRX-001', date: '2024-02-20', customer: 'John Doe', amount: '$1,200', type: 'Received', status: 'Completed' },
                    { id: 'TRX-002', date: '2024-02-20', customer: 'Jane Smith', amount: '$850', type: 'Sent', status: 'Pending' },
                    { id: 'TRX-003', date: '2024-02-19', customer: 'Bob Johnson', amount: '$2,100', type: 'Received', status: 'Completed' },
                    { id: 'TRX-004', date: '2024-02-19', customer: 'Alice Brown', amount: '$950', type: 'Sent', status: 'Failed' },
                  ].map((transaction, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                            transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                        <button className="text-gray-600 hover:text-gray-800">Receipt</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'analysis':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Market Analysis & Price Predictions</h2>

            {/* Search and Timeline Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Search Crop</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter crop name (e.g., Tomatoes, Apples, Potatoes)"
                    className="w-full px-4 py-2 border rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Prediction Timeline</label>
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
                <h3 className="text-xl font-semibold text-gray-900">Price Prediction</h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  High Confidence
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Current Price</div>
                  <div className="text-2xl font-bold text-gray-900">₹45/kg</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Predicted High</div>
                  <div className="text-2xl font-bold text-green-600">₹52/kg</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Predicted Low</div>
                  <div className="text-2xl font-bold text-red-600">₹41/kg</div>
                </div>
              </div>
            </div>

            {/* Detailed Analysis */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Market Analysis</h3>
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Based on our comprehensive market analysis of tomatoes over the next 14 days, we predict a moderate price increase 
                  due to several key factors. Historical data shows a typical 15-20% price surge during this season, and current 
                  weather conditions in major growing regions remain favorable. Market demand is expected to increase by 25% due to 
                  upcoming festivals and events, while supply chains are operating at 85% efficiency.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Key market indicators suggest a strong likelihood of price appreciation, with wholesale markets showing early signs 
                  of supply constraints. Transportation costs have increased by 8% compared to last month, which may impact final 
                  pricing. Consumer demand patterns indicate a shift towards premium quality produce, potentially driving up average 
                  market prices.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Recommendation: Consider securing inventory within the next 7 days before the anticipated price increase. 
                  Market volatility index is currently low, suggesting a reliable prediction window. Monitor weather forecasts 
                  for potential supply chain disruptions.
                </p>
              </div>
            </div>

            {/* Market Factors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Influencing Factors</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm text-gray-600">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    Favorable weather conditions in growing regions
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                    Increased transportation costs
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    Upcoming festival season demand
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    Limited storage capacity in major markets
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Confidence Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Prediction Accuracy</span>
                      <span className="text-sm font-medium text-gray-900">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Data Quality</span>
                      <span className="text-sm font-medium text-gray-900">88%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Market Coverage</span>
                      <span className="text-sm font-medium text-gray-900">95%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Download Full Analysis
              </button>
              <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                Share Report
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
}
