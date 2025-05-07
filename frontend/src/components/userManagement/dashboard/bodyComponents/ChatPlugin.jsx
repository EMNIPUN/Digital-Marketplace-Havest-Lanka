import React, { useState } from 'react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import PopupChatBox from './PopupChatBox'; // Ensure correct import path
import Token from '../../logins/Token';

function ChatPlugin({ conversationId }) {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const userId = Token().userId; // Get userId from Token

    return (
        <div>
            <div
                className='fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 p-3 rounded-full cursor-pointer shadow-lg z-50'
                onClick={() => setIsChatOpen(true)}
            >
                <ChatBubbleLeftRightIcon className='h-6 w-6 text-white' />
            </div>

            {isChatOpen && (
                <PopupChatBox
                    onClose={() => setIsChatOpen(false)}
                    conversationId={null}
                    userId={userId} // Pass userId to PopupChatBox
                />
            )}
        </div>
    );
}

export default ChatPlugin;
