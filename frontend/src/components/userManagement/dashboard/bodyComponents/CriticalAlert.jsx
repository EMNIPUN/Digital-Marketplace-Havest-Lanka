import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle } from "lucide-react";

function CriticalAlert({ alertData }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Alert Item */}
            <div className="bg-[#00b0753d] p-2 rounded-md flex items-center justify-between w-full mb-2 shadow-sm hover:bg-[#00b0755b] transition">
                <div className="flex items-center text-[#000000cc]">
                    <AlertCircle className="text-red-500" size={18} />
                    <p className="ml-2 text-sm font-semibold">{alertData.title}</p>
                </div>
                <button
                    className="bg-[#00B074] hover:bg-[#1e8e69] px-3 py-1 text-sm font-semibold text-white rounded-md transition"
                    onClick={() => setIsOpen(true)}
                >
                    More Details
                </button>
            </div>

            {/* Popup Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md relative"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                            {/* Close Button */}
                            <button
                                className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 p-2 rounded-full text-gray-600"
                                onClick={() => setIsOpen(false)}
                            >
                                <X size={16} />
                            </button>

                            {/* Popup Content */}
                            <h2 className="text-lg font-bold text-red-600 mb-2">{alertData.title}</h2>
                            <p className="text-sm text-gray-700 mb-2"><strong>Type:</strong> {alertData.type}</p>
                            <p className="text-sm text-gray-700 mb-2"><strong>Date:</strong> {new Date(alertData.date).toLocaleString()}</p>
                            <p className="text-sm text-gray-700 mb-4"><strong>Message:</strong> {alertData.message}</p>

                            <button
                                className="bg-[#00B074] hover:bg-[#1e8e69] px-4 py-2 text-white rounded-md w-full transition"
                                onClick={() => setIsOpen(false)}
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default CriticalAlert;
