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
  }, );

  return (
    
    <div className="grid grid-cols-10 h-screen gap-4 justify-center place-items-center bg-base-100">
      <div className=" col-span-2"></div>
      <div className=" col-span-6 flex flex-col w-full h-screen  overflow-hidden bg-neutral">
        <div className="flex-grow max-h-[80vh] overflow-y-auto p-2 ">
          {messageList.map((post: any, i: number) => (
            <div key={i} className="p-2">
              <ChatBubble username={post.author} body={post.message} isSender={post.author === username} />
            </div>
          ))}
        </div>

        <div className="flex border sticky bottom-0 p-2 w-full justify-between gap-2">
          <input
            disabled={!loggedIn}
            value={loggedIn ? message : "Please Sign In"}
            placeholder="Message..."
            onChange={(e) => setMessage(e.target.value)}
            className="p-2 border input-primary rounded w-3/4 text-center text-primary "
          />
          <button
            className="btn btn-outline btn-primary p-3 rounded-lg px-6"
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
      <div className=" col-span-2"></div>
    </div>
  );
}
