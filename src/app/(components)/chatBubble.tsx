import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

interface ChatBubbleProps {
  username: string;
  body: string;
  isSender: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ username, body ,isSender}) => {
  return (
    
    <div className={`text-primary ${isSender?'text-right':'text-left'}`}>
        {!isSender?username:null}
        <div className={`chat ${isSender?'chat-end':'chat-start'} `}>
      
      <div className={` text-primary-content chat-bubble ${isSender?'bg-primary':'bg-secondary'} text-secondary-content`}>{body}</div>
    </div>
    </div>
  );
};

export default ChatBubble;