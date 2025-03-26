import React from "react";
import { useNavigate } from "react-router-dom";
import { Store, Tractor, Truck, DollarSign, Briefcase } from "lucide-react";

function LoginPortal() {
    const navigate = useNavigate();

    const redirect = (role) => {
        switch (role) {
            case "shopowner":
                navigate("/login/shopowner-login");
                break;
            case "farmer":
                navigate("/login/farmer-login");
                break;
            case "driver":
                navigate("/login/driver-login");
                break;
            case "financemanager":
                navigate("/login/financemanager-login");
                break;
            case "marketmanager":
                navigate("/login/admin-login");
                break;
            default:
                navigate("/not-found");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-xl p-8 w-full max-w-lg">
                <h1 className="text-white text-3xl font-bold text-center mb-6">LOGIN PORTAL</h1>

                <div className="grid grid-cols-2 gap-4">
                    <LoginCard
                        title="Shop Owner"
                        icon={<Store className="text-blue-500 w-8 h-8" />}
                        onClick={() => redirect("shopowner")}
                    />

                    <LoginCard
                        title="Farmer"
                        icon={<Tractor className="text-green-500 w-8 h-8" />}
                        onClick={() => redirect("farmer")}
                    />

                    <LoginCard
                        title="Driver"
                        icon={<Truck className="text-yellow-500 w-8 h-8" />}
                        onClick={() => redirect("driver")}
                    />

                    <LoginCard
                        title="Finance Manager"
                        icon={<DollarSign className="text-purple-500 w-8 h-8" />}
                        onClick={() => redirect("financemanager")}
                    />

                    <LoginCard
                        title="Market Manager"
                        icon={<Briefcase className="text-red-500 w-8 h-8" />}
                        onClick={() => redirect("marketmanager")}
                        extraClass="col-span-2"
                    />
                </div>
            </div>
        </div>
    );
}

function LoginCard({ title, icon, onClick, extraClass = "" }) {
    return (
        <button
            className={`flex flex-col items-center justify-center p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 text-white ${extraClass}`}
            onClick={onClick}
        >
            {icon}
            <span className="mt-2 font-semibold">{title}</span>
        </button>
    );
}

export default LoginPortal;
