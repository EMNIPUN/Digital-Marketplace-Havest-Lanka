import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail, User, Phone, Lock, Image, RefreshCcw, IdCard } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const generatePassword = () => {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    return Array.from({ length: 12 }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");
};

const RegisterForm = (props) => {
    const initialFormState = {
        email: "",
        name: "",
        nic: "", // locally stored as nic, but later mapped to NIC for backend
        number: "",
        password: props.role === "farmer" ? "" : generatePassword(),
        role: props.role || "farmer", // Get role from props
        displayPicture: "",
        status: true, // default boolean value for status (active)
    };

    const [formData, setFormData] = useState(initialFormState);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState("");
    const [submitSuccess, setSubmitSuccess] = useState("");

    const validate = (fieldName, value) => {
        let newErrors = { ...errors };

        if (fieldName === "name") {
            if (!value) newErrors.name = "Name is required";
            else if (!/^[A-Za-z ]+$/.test(value))
                newErrors.name = "Name can only contain letters and spaces";
            else newErrors.name = "";
        }

        if (fieldName === "nic") {
            if (!value) newErrors.nic = "NIC is required";
            else {
                // 9-digit NIC with trailing v/V or 12-digit NIC with numbers only
                const nicPatternOld = /^[0-9]{9}[vV]$/;
                const nicPatternNew = /^[0-9]{12}$/;
                if (!(nicPatternOld.test(value) || nicPatternNew.test(value))) {
                    newErrors.nic =
                        "NIC must be 9 digits plus a trailing 'v' or 12 digits only";
                } else newErrors.nic = "";
            }
        }

        if (fieldName === "email") {
            if (!value) newErrors.email = "Email is required";
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value))
                newErrors.email = "Invalid email format";
            else newErrors.email = "";
        }

        if (fieldName === "number") {
            if (!value) newErrors.number = "Phone number is required";
            else if (!/^\d{9,10}$/.test(value))
                newErrors.number = "Phone number must be 9 or 10 digits";
            else newErrors.number = "";
        }

        if (fieldName === "password") {
            if (!value) newErrors.password = "Password is required";
            else if (props.role === "farmer" && value.length < 8)
                newErrors.password = "Password must be at least 8 characters long";
            else newErrors.password = "";
        }

        setErrors(newErrors);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === "name") {
            // Allow only letters and spaces
            newValue = newValue.replace(/[^A-Za-z ]/g, "");
        }

        if (name === "number") {
            // Allow only digits and limit length to 10
            newValue = newValue.replace(/[^0-9]/g, "");
            if (newValue.length > 10) newValue = newValue.slice(0, 10);
        }

        if (name === "nic") {
            // Allow only digits and letter v/V
            newValue = newValue.replace(/[^0-9vV]/g, "");
            const lowerValue = newValue.toLowerCase();
            const indexOfV = lowerValue.indexOf("v");
            if (indexOfV !== -1 && indexOfV !== newValue.length - 1) {
                // Remove any 'v' not at the end.
                newValue = newValue
                    .split("")
                    .filter((char, i) =>
                        i === newValue.length - 1 || char.toLowerCase() !== "v"
                    )
                    .join("");
            }
            // Enforce maximum length: 10 for NIC with v and 12 for NIC without v
            if (newValue.toLowerCase().endsWith("v")) {
                if (newValue.length > 10) newValue = newValue.slice(0, 10);
            } else {
                if (newValue.length > 12) newValue = newValue.slice(0, 12);
            }
        }

        setFormData({ ...formData, [name]: newValue });
        validate(name, newValue);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setFormData({ ...formData, displayPicture: file });
            // Create a preview URL for debugging purposes
            setPreviewUrl(URL.createObjectURL(file));
            setErrors({ ...errors, displayPicture: "" });
        } else {
            setFormData({ ...formData, displayPicture: "" });
            setPreviewUrl(null);
            setErrors({
                ...errors,
                displayPicture: "Please select a valid image file",
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        validate("name", formData.name);
        validate("email", formData.email);
        validate("number", formData.number);
        validate("password", formData.password);
        validate("nic", formData.nic);

        // Check for validation errors
        const hasErrors = Object.values(errors).some((err) => err !== "");
        if (hasErrors) {
            toast.error("Please fix the errors before submitting.");
            console.error("Validation errors:", errors);
            return;
        }

        // Build FormData to handle file uploads
        const data = new FormData();
        data.append("email", formData.email);
        data.append("name", formData.name);
        // Map NIC to "NIC" to match backend
        data.append("NIC", formData.nic);
        data.append("number", formData.number);
        data.append("password", formData.password);
        data.append("role", props.role || formData.role);
        // status is a Boolean in the backend
        data.append("status", formData.status);
        if (formData.displayPicture) {
            data.append("displayPicture", formData.displayPicture);
        }

        // Debug: log all form data key-value pairs
        console.log("Submitting form data:");
        for (let pair of data.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
        }

        try {
            const response = await axios.post(
                "http://localhost:8005/user/register",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("Response from server:", response.data);
            toast.success("Registration successful!");
            setSubmitSuccess("Registration successful!");
            setSubmitError("");
            // Reset form fields after successful submission
            setFormData(initialFormState);
            setPreviewUrl(null);
            setErrors({});
        } catch (error) {
            console.error("Registration error:", error);
            if (error.response) {
                console.error("Error response data:", error.response.data);
                switch (error.response.status) {
                    case 400:
                        toast.error("Email already exists.");
                        setSubmitError("Email already exists.");
                        break;
                    case 401:
                        toast.error("Number already exists.");
                        setSubmitError("Number already exists.");
                        break;
                    case 402:
                        toast.error("NIC already exists.");
                        setSubmitError("NIC already exists.");
                        break;
                    default:
                        toast.error("Registration failed. Please try again later.");
                        setSubmitError("Registration failed. Please try again later.");
                }
            } else {
                toast.error("Registration failed. Please try again later.");
                setSubmitError("Registration failed. Please try again later.");
            }
            setSubmitSuccess("");
        }
    };

    const inputVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.1, duration: 0.4 },
        }),
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 px-4 p-3">
            {/* Toast notifications container */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full bg-white p-6 shadow-xl rounded-xl"
            >
                <h2 className="text-2xl font-semibold text-center text-gray-800">
                    {props.formName}
                </h2>
                <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                    {[
                        {
                            name: "name",
                            label: "Name",
                            icon: <User size={20} className="text-gray-500" />,
                            type: "text",
                        },
                        {
                            name: "nic",
                            label: "NIC Number",
                            icon: <IdCard size={20} className="text-gray-500" />,
                            type: "text",
                            placeholder: "Enter NIC",
                        },
                        {
                            name: "email",
                            label: "Email",
                            icon: <Mail size={20} className="text-gray-500" />,
                            type: "email",
                        },
                        {
                            name: "number",
                            label: "Phone Number",
                            icon: <Phone size={20} className="text-gray-500" />,
                            type: "tel",
                            prefix: "+94",
                            placeholder: "Enter your phone number",
                        },
                    ].map((field, index) => (
                        <motion.div
                            key={field.name}
                            variants={inputVariants}
                            custom={index}
                            initial="hidden"
                            animate="visible"
                        >
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                {field.label}
                            </label>
                            <div
                                className={`flex items-center border rounded-lg px-3 py-2 border-gray-300 transition-all focus-within:ring-2 focus-within:ring-[#0cb37d]`}
                            >
                                {field.icon}
                                {field.prefix && (
                                    <span className="text-gray-700 border-r pr-2">
                                        {field.prefix}
                                    </span>
                                )}
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                    className="w-full pl-2 focus:outline-none"
                                />
                            </div>
                            {errors[field.name] && (
                                <p className="text-red-500 text-sm">{errors[field.name]}</p>
                            )}
                        </motion.div>
                    ))}

                    {/* Conditional rendering for Password Field */}
                    {props.role !== "farmer" ? (
                        <motion.div
                            variants={inputVariants}
                            custom={4}
                            initial="hidden"
                            animate="visible"
                        >
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="flex items-center border rounded-lg px-3 py-2 border-gray-300">
                                <Lock size={20} className="text-gray-500" />
                                <input
                                    type="text"
                                    name="password"
                                    value={formData.password}
                                    readOnly
                                    className="w-full focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newPass = generatePassword();
                                        setFormData({ ...formData, password: newPass });
                                        validate("password", newPass);
                                    }}
                                >
                                    <RefreshCcw size={18} className="text-gray-600 ml-2" />
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password}</p>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            variants={inputVariants}
                            custom={4}
                            initial="hidden"
                            animate="visible"
                        >
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="flex items-center border rounded-lg px-3 py-2 border-gray-300">
                                <Lock size={20} className="text-gray-500" />
                                <input
                                    type="text"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="w-full focus:outline-none"
                                />
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password}</p>
                            )}
                        </motion.div>
                    )}

                    <motion.div
                        variants={inputVariants}
                        custom={5}
                        initial="hidden"
                        animate="visible"
                    >
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Display Picture
                        </label>
                        <div className="flex flex-col">
                            <div className="flex items-center border rounded-lg px-3 py-2 border-gray-300 relative">
                                <Image size={20} className="text-gray-500" />
                                <label className="w-full text-gray-500 cursor-pointer text-sm">
                                    Choose File
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="displayPicture"
                                    onChange={handleImageChange}
                                    className="absolute opacity-0 w-full h-full cursor-pointer"
                                />
                            </div>
                            {errors.displayPicture && (
                                <p className="text-red-500 text-sm">
                                    {errors.displayPicture}
                                </p>
                            )}
                            {previewUrl && (
                                <div className="mt-2">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="h-32 w-32 object-cover rounded-md border"
                                    />
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {submitError && (
                        <p className="text-red-500 text-sm text-center">{submitError}</p>
                    )}
                    {submitSuccess && (
                        <p className="text-green-500 text-sm text-center">{submitSuccess}</p>
                    )}

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-[#0cb37d] hover:bg-[#1a7b5c] text-white py-2 rounded-lg font-semibold transition duration-300"
                    >
                        Register
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default RegisterForm;
