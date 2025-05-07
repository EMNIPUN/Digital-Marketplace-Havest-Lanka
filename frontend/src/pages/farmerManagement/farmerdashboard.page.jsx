import BindsList from '@/components/farmerManagement/BidsList/BindsList';
import CreatePost from '@/components/farmerManagement/CreatePost/CreatePost';
import Hero from '@/components/farmerManagement/Hero/Hero';
import Navigation from '@/components/farmerManagement/Navigation/Navigation';
import ProfileCard from '@/components/farmerManagement/ProfileCard/ProfileCard';
import VegetablePriceMarqueeWithStyles from '@/components/farmerManagement/VegetablePriceMarquee/VegetablePriceMarquee';
import FooterLandingPage from '@/components/other/FooterLandingPage';
import React from 'react';
import { BarChart3, Calendar, TrendingUp, AlertCircle, Package, Users, Activity, LineChart, ShoppingCart, Bell, Clock } from 'lucide-react';

function FarmerDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>

      {/* Hero Section */}
      <div>
        <Hero />
      </div>

      {/* Vegitable Marquee */}
      <div>
        <VegetablePriceMarqueeWithStyles />
      </div>

      {/* Dashboard Stats */}
      <div className="mt-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stats Cards */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Sales</p>
                <p className="text-2xl font-semibold text-gray-900">Rs.1,25,000</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Bids</p>
                <p className="text-2xl font-semibold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Buyers</p>
                <p className="text-2xl font-semibold text-gray-900">45</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-amber-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-amber-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Growth Rate</p>
                <p className="text-2xl font-semibold text-gray-900">+15%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-2/3 space-y-8">
            {/* Create Post Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Post</h2>
              <CreatePost />
            </div>

            {/* Market Trends Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Market Trends</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <LineChart className="h-5 w-5 text-green-600 mr-3" />
                    <div>
                      <p className="font-medium">Tomato Price Trend</p>
                      <p className="text-sm text-gray-500">Last 7 days</p>
                    </div>
                  </div>
                  <span className="text-green-600 font-medium">↑ 12%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <ShoppingCart className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium">Market Demand</p>
                      <p className="text-sm text-gray-500">Current Season</p>
                    </div>
                  </div>
                  <span className="text-blue-600 font-medium">High</span>
                </div>
              </div>
            </div>

            {/* Bids List Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Bids</h2>
              <BindsList />
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:w-1/3 space-y-8">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <ProfileCard />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-gray-700">View Calendar</span>
                  </div>
                  <span className="text-green-600">→</span>
                </button>

                <button className="w-full flex items-center justify-between p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">Market Alerts</span>
                  </div>
                  <span className="text-blue-600">→</span>
                </button>

                <button className="w-full flex items-center justify-between p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-purple-600 mr-3" />
                    <span className="text-gray-700">Analytics</span>
                  </div>
                  <span className="text-purple-600">→</span>
                </button>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Bell className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New bid received</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Activity className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Post updated</p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Clock className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Schedule reminder</p>
                    <p className="text-xs text-gray-500">Yesterday</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12">
        <FooterLandingPage />
      </div>
    </div>
  );
}

export default FarmerDashboardPage;