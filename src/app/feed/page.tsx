'use client';
import { useEffect, useRef, useState } from "react";
import { createMessage, getPosts } from "../api/add-pet/db";
import ChatBubble from "../(components)/chatBubble";
import { messageStore } from "../store/messageStore";
import { userStore } from "../store/userStore";

export default function Page() {
  const [message, setMessage] = useState("");
  const messageList = messageStore((state: any) => state.messages);
  const refreshMessages = messageStore((state: any) => state.refreshMessages);
  const loggedIn = userStore((state: any) => state.loggedIn);
  const username = userStore((state: any) => state.user);
  const chatRef = useRef<HTMLDivElement>(null);


  const fetchPosts = async () => {
    try {
      const posts = await getPosts();
      refreshMessages(posts);
      chatRef?.current?.scrollTop?chatRef.current.scrollTop = chatRef.current.scrollHeight:null
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchPosts();
    }, 500);
    chatRef?.current?.scrollTop?chatRef.current.scrollTop = chatRef.current.scrollHeight:null
    return () => clearInterval(interval);
  }, );

  return (
    
    <div  className="grid grid-cols-10 max-h-screen justify-center bg-base-300">
      <div className=" col-span-0 md:col-span-2"></div>
      <div className="  md:col-span-10 col-span-8 flex flex-col w-full max-h-[90vh] justify-between overflow-hidden bg-neutral ">
        <div ref={chatRef} className="flex-grow h-screen  overflow-y-auto p-2 items-end ">
          {messageList.map((post: any, i: number) => (
            <div key={i} className="p-2">
              <ChatBubble username={post.author} body={post.message} isSender={post.author === username} />
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 flex border w-[80vw] md:w-[60vw] md:max-h-[10vh] p-3  justify-between gap-2 bg-primary rounded-sma">
          <input
            disabled={!loggedIn}
            value={loggedIn ? message : "Please Sign In"}
            placeholder="Type Message..."
            onChange={(e) => setMessage(e.target.value)}
            className="p-2 input text-left input-ghost rounded w-5/6 text-secondary bg-primary-content"
          />
          <button
            className={`btn btn-solid btn-secondary p-3 rounded-lg px-6 w-1/6 `}
            disabled={!loggedIn||message==""}
            onClick={async () => {
              await createMessage(message);
              setMessage("");
            }}
          >
            Send
          </button>
        </div>
      </div>
      <div className=" col-span-0 md:col-span-2 "></div>
    </div>
  );
}
