import React from "react";
import { UserPlus, Truck, DollarSign, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

function AdminDashboardRegistrationPage() {
    return (
        <div className="bg-gray-100 flex flex-col items-center justify-center p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                User Registration
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-4xl">
                {/* Shop Owner Registration */}
                <RegistrationCard
                    title="Shop Owner Registration"
                    description="Register new shop owners to manage their businesses."
                    link="/admin/user-registration/shop-owner"
                    icon={<UserPlus className="w-8 h-8 text-blue-600" />}
                />

                {/* Driver Registration */}
                <RegistrationCard
                    title="Driver Registration"
                    description="Register drivers to handle product deliveries."
                    link="/admin/user-registration/driver"
                    icon={<Truck className="w-8 h-8 text-green-600" />}
                />

                {/* Finance Manager Registration */}
                <RegistrationCard
                    title="Finance Manager Registration"
                    description="Register finance managers for transactions and reports."
                    link="/admin/user-registration/finance-manager"
                    icon={<DollarSign className="w-8 h-8 text-yellow-600" />}
                />

                {/* Market Manager Registration */}
                <RegistrationCard
                    title="Market Manager Registration"
                    description="Register market managers to oversee sales strategies."
                    link="/admin/user-registration/market-manager"
                    icon={<Briefcase className="w-8 h-8 text-red-600" />}
                />
            </div>
        </div>
    );
}

function RegistrationCard({ title, description, icon, link }) {
    return (
        <Link to={link}>
            <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="p-3 bg-gray-200 rounded-full">{icon}</div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                    <p className="text-gray-600 text-sm">{description}</p>
                </div>
            </div>
        </Link>
    );
}

export default AdminDashboardRegistrationPage;
