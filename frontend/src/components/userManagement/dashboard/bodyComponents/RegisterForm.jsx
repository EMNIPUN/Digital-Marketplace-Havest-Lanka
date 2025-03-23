import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, User, Phone, Lock, Image, RefreshCcw, IdCard } from "lucide-react";

const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    return Array.from({ length: 12 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
};

const RegisterForm = (props) => {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        nic: "",
        number: "",
        password: generatePassword(),
        role: "farmer",
        displayPicture: "",
    });

    const [errors, setErrors] = useState({});

    const validate = (name, value) => {
        let newErrors = { ...errors };
        if (name === "email") newErrors.email = value.includes("@") ? "" : "Invalid email format";
        if (name === "number") newErrors.number = /^\d{9,10}$/.test(value) ? "" : "Phone number must be 9 or 10 digits";
        if (name === "nic") {
            const nicPatternOld = /^[0-9]{9}V$/i;
            const nicPatternNew = /^[0-9]{12}$/;
            newErrors.nic = nicPatternOld.test(value) || nicPatternNew.test(value) ? "" : "Invalid NIC format";
        }
        setErrors(newErrors);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validate(name, value);
    };

    const inputVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.1, duration: 0.4 } }),
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 px-4 p-3">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full bg-white p-6 shadow-xl rounded-xl"
            >
                <h2 className="text-2xl font-semibold text-center text-gray-800">{props.formName}</h2>
                <form className="mt-6 space-y-5">
                    {[
                        { name: "name", label: "Name", icon: <User size={20} className="text-gray-500" />, type: "text" },
                        { name: "nic", label: "NIC Number", icon: <IdCard size={20} className="text-gray-500" />, type: "text", placeholder: "Enter NIC" },
                        { name: "email", label: "Email", icon: <Mail size={20} className="text-gray-500" />, type: "email" },
                        { name: "number", label: "Phone Number", icon: <Phone size={20} className="text-gray-500" />, type: "tel", prefix: "+94", placeholder: "Enter your phone number" },
                    ].map((field, index) => (
                        <motion.div key={field.name} variants={inputVariants} custom={index} initial="hidden" animate="visible">
                            <label className="mb-1 block text-sm font-medium text-gray-700">{field.label}</label>
                            <div className={`flex items-center border rounded-lg px-3 py-2 border-gray-300 transition-all focus-within:ring-2 focus-within:ring-[#0cb37d]`}>
                                {field.icon}
                                {field.prefix && <span className="text-gray-700 border-r pr-2">{field.prefix}</span>}
                                <input type={field.type} name={field.name} value={formData[field.name]} onChange={handleChange} placeholder={field.placeholder} className="w-full pl-2 focus:outline-none" />
                            </div>
                            {errors[field.name] && <p className="text-red-500 text-sm">{errors[field.name]}</p>}
                        </motion.div>
                    ))}

                    <motion.div variants={inputVariants} custom={4} initial="hidden" animate="visible">
                        <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
                        <div className="flex items-center border rounded-lg px-3 py-2 border-gray-300">
                            <Lock size={20} className="text-gray-500" />
                            <input type="text" name="password" value={formData.password} readOnly className="w-full focus:outline-none" />
                            <button type="button" onClick={() => setFormData({ ...formData, password: generatePassword() })}>
                                <RefreshCcw size={18} className="text-gray-600 ml-2" />
                            </button>
                        </div>
                    </motion.div>

                    <motion.div variants={inputVariants} custom={5} initial="hidden" animate="visible">
                        <label className="mb-1 block text-sm font-medium text-gray-700">Display Picture</label>
                        <div className="flex items-center border rounded-lg px-3 py-2 border-gray-300 relative">
                            <Image size={20} className="text-gray-500" />
                            <label className="w-full text-gray-500 cursor-pointer text-sm">Choose File</label>
                            <input type="file" name="displayPicture" onChange={(e) => setFormData({ ...formData, displayPicture: e.target.files[0] })} className="absolute opacity-0 w-full h-full cursor-pointer" />
                        </div>
                    </motion.div>

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
