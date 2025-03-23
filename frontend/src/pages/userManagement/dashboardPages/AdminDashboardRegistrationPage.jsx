import React from "react";
import { motion } from "framer-motion";
import { UserPlus, Truck, DollarSign, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const registrations = [
    { id: 1, title: "Shop Owner Registration", description: "Register new shop owners to manage their businesses.", link: "/admin/user-registration/shop-owner", icon: <UserPlus className="w-8 h-8 text-blue-600" />, bgColor: "bg-blue-100" },
    { id: 2, title: "Driver Registration", description: "Register drivers to handle product deliveries.", link: "/admin/user-registration/driver", icon: <Truck className="w-8 h-8 text-green-600" />, bgColor: "bg-green-100" },
    { id: 3, title: "Finance Manager Registration", description: "Register finance managers for transactions and reports.", link: "/admin/user-registration/finance-manager", icon: <DollarSign className="w-8 h-8 text-yellow-600" />, bgColor: "bg-yellow-100" },
    { id: 4, title: "Market Manager Registration", description: "Register market managers to oversee sales strategies.", link: "/admin/user-registration/market-manager", icon: <Briefcase className="w-8 h-8 text-red-600" />, bgColor: "bg-red-100" },
];

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
};

function AdminDashboardRegistrationPage() {
    return (
        <div className="bg-gray-100 flex flex-col items-center justify-center p-6">
            <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                User Registration
            </motion.h1>

            <motion.div initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                {registrations.map(({ id, title, description, icon, link, bgColor }, index) => (
                    <RegistrationCard key={id} index={index} title={title} description={description} icon={icon} link={link} bgColor={bgColor} />
                ))}
            </motion.div>
        </div>
    );
}

function RegistrationCard({ title, description, icon, link, index, bgColor }) {
    return (
        <Link to={link}>
            <motion.div
                variants={cardVariants}
                custom={index}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
                <div className={`p-3 ${bgColor} rounded-full`}>{icon}</div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                    <p className="text-gray-600 text-sm">{description}</p>
                </div>
            </motion.div>
        </Link>
    );
}

export default AdminDashboardRegistrationPage;
