import { useState } from "react";

const UpdateProfileForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: "",
        number: "",
        profilePhoto: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, profilePhoto: e.target.files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
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
                    required
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
                    required
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
                className="w-full rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
            >
                Update Profile
            </button>
        </form>
    );
};

export default UpdateProfileForm;