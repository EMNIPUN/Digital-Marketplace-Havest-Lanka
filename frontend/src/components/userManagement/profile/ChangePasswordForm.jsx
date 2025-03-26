import { useState } from "react";
import axios from "axios";
import Token from "../logins/Token";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePasswordForm = () => {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const tokenData = Token();
    const userId = tokenData?.userId;
    const authToken = tokenData?.token;

    // Password Validation Function
    const validatePassword = (password) => {
        const minLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*]/.test(password);

        return minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Real-time Validation
        if (name === "newPassword") {
            if (!validatePassword(value)) {
                setErrors((prev) => ({
                    ...prev,
                    newPassword: "Password must be 8+ chars, include uppercase, lowercase, number & special char.",
                }));
            } else {
                setErrors((prev) => ({ ...prev, newPassword: "" }));
            }
        }

        if (name === "confirmPassword") {
            if (value !== formData.newPassword) {
                setErrors((prev) => ({
                    ...prev,
                    confirmPassword: "Passwords do not match.",
                }));
            } else {
                setErrors((prev) => ({ ...prev, confirmPassword: "" }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (errors.newPassword || errors.confirmPassword) {
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8005/user/change-password",
                {
                    userId: userId,
                    currentPassword: formData.currentPassword,
                    password: formData.newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            // Show success toast on successful password change
            toast.success(response.data.message || "Password changed successfully.");

            setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" }); // Reset form
        } catch (error) {
            if (error.response?.status === 401) {
                toast.error("User not found.");
            } else if (error.response?.status === 402) {
                toast.error("Current password is wrong.");
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
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
                    {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
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
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
                    disabled={loading || errors.newPassword || errors.confirmPassword}
                >
                    {loading ? "Changing..." : "Change Password"}
                </button>
            </form>

            <ToastContainer />
        </>
    );
};

export default ChangePasswordForm;
