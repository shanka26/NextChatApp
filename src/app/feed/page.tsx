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
    }, 1000);
    chatRef?.current?.scrollTop?chatRef.current.scrollTop = chatRef.current.scrollHeight:null
    return () => clearInterval(interval);
  }, );

  return (
    
    <div  className="grid grid-cols-12 max-h-screen justify-center bg-base-300">

      <div className="col-span-1 sm:col-span-3 lg:col-span-4 bg-base-300 "></div>
      <div className=" col-span-10 sm:col-span-6 lg:col-span-4 flex flex-col w-full max-h-[82vh]  content-center overflow-hidden  ">
        <div ref={chatRef} className="flex-grow h-screen  overflow-y-auto p-2 items-end ">
          {messageList.map((post: any, i: number) => (
            <div key={i} className="p-2">
              <ChatBubble username={post.author} body={post.message} isSender={post.author === username} />
            </div>
          ))}
        </div>

       
      </div>
      <div className="fixed bottom-0 sm:left-[20%] lg:left-[33.4%] flex border w-[100%] sm:w-[60%] lg:w-[33.4%] p-3  justify-between gap-2 bg-primary rounded-sma ">
          <input
            disabled={!loggedIn}
            value={loggedIn ? message : "Please Sign In"}
            placeholder="Type Message..."
            onChange={(e) => setMessage(e.target.value)}
            className="p-2 input text-left input-ghost rounded w-5/6 text-base-content  focus:text-base-content bg-base-300"
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
      <div className="  col-span-1 sm:col-span-3 lg:col-span-4"></div>
    </div>
  );
}
