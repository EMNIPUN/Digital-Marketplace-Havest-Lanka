import React, { useState } from "react";
import { Mail, User, Phone, Lock, Image, RefreshCcw, IdCard } from "lucide-react";

const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
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

        if (name === "email") {
            newErrors.email = value.includes("@") ? "" : "Invalid email format";
        }

        if (name === "number") {
            newErrors.number = value.length >= 9 && value.length <= 10 && !isNaN(value) ? "" : "Phone number must be 9 or 10 digits";
        }

        if (name === "nic") {
            const nicPatternOld = /^[0-9]{9}V$/i;
            const nicPatternNew = /^[0-9]{12}$/;
            newErrors.nic = nicPatternOld.test(value) || nicPatternNew.test(value) ? "" : "NIC must be either 9 digits followed by 'V' or 12 digits";
        }

        setErrors(newErrors);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validate(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(errors).every((error) => error === "")) {
            console.log("Form Submitted", formData);
        }
    };

    const getInputBorderClass = (name) => {
        if (!formData[name]) return "border-gray-300";
        return errors[name] ? "border-red-500" : "border-green-500";
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 px-4 p-3">
            <div className="w-full bg-white p-6 shadow-xl rounded-xl">
                <h2 className="text-2xl font-semibold text-center text-gray-800">{props.formName}</h2>
                <form onSubmit={handleSubmit} className="mt-6 space-y-5" autoComplete="off">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
                            <div className={`flex items-center border rounded-lg px-3 py-2 ${getInputBorderClass("name")}`}>
                                <User className="text-gray-500 border-r pr-2 mr-2" size={20} />
                                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full focus:outline-none" />
                            </div>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">NIC Number</label>
                            <div className={`flex items-center border rounded-lg px-3 py-2 ${getInputBorderClass("nic")}`}>
                                <IdCard className="text-gray-500 border-r pr-2 mr-2" size={20} />
                                <input type="text" name="nic" value={formData.nic} onChange={handleChange} className="w-full focus:outline-none" placeholder="Enter NIC" />
                            </div>
                            {errors.nic && <p className="text-red-500 text-sm">{errors.nic}</p>}
                        </div>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                        <div className={`flex items-center border rounded-lg px-3 py-2 ${getInputBorderClass("email")}`}>
                            <Mail className="text-gray-500 border-r pr-2 mr-2" size={20} />
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full focus:outline-none" />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Phone Number</label>
                        <div className={`flex items-center border rounded-lg px-3 py-2 ${getInputBorderClass("number")}`}>
                            <Phone className="text-gray-500 border-r pr-2 mr-2" size={20} />
                            <span className="text-gray-700 border-r pr-2">+94</span>
                            <input type="tel" name="number" value={formData.number} onChange={handleChange} className="w-full pl-2 focus:outline-none" placeholder="Enter your phone number" />
                        </div>
                        {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
                        <div className="flex items-center border rounded-lg px-3 py-2 border-gray-300">
                            <Lock className="text-gray-500 border-r pr-2 mr-2" size={20} />
                            <input type="text" name="password" value={formData.password} readOnly className="w-full focus:outline-none" />
                            <button type="button" onClick={() => setFormData({ ...formData, password: generatePassword() })}>
                                <RefreshCcw size={18} className="text-gray-600 ml-2" />
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Display Picture</label>
                        <div className="flex items-center border rounded-lg px-3 py-2 border-gray-300 relative">
                            <Image className="text-gray-500 border-r pr-2 mr-2" size={20} />
                            <label className="w-full text-gray-500 cursor-pointer text-sm">Choose File</label>
                            <input type="file" name="displayPicture" onChange={(e) => setFormData({ ...formData, displayPicture: e.target.files[0] })} className="absolute opacity-0 w-full h-full cursor-pointer" />
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-[#0cb37d] hover:bg-[#1a7b5c] text-white py-2 rounded-lg font-semibold transition duration-300">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
