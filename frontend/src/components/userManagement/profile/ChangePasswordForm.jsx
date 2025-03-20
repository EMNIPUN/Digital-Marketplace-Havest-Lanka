import { useState } from "react";

const ChangePasswordForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            alert("New password and confirm password do not match");
            return;
        }
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
            >
                Change Password
            </button>
        </form>
    );
};

export default ChangePasswordForm;