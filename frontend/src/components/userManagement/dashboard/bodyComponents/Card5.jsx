import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import ChatCard from "./ChatCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Card5() {
    const scrollContainerRef = useRef(null);
    const [adminConversations, setAdminConversations] = useState([]);
    const [freeConversations, setFreeConversations] = useState([]);
    const [loading, setLoading] = useState(true);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const [adminRes, freeRes] = await Promise.all([
                    axios.get("http://localhost:8005/api/admin/convo/admin", { withCredentials: true }),
                    axios.get("http://localhost:8005/api/admin/convo", { withCredentials: true }),
                ]);
                setAdminConversations(adminRes.data || []);
                setFreeConversations(freeRes.data || []);
            } catch (error) {
                console.error("Error fetching conversations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchConversations();
    }, []);

    const renderChats = (chats) =>
        chats.map((chat, index) => (
            <ChatCard
                key={index}
                name={chat.userName}
                recievedAt={new Date(chat.lastMessageTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                })}
                message={chat.lastMessage}
                displayPicture={chat.userDisplayPicture}
                conversationId={chat.conversationId}
            />
        ));


    return (
        <div className="p-6 col-span-12">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-[#464255]">User Support Requests</h2>
                    <p className="text-sm text-gray-400">Helping users through live chat</p>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
                        onClick={scrollLeft}
                    >
                        <ChevronLeft className="h-4 w-4 text-gray-500" />
                    </button>
                    <button
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
                        onClick={scrollRight}
                    >
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                    </button>
                </div>
            </div>

            <div
                ref={scrollContainerRef}
                className="flex space-x-4 mt-6 overflow-x-auto scrollbar-thin scrollbar-thumb-[#0895664f] scrollbar-track-[#f3f2f7]"
                style={{ scrollBehavior: "smooth" }}
            >
                {loading ? (
                    <p className="text-gray-500">Loading chats...</p>
                ) : adminConversations.length === 0 && freeConversations.length === 0 ? (
                    <p className="text-gray-500">No chats found.</p>
                ) : (
                    <>
                        {renderChats(adminConversations)}
                        {renderChats(freeConversations)}
                    </>
                )}
            </div>
        </div>
    );
}

export default Card5;
