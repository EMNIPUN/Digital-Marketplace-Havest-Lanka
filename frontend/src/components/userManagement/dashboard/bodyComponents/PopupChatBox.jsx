import React, { useState, useRef, useEffect } from "react";
import { X, SendHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function PopupChatBox({ onClose }) {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! How can I help you today?", sender: "agent", time: "10:00 AM" },
        { id: 2, text: "I have an issue with my order.", sender: "user", time: "10:02 AM" },
        { id: 3, text: "I'm sorry to hear that. Can you provide your order number?", sender: "agent", time: "10:03 AM" },
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);
    const chatBoxRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

        function handleClickOutside(event) {
            if (chatBoxRef.current && !chatBoxRef.current.contains(event.target)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    const handleSend = () => {
        if (input.trim() !== "") {
            const newMessage = {
                id: messages.length + 1,
                text: input,
                sender: "user",
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            };
            setMessages([...messages, newMessage]);
            setInput("");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <AnimatePresence>
                <motion.div
                    ref={chatBoxRef}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="bg-white w-full max-w-md rounded-2xl shadow-lg flex flex-col h-[600px]"
                >
                    <div className="flex items-center justify-between p-4 border-b bg-green-600 text-white rounded-t-2xl">
                        <h3 className="text-lg font-semibold">John Snow</h3>
                        <button onClick={onClose} className="hover:text-gray-300">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-100 rounded-b-2xl scrollbar-thin scrollbar-thumb-[#0895663f] scrollbar-track-[#f3f2f7]">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                <div
                                    className={`relative p-3 rounded-lg text-sm max-w-[80%] ${msg.sender === "user"
                                        ? "bg-green-500 text-white self-end"
                                        : "bg-white text-gray-800 shadow-md self-start"
                                        }`}
                                >
                                    <p>{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 border-t bg-white flex items-center justify-between space-x-2 rounded-b-2xl">
                        <input
                            type="text"
                            className="flex-1 border rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                        <button
                            onClick={handleSend}
                            className="bg-green-500 text-white p-2 flex items-center justify-center rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                        >
                            <SendHorizontal size={20} strokeWidth={1.5} absoluteStrokeWidth />
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default PopupChatBox;
