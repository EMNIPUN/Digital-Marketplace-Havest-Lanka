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
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false); // New state for delete account popup
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

    // Function to handle logout (redirecting to /logout)
    const handleLogout = () => {
        window.location.href = "/logout";
    };

    // Function to handle account deletion confirmation
    const confirmDeleteAccount = async () => {
        try {
            await axios.delete('http://localhost:8005/user/del', {
                data: { userId: token.userId }
            });
            alert("Account deleted successfully");
            setIsDeletePopupOpen(false);
            window.location.href = "/logout"; // or redirect to a landing page after deletion
        } catch (error) {
            alert(`Error deleting account: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="min-h-screen bg-[#ebebeb] flex items-center justify-center p-6">
            <Popup isOpen={isUpdateProfileOpen} onClose={() => setIsUpdateProfileOpen(false)}>
                <UpdateProfileForm />
            </Popup>

            <Popup isOpen={isChangePasswordOpen} onClose={() => setIsChangePasswordOpen(false)}>
                <ChangePasswordForm />
            </Popup>

            {/* Delete Account Confirmation Popup */}
            <Popup isOpen={isDeletePopupOpen} onClose={() => setIsDeletePopupOpen(false)}>
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Confirm Account Deletion</h2>
                    <p className="mb-4">Are you sure you want to delete your account? This action cannot be undone.</p>
                    <div className="flex justify-end space-x-4">
                        <button onClick={() => setIsDeletePopupOpen(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg">
                            Cancel
                        </button>
                        <button onClick={confirmDeleteAccount} className="px-4 py-2 bg-red-600 text-white rounded-lg">
                            Delete
                        </button>
                    </div>
                </div>
            </Popup>

            <div className="w-full max-w-4xl bg-[#ffffff] backdrop-blur-lg rounded-xl shadow-xl overflow-hidden">
                {/* Profile Banner */}
                <div className="relative">
                    <img
                        className="w-full h-48 object-cover"
                        src={bannerImage}
                        alt={`${token.role} Banner`}
                    />
                    <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
                        <img
                            className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-[#e6e6e6]"
                            src={token.displayPicture || DefaultDP}
                            alt="Profile"
                        />
                    </div>
                </div>

                <div className="pt-24 pb-8 px-8">
                    {/* User Name and Role */}
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-800">{userData.name}</h2>
                        <p className="text-lg text-gray-500 capitalize">{roleReturn()}</p>
                    </div>

                    {/* User Info */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center border-b pb-4">
                            <span className="text-gray-600 font-medium">Email:</span>
                            <span className="text-gray-800">{userData.email}</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-4">
                            <span className="text-gray-600 font-medium">Phone:</span>
                            <span className="text-gray-800">{userData.number}</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-4">
                            <span className="text-gray-600 font-medium">User ID:</span>
                            <div className="flex items-center space-x-2 cursor-pointer" onClick={copyToClipboard}>
                                <span className="text-gray-800">{userData.userId}</span>
                                <button
                                    className="text-gray-500 hover:text-gray-700"
                                    aria-label="Copy User ID"
                                >
                                    {isCopied ? (
                                        <CopyFilled className="h-5 w-5 text-green-500" />
                                    ) : (
                                        <CopyNotFilled className="h-5 w-5 text-gray-500" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center border-b pb-4">
                            <span className="text-gray-600 font-medium">Account Status:</span>
                            <span className={`text-gray-800 ${userData.status === 'deactivated' ? 'text-red-500' : 'text-green-500'}`}>
                                {token.status || "Active"}
                            </span>
                        </div>
                    </div>

                    {/* Connected Accounts */}
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Connected Accounts</h3>
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center space-x-4 p-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-200">
                                <div className="flex items-center justify-center p-2 bg-[#bbd0ff] text-white rounded-full">
                                    <Google />
                                </div>
                                <div className="flex-grow">
                                    <span className="text-gray-800 font-medium">Google Account</span>
                                    <p className="text-gray-500 text-sm">Connect your Google account for easy login and syncing.</p>
                                </div>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
                                    Connect
                                </button>
                            </div>

                            <div className="flex items-center space-x-4 p-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-200">
                                <div className="flex items-center justify-center p-2 bg-[#bbd0ff] text-white rounded-full">
                                    <Facebook />
                                </div>
                                <div className="flex-grow">
                                    <span className="text-gray-800 font-medium">Facebook Account</span>
                                    <p className="text-gray-500 text-sm">Connect your Facebook account to stay connected with your network.</p>
                                </div>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
                                    Connect
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Profile Settings and Security Settings */}
                    <div className="flex space-x-6 mt-8">
                        {/* Profile Settings */}
                        <div className="flex-1 p-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-200">
                            <h3 className="text-lg font-semibold text-gray-800">Profile Settings</h3>
                            <button onClick={() => setIsUpdateProfileOpen(true)} className="w-full py-2 px-4 mt-4 border rounded-lg bg-green-600 text-white hover:bg-green-700 transition duration-200">
                                Update Profile
                            </button>
                        </div>

                        {/* Security Settings */}
                        <div className="flex-1 p-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-200">
                            <h3 className="text-lg font-semibold text-gray-800">Security Settings</h3>
                            <div className="mt-4 flex space-x-4">
                                <button onClick={() => setIsChangePasswordOpen(true)} className="w-full py-2 px-4 border rounded-lg bg-yellow-600 text-white hover:bg-yellow-700 transition duration-200">
                                    Change Password
                                </button>
                                <button className="w-full py-2 px-4 border rounded-lg bg-yellow-600 text-white hover:bg-yellow-700 transition duration-200">
                                    Enable 2FA
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Account Deactivation */}
                    {token.status !== 'deactivated' && (
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-800">Account Deactivation</h3>
                            <div className="mt-2">
                                <button onClick={() => setIsDeletePopupOpen(true)} className="w-full py-2 px-4 border rounded-lg bg-red-600 text-white hover:bg-red-700 transition duration-200">
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Logout Option */}
                    <div className="mt-8 text-center">
                        <button
                            className="w-full py-2 px-4 border rounded-lg bg-red-600 text-white hover:bg-red-700 transition duration-200"
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
