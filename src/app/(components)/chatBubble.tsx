import React from "react";

interface ChatBubbleProps {
  username: string;
  body: string;
  isSender: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ username, body, isSender }) => {
  return (
    <div className={`text-primary ${isSender ? 'text-right' : 'text-left'}`}>
      {!isSender ? username : null}
      <div className={`chat ${isSender ? 'chat-end' : 'chat-start'}`}>
        <div className={`chat-bubble break-words whitespace-pre-wrap max-w-[180px] md:max-w-[350px]  p-2 rounded-lg ${isSender ? 'bg-primary text-primary-content ' : 'bg-secondary text-secondary-content '}`}>
          {body}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
