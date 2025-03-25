import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import Danger from '../../../../assets/userManagement/danger.jpg';
import CoverPhoto from '../../../../assets/userManagement/coverPhoto.jpg';

function AccountsTable() {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccounts, setSelectedAccounts] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [accountStatuses, setAccountStatuses] = useState({});
    const [loading, setLoading] = useState(true);

    // States for filtering
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectedRole, setSelectedRole] = useState('all');

    // Function to fetch filtered accounts
    const fetchAccounts = () => {
        setLoading(true);
        axios.get("http://localhost:8005/user/q", {
            params: {
                search: searchTerm,
                status: selectedStatus,
                role: selectedRole
            }
        })
            .then(response => {
                const fetchedAccounts = response.data.users.map(account => ({
                    id: account._id,
                    name: account.name,
                    email: account.email,
                    phone: account.number,
                    role: account.role,
                    nic: account.NIC || "N/A",
                    image: `http://localhost:8005${account.displayPicture}` || "https://via.placeholder.com/40",
                    cover: account.cover || "https://via.placeholder.com/400",
                    status: (account.status === undefined || account.status === true) ? "Active" : "Deactivated"
                }));
                setAccounts(fetchedAccounts);
                setAccountStatuses(
                    fetchedAccounts.reduce((acc, account) => {
                        acc[account.id] = account.status;
                        return acc;
                    }, {})
                );
            })
            .catch(error => console.error("Error fetching accounts:", error))
            .finally(() => setLoading(false));
    };

    // Call fetchAccounts when filters change
    useEffect(() => {
        fetchAccounts();
    }, [searchTerm, selectedStatus, selectedRole]);

    // Check if all selected accounts are deactivated
    const areSelectedDeactivated = selectedAccounts.length > 0 && selectedAccounts.every(
        id => accountStatuses[id] === "Deactivated"
    );

    const handleSelect = (id) => {
        setSelectedAccounts(prev =>
            prev.includes(id) ? prev.filter(accountId => accountId !== id) : [...prev, id]
        );
    };

    const handleSeeMore = (user) => {
        setSelectedUser(user);
        setShowPopup(true);
    };

    // Updated deactivation/reactivation logic remains unchanged
    const confirmToggleStatus = () => {
        let userIds = [];
        let newStatus;
        if (selectedUser) {
            userIds = [selectedUser.id];
            newStatus = accountStatuses[selectedUser.id] === "Deactivated" ? true : false;
        } else {
            userIds = selectedAccounts;
            newStatus = areSelectedDeactivated ? true : false;
        }
        const endpoint = newStatus
            ? "http://localhost:8005/api/admin/reactivate"
            : "http://localhost:8005/api/admin/deactivate";
        axios.post(endpoint, { userIds, status: newStatus })
            .then(response => {
                setAccountStatuses(prev => {
                    const updated = { ...prev };
                    userIds.forEach(id => {
                        updated[id] = newStatus ? "Active" : "Deactivated";
                    });
                    return updated;
                });
            })
            .catch(error => console.error("Error updating user status:", error))
            .finally(() => {
                setSelectedAccounts([]);
                setShowConfirmPopup(false);
                setShowPopup(false);
            });
    };

    return (
        <div className="p-4 -mt-[30px] rounded-lg relative">
            <div>
                <input
                    className="rounded-md text-sm focus:ring-2 focus:ring-green-300 focus:outline-none p-2 w-[600px] absolute top-2 left-0"
                    type="search"
                    placeholder="Type Something..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    onClick={() => {
                        setSelectedUser(null);
                        setShowConfirmPopup(true);
                    }}
                    className={`absolute top-2 right-2 px-4 py-2 rounded hover:opacity-80 ${areSelectedDeactivated ? "bg-green-500" : "bg-red-500"} text-white`}
                >
                    {areSelectedDeactivated ? "Activate Selected" : "Deactivate Selected"}
                </button>
            </div>

            {/* Added Filter Options */}
            <div className="flex space-x-4 mt-16 mb-4">
                <div>
                    <label className="block text-sm font-medium">Status</label>
                    <select
                        className="rounded-md p-2 border"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        <option>All</option>
                        <option>Active</option>
                        <option>Deactivated</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Role</label>
                    <select
                        className="rounded-md p-2 border"
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="marketmanager">Market Manager</option>
                        <option value="farmer">Farmer</option>
                        <option value="shopowner">Shop Owner</option>
                        <option value="financemanager">Finance Manager</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto mt-10 rounded-lg">
                {loading ? (
                    <p className="text-center text-gray-600">Loading accounts...</p>
                ) : (
                    <table className="w-full border-collapse bg-white text-sm rounded-lg overflow-hidden">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2 text-left">Select</th>
                                <th className="px-4 py-2 text-left">Display Picture</th>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map((account, index) => (
                                <motion.tr
                                    key={account.id}
                                    className="border-b"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.3 }}
                                >
                                    <td className="px-4 py-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedAccounts.includes(account.id)}
                                            onChange={() => handleSelect(account.id)}
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <img src={account.image} alt={account.name} className="w-10 h-10 rounded-full" />
                                    </td>
                                    <td className="px-4 py-2">{account.name}</td>
                                    <td className="px-4 py-2">{account.email}</td>
                                    <td className="px-4 py-2 font-semibold" style={{ color: accountStatuses[account.id] === "Deactivated" ? "red" : "green" }}>
                                        {accountStatuses[account.id]}
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleSeeMore(account)}
                                            className="p-2 w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            See More
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {showPopup && selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col items-center w-[350px] relative"
                    >
                        <div className="w-full h-[100px] bg-gray-300 rounded-t-lg relative">
                            <img
                                src={CoverPhoto}
                                alt="Cover"
                                className="w-full h-full object-cover rounded-t-lg"
                            />
                            <img
                                src={selectedUser.image}
                                className="w-24 h-24 bg-[#ffffff5f] rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 bottom-[-30px]"
                            />
                        </div>
                        <div className="mt-10">
                            <h2 className="text-xl font-semibold">{selectedUser.name}</h2>
                            <table className="mt-2">
                                <tr>
                                    <td className="text-gray-600 text-left font-semibold p-1">Email</td>
                                    <td className="text-gray-600 text-left p-1">{selectedUser.email}</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 text-left font-semibold p-1">Role</td>
                                    <td className="text-gray-600 text-left p-1">{selectedUser.role}</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 text-left font-semibold p-1">Phone</td>
                                    <td className="text-gray-600 text-left p-1">{selectedUser.phone}</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 text-left font-semibold p-1">NIC</td>
                                    <td className="text-gray-600 text-left p-1">{selectedUser.nic}</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 text-left font-semibold p-1">Status</td>
                                    <td className="text-gray-600 text-left p-1">{accountStatuses[selectedUser.id]}</td>
                                </tr>
                            </table>
                        </div>
                        <div className="mt-4 flex gap-2 w-full items-center justify-evenly">
                            <button
                                onClick={() => setShowConfirmPopup(true)}
                                className={`px-4 py-2 w-[100px] rounded hover:opacity-80 text-white ${accountStatuses[selectedUser.id] === "Deactivated" ? "bg-green-500" : "bg-red-500"}`}
                            >
                                {accountStatuses[selectedUser.id] === "Deactivated" ? "Activate" : "Deactivate"}
                            </button>
                            <button
                                onClick={() => setShowPopup(false)}
                                className="px-4 py-2 w-[100px] bg-slate-500 text-white rounded hover:bg-slate-600"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {showConfirmPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center w-[350px]">
                        <p className="text-3xl font-semibold text-center w-[400px]">
                            Are you sure you want to{" "}
                            {selectedUser
                                ? (accountStatuses[selectedUser.id] === "Deactivated" ? "activate" : "deactivate")
                                : (areSelectedDeactivated ? "activate" : "deactivate")
                            }?
                        </p>
                        <img src={Danger} alt="Danger" className="w-[150px] h-[150px]" />
                        <div className="mt-4 flex justify-evenly gap-2 w-full">
                            <button onClick={() => setShowConfirmPopup(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 w-[100px]">
                                Cancel
                            </button>
                            <button onClick={confirmToggleStatus} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-[100px]">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AccountsTable;
