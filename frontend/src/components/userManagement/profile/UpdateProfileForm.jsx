import { useState } from "react";
import axios from "axios";
import Token from "../logins/Token";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import CSS for toast notifications

const UpdateProfileForm = ({ userId, token }) => {
    const [formData, setFormData] = useState({
        name: "",
        number: "",
        profilePhoto: null,
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({ name: "", number: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        let errorMessage = "";

        if (name === "name") {
            if (!/^[A-Za-z\s]*$/.test(value)) {
                errorMessage = "Name cannot contain numbers or special characters.";
            }
        } else if (name === "number") {
            if (!/^\d{9,10}$/.test(value)) {
                errorMessage = "Number must be 9 or 10 digits long and contain only numbers.";
            }
        }

        setErrors((prev) => ({ ...prev, [name]: errorMessage }));
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, profilePhoto: e.target.files[0] }));
    };

    const { userId: tokenUserId } = Token();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prevent submission if there are validation errors
        if (errors.name || errors.number) return;

        setLoading(true);
        setMessage("");

        const formDataToSend = new FormData();
        formDataToSend.append("userId", tokenUserId);
        formDataToSend.append("name", formData.name);
        formDataToSend.append("number", formData.number);
        if (formData.profilePhoto) {
            formDataToSend.append("displayPicture", formData.profilePhoto);
        }

        try {
            const response = await axios.put(
                "http://localhost:8005/user/update",
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            // Show success toast message
            toast.success(response.data.message || "Profile updated successfully!");
        } catch (error) {
            // Show error toast message based on error response
            toast.error(error.response?.data?.error || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Number</label>
                    <input
                        type="text"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {loading ? "Updating..." : "Update Profile"}
                </button>
            </form>

            {/* ToastContainer is where the notifications will appear */}
            <ToastContainer />
        </>
    );
};

export default UpdateProfileForm;
