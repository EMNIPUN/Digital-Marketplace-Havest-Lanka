import React, { useEffect, useState } from 'react';
import Token from '../../components/userManagement/logins/Token';
import Popup from '../../components/userManagement/shared/Popup';
import UpdateProfileForm from '../../components/userManagement/profile/UpdateProfileForm';
import ChangePasswordForm from '../../components/userManagement/profile/CHangePasswordForm';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Import banner images
import AdminProfileImg from '../../assets/userManagement/adminProfile.png';
import FarmerProfileImg from '../../assets/userManagement/farmerProfile.png';
import FinanceProfileImg from '../../assets/userManagement/financeProfile.png';
import DeliveryProfileImg from '../../assets/userManagement/deliveryProfile.png';
import ShopProfileImg from '../../assets/userManagement/shopProfile.png';
import DefaultDP from '../../assets/userManagement/defaultDP.png';
import { CopyNotFilled, CopyFilled, Facebook, Google } from '../../components/userManagement/icons/Icons';

const ProfilePage = () => {
    const token = Token();
    const [isCopied, setIsCopied] = useState(false);
    const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const { id } = useParams();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8005/user/find/${id}`);
                setUserData(response.data.user);
            } catch (e) {
                console.log(`Error fetching user data: ${e.message}`);
            }
        };

        fetchUser();
        const interval = setInterval(fetchUser, 2000)
        return () => clearInterval(interval);
    }, [id]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(userData.userId).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    // Map roles to banners
    const roleBanners = {
        "marketmanager": AdminProfileImg,
        "farmer": FarmerProfileImg,
        "finance manager": FinanceProfileImg,
        "driver": DeliveryProfileImg,
        "shopowner": ShopProfileImg
    };

    const roleReturn = () => {
        switch (userData.role) {
            case "marketmanager":
                return "Market Manager";
            case "farmer":
                return "Farmer";
            case "shopowner":
                return "Shop Owner";
            case "driver":
                return "Driver";
            case "financemanager":
                return "Finance Manager";
            default:
                return "Unknown Role";
        }
    };

    const bannerImage = roleBanners[token.role] || "https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png";

    const handleLogout = () => {
        window.location.href = "/logout";
    };

    const confirmDeleteAccount = async () => {
        try {
            await axios.delete('http://localhost:8005/user/del', {
                data: { userId: token.userId }
            });
            alert("Account deleted successfully");
            setIsDeletePopupOpen(false);
            window.location.href = "/logout";
        } catch (error) {
            alert(`Error deleting account: ${error.response?.data?.message || error.message}`);
        }
    };

    console.log(userData);


    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f4f4f4] to-[#e0e0e0] flex items-center justify-center p-6">
            {/* Popups */}
            <Popup isOpen={isUpdateProfileOpen} onClose={() => setIsUpdateProfileOpen(false)}>
                <UpdateProfileForm />
            </Popup>
            <Popup isOpen={isChangePasswordOpen} onClose={() => setIsChangePasswordOpen(false)}>
                <ChangePasswordForm />
            </Popup>
            <Popup isOpen={isDeletePopupOpen} onClose={() => setIsDeletePopupOpen(false)}>
                <div className="p-8 bg-white rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Confirm Account Deletion</h2>
                    <p className="mb-6 text-gray-600">Are you sure you want to delete your account? This action cannot be undone.</p>
                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={() => setIsDeletePopupOpen(false)}
                            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmDeleteAccount}
                            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Popup>

            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Profile Banner */}
                <div className="relative">
                    <div className="h-64 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                        <img
                            className="absolute inset-0 w-full h-full object-cover opacity-30"
                            src={bannerImage}
                            alt={`${token.role} Banner`}
                        />
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
                        <div className="p-1 bg-white rounded-full">
                            <img
                                className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
                                src={`http://localhost:8005${userData.diplayPicture}` || DefaultDP}
                                alt="Profile"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-24 pb-10 px-10">
                    {/* User Name and Role */}
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-800 mb-2">{userData.name}</h2>
                        <p className="text-xl text-gray-500 capitalize">{roleReturn()}</p>
                    </div>

                    {/* User Information Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Profile Details */}
                        <div className="bg-gray-50 p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Profile Details</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-medium">Email</span>
                                    <span className="text-gray-800 font-semibold">{userData.email}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-medium">Phone</span>
                                    <span className="text-gray-800 font-semibold">{userData.number}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-medium">User ID</span>
                                    <div className="flex items-center space-x-2 cursor-pointer" onClick={copyToClipboard}>
                                        <span className="text-gray-800 font-semibold">{userData.userId}</span>
                                        {isCopied ? (
                                            <CopyFilled className="h-5 w-5 text-green-500" />
                                        ) : (
                                            <CopyNotFilled className="h-5 w-5 text-gray-500" />
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-medium">Account Status</span>
                                    <span className={`font-semibold ${userData.status === 'deactivated' ? 'text-red-500' : 'text-green-500'}`}>
                                        {userData.status || "Active"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Account Settings */}
                        <div className="space-y-6">
                            {/* Profile Settings */}
                            <div className="bg-blue-50 p-6 rounded-xl shadow-md">
                                <h3 className="text-xl font-semibold text-blue-800 mb-4">Profile Settings</h3>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => setIsUpdateProfileOpen(true)}
                                        className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center space-x-2"
                                    >
                                        <span>Update Profile</span>
                                    </button>
                                </div>
                            </div>

                            {/* Security Settings */}
                            <div className="bg-green-50 p-6 rounded-xl shadow-md">
                                <h3 className="text-xl font-semibold text-green-800 mb-4">Security</h3>
                                <div className="space-y-4">
                                    <button
                                        onClick={() => setIsChangePasswordOpen(true)}
                                        className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                                    >
                                        Change Password
                                    </button>
                                    <button
                                        className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                                    >
                                        Enable Two-Factor Authentication
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Connected Accounts */}
                    <div className="mt-8 bg-gray-50 p-6 rounded-xl shadow-md">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Connected Accounts</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
                                <div className="bg-blue-100 p-3 rounded-full mr-4">
                                    <Google className="w-8 h-8 text-blue-600" />
                                </div>
                                <div className="flex-grow">
                                    <h4 className="font-semibold text-gray-800">Google Account</h4>
                                    <p className="text-sm text-gray-500">Connect for easy login</p>
                                </div>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                                    Connect
                                </button>
                            </div>
                            <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
                                <div className="bg-blue-100 p-3 rounded-full mr-4">
                                    <Facebook className="w-8 h-8 text-blue-600" />
                                </div>
                                <div className="flex-grow">
                                    <h4 className="font-semibold text-gray-800">Facebook Account</h4>
                                    <p className="text-sm text-gray-500">Stay connected</p>
                                </div>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                                    Connect
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Account Actions */}
                    <div className="mt-8 grid grid-cols-2 gap-6">
                        {token.status !== 'deactivated' && (
                            <button
                                onClick={() => setIsDeletePopupOpen(true)}
                                className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                            >
                                Delete Account
                            </button>
                        )}
                        <button
                            className="w-full py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition duration-300"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;