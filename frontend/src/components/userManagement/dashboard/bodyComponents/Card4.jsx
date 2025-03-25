import React, { useState } from "react";
import ThreeDots from "../../../../assets/userManagement/threeDots.svg";
import { BASE_URL } from "../../BaseUrl";

function Card4() {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const sendBroadcast = async () => {
        if (!title.trim() || !message.trim()) {
            alert("Title and message cannot be empty.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/api/admin/broadcast/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, message }),
            });

            if (!response.ok) {
                throw new Error("Failed to send broadcast");
            }

            alert("Broadcast sent successfully!");
            setTitle("");
            setMessage("");
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="col-span-4 bg-white rounded-lg shadow-md p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#464255]">Broadcast</h2>
                <img className="w-[30px] h-[30px]" src={ThreeDots} alt="Options" />
            </div>

            {/* Heading Input */}
            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Type Heading ..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 rounded-md bg-[#EBF8FF] text-gray-700 
                     placeholder-gray-500 text-sm 
                     focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
            </div>

            {/* Message Textarea */}
            <div className="mt-4">
                <textarea
                    rows="4"
                    placeholder="Message ..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 rounded-md bg-[#EBF8FF] text-gray-700 
                     placeholder-gray-500 text-sm resize-none
                     focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
            </div>

            {/* Send Button */}
            <div className="flex justify-end mt-4">
                <button
                    type="button"
                    onClick={sendBroadcast}
                    disabled={loading}
                    className={`bg-[#3B82F6] text-white font-semibold 
                     px-4 py-2 rounded-md text-sm uppercase
                     ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#2563EB]"} 
                     focus:outline-none focus:ring-2 focus:ring-blue-300`}
                >
                    {loading ? "SENDING..." : "SEND"}
                </button>
            </div>
        </div>
    );
}

export default Card4;
