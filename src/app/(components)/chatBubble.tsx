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
    <div className={`chat ${isSender?'chat-end':'chat-start'}  text-white`}>
      {username}
      <div className="chat-bubble  bg-green-200 text-black">{body}</div>
    </div>
  );
};

export default ChatBubble;