import React, { useState } from "react";
import PopupChatBox from "./PopupChatBox";

function ChatCard(props) {
    const [isChatOpen, setIsChatOpen] = useState(false);

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

            <div className="mt-4 flex space-x-2">
                <button
                    className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-1.5 rounded-md"
                    onClick={() => setIsChatOpen(true)}
                >
                    Reply
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-1.5 rounded-md">
                    Ignore
                </button>
            </div>

            {isChatOpen && <PopupChatBox onClose={() => setIsChatOpen(false)} />}
        </div>
    );
}

export default ChatCard;
