import React, { useState } from "react";
import PopupChatBox from "./PopupChatBox";
import useToken from "../../logins/Token"; // use the hook
import axios from "axios";

function ChatCard(props) {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [joining, setJoining] = useState(false);
    const [error, setError] = useState(null);
    const { userId } = useToken();

    const handleReply = async () => {
        setJoining(true);
        setError(null);

        try {
            const response = await axios.post(
                "http://localhost:8005/api/admin/convo/join",
                { conversationId: props.conversationId },
                { withCredentials: true }
            );

            console.log("Joined:", response.data.message);
            setIsChatOpen(true); // Open chat if joined successfully
        } catch (err) {
            setError(err.response?.data?.message || "Failed to join conversation");
            console.error("Join failed:", err);
        } finally {
            setJoining(false);
        }
    };

    return (
        <div className="w-[350px] flex-shrink-0 bg-white rounded-md shadow-md p-4 mb-2">
            <div className="flex items-center space-x-3">
                <img
                    src={props.displayPicture}
                    alt="User Avatar"
                    className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                    <h3 className="text-[#464255] font-semibold">{props.name}</h3>
                    <p className="text-xs text-gray-400">{props.recievedAt}</p>
                </div>
            </div>

            <p className="mt-3 text-sm text-gray-600 leading-relaxed w-[320px] h-[70px] overflow-hidden">
                {props.message}
            </p>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div className="mt-4 flex space-x-2">
                <button
                    className={`bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-1.5 rounded-md ${joining ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={handleReply}
                    disabled={joining}
                >
                    {joining ? "Joining..." : "Reply"}
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-1.5 rounded-md">
                    Ignore
                </button>
            </div>

            {isChatOpen && (
                <PopupChatBox
                    conversationId={props.conversationId}
                    userId={userId}
                    onClose={() => setIsChatOpen(false)}
                />
            )}
        </div>
    );
}

export default ChatCard;
