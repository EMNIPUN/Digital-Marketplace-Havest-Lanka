import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import Token from "../../logins/Token";

const PopupChatBox = ({ conversationId, userId, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    const { role } = Token();


    // Scroll to bottom when messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Fetch messages for current conversation
    useEffect(() => {
        if (!conversationId) return;

        const fetchMessages = async () => {
            try {
                const res = await axios.get(`http://localhost:8005/api/admin/convo/messages/${conversationId}`, {
                    withCredentials: true
                });
                setMessages(res.data.messages);
            } catch (err) {
                console.error("Error fetching messages:", err);
            }
        };

        fetchMessages();
    }, [conversationId]);

    // Send a new message
    const handleSend = async () => {
        if (!input.trim()) return;

        const isMarketManager = role === "marketmanager";

        const endpoint = isMarketManager
            ? "http://localhost:8005/api/admin/convo/send"
            : "http://localhost:8005/api/admin/convo/send/user";

        const payload = isMarketManager
            ? {
                sender: userId,
                conversationId,
                message: input
            }
            : {
                sender: userId,
                message: input
            };

        try {
            const res = await axios.post(endpoint, payload, {
                withCredentials: true
            });

            const newMessage = isMarketManager ? res.data.message : res.data.data;

            setMessages((prev) => [...prev, newMessage]);
            setInput("");
        } catch (err) {
            console.error("Error sending message:", err);
        }
    };



    return (
        <div className="fixed bottom-5 right-5 w-96 h-96 bg-white rounded-xl shadow-lg flex flex-col border border-gray-200 z-50">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-200 rounded-t-xl">
                <h2 className="font-semibold text-lg">Chat</h2>
                <button onClick={onClose} className="text-gray-600 hover:text-red-500">
                    <IoMdClose size={22} />
                </button>
            </div>

            {/* Message List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.sender === userId ? "justify-end" : "justify-start"
                            }`}
                    >
                        <div
                            className={`px-4 py-2 rounded-lg max-w-xs ${msg.sender === userId
                                ? "bg-blue-500 text-white rounded-br-none"
                                : "bg-gray-300 text-black rounded-bl-none"
                                }`}
                        >
                            {msg.message}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="flex p-3 border-t border-gray-200 bg-white">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
                <button
                    onClick={handleSend}
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 text-sm"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default PopupChatBox;
