'use client';
import { useEffect, useState } from "react";
import { createMessage, getPosts } from "../api/add-pet/route";
import ChatBubble from "../(components)/chatBubble";
import { messageStore } from "../store/messageStore";
import { userStore } from "../store/userStore";

export default function Page() {
  const [message, setMessage] = useState("");
  const messageList = messageStore((state: any) => state.messages);
  const refreshMessages = messageStore((state: any) => state.refreshMessages);
  const loggedIn = userStore((state: any) => state.loggedIn);
  const username = userStore((state: any) => state.user);

  const fetchPosts = async () => {
    try {
      const posts = await getPosts();
      refreshMessages(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchPosts();
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    
    <div className="grid grid-cols-4 h-screen gap-4 justify-center place-items-center bg-slate-800">
      <div></div>
      <div className="shadow-2xl col-span-2 flex flex-col w-full max-h-[92vh] p-2 overflow-hidden">
        <div className="flex-grow overflow-y-auto">
          {messageList.map((post: any, i: number) => (
            <div key={i} className="p-2">
              <ChatBubble username={post.author} body={post.message} isSender={post.author === username} />
            </div>
          ))}
        </div>

        <div className="flex shadow-lg sticky bottom-0 bg-slate-800 p-2 w-full justify-between">
          <input
            disabled={!loggedIn}
            value={loggedIn ? message : "Please Sign In"}
            onChange={(e) => setMessage(e.target.value)}
            className="p-2 border border-gray-300 rounded w-3/4 text-center text-gray-100"
          />
          <button
            className="bg-slate-500 text-white p-3 rounded-lg px-6"
            disabled={!loggedIn}
            onClick={async () => {
              await createMessage(message);
              setMessage("");
            }}
          >
            Send
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
}
