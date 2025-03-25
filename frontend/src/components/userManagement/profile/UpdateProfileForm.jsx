import { useState } from "react";
import axios from "axios";
import Token from "../logins/Token";

const UpdateProfileForm = ({ userId, token }) => {
    const [formData, setFormData] = useState({
        name: "",
        number: "",
        profilePhoto: null,
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, profilePhoto: e.target.files[0] }));
    };

    const { userId: tokenUserId } = Token();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const formDataToSend = new FormData();
        formDataToSend.append("userId", tokenUserId);
        formDataToSend.append("name", formData.name);
        formDataToSend.append("number", formData.number);
        formDataToSend.append("displayPicture", formData.profilePhoto);
        if (formData.profilePhoto) {
            formDataToSend.append("profilePhoto", formData.profilePhoto);
        }

        try {
            const response = await axios.put(
                "http://localhost:5000/user/update",
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                }
            );

            setMessage(response.data.message || "Profile updated successfully!");
        } catch (error) {
            setMessage(error.response?.data?.error || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
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
            {message && <p className="text-center text-sm mt-2">{message}</p>}
        </form>
    );
};

export default UpdateProfileForm;
