import React, { useState } from 'react';
import Token from '../../components/userManagement/logins/Token';

// Import banner images
import AdminProfileImg from '../../assets/userManagement/adminProfile.png';
import FarmerProfileImg from '../../assets/userManagement/farmerProfile.png';
import FinanceProfileImg from '../../assets/userManagement/financeProfile.png';
import DeliveryProfileImg from '../../assets/userManagement/deliveryProfile.png';
import ShopProfileImg from '../../assets/userManagement/shopProfile.png';
import DefaultDP from '../../assets/userManagement/defaultDP.png';
import { CopyNotFilled, CopyFilled, Facebook, Google } from '../../components/userManagement/icons/Icons';
import Popup from '../../components/userManagement/shared/Popup';
import UpdateProfileForm from '../../components/userManagement/profile/UpdateProfileForm';
import ChangePasswordForm from '../../components/userManagement/profile/CHangePasswordForm';

const ProfilePage = () => {
    const token = Token();
    const [isCopied, setIsCopied] = useState(false);
    const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);


    // Function to handle copy to clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(token.userId).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
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

    const bannerImage = roleBanners[token.role] || "https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png";

    // Function to handle logout (redirecting to /logout)
    const handleLogout = () => {
        window.location.href = "/logout";
    };

    return (
        <div className="min-h-screen bg-[#ebebeb] flex items-center justify-center p-6">
            <Popup isOpen={isUpdateProfileOpen} onClose={() => setIsUpdateProfileOpen(false)}>
                <UpdateProfileForm />
            </Popup>

            <Popup isOpen={isChangePasswordOpen} onClose={() => setIsChangePasswordOpen(false)}>
                <ChangePasswordForm />
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
                        <h2 className="text-3xl font-bold text-gray-800">{token.name}</h2>
                        <p className="text-lg text-gray-500 capitalize">{token.role}</p>
                    </div>

                    {/* User Info */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center border-b pb-4">
                            <span className="text-gray-600 font-medium">Email:</span>
                            <span className="text-gray-800">{token.email}</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-4">
                            <span className="text-gray-600 font-medium">Phone:</span>
                            <span className="text-gray-800">{token.number}</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-4">
                            <span className="text-gray-600 font-medium">User ID:</span>
                            <div className="flex items-center space-x-2 cursor-pointer" onClick={copyToClipboard}>
                                <span className="text-gray-800">{token.userId}</span>
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
                            <span className={`text-gray-800 ${token.status === 'deactivated' ? 'text-red-500' : 'text-green-500'}`}>
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
                                <button className="w-full py-2 px-4 border rounded-lg bg-red-600 text-white hover:bg-red-700 transition duration-200">
                                    Deactivate Account
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
