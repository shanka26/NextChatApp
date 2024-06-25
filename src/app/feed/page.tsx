'use client';
import { useEffect, useState } from "react";
import { createMessage, getLoggedIn, getPosts } from "../api/add-pet/route";
import { RecordModel } from "pocketbase";
import Pocketbase from "pocketbase";
import ChatBubble from "../(components)/chatBubble";
import { messageStore } from "../store/messageStore";
import { userStore } from "../store/userStore";

export default function Page() {

    let [posts ,setPosts]=useState([] as RecordModel[])
    let [message,setMessage]=useState("")
    const messageList = messageStore((state:any)=>state.messages)
    const refreshMessages=messageStore((state:any)=>state.refreshMessages)
    const loggedIn = userStore((state:any)=>state.loggedIn)
    const username = userStore((state:any)=>state.user)

      const fetchPosts = async ()=> {
        try {
          
         refreshMessages(await getPosts())
          
          }
      catch (error) {
          console.error('Error fetching posts:', error);
      }
  }

      useEffect( ()=>{
        const interval = setInterval(()=>{
          fetchPosts()
          
        },500)
       
        return () => clearInterval(interval);
      })
 
 

    return (
        <div className="grid grid-cols-4  h-full gap-4 justify-center place-items-center  bg-slate-800">
          <div ></div>
          
          <div className=" shadow-lg max-h-52 col-span-2  flex-col min-w-full text-center flex p-2 overflow-auto align-bottom justify-end pb-24">
            
{  
          messageList.map((post:any,i:number)=>(

            <div key={i} className=" flex  flex-col p-2">
              <ChatBubble username={post.author} body={post.message} isSender={post.author===username} />
            </div>
          )) 
         
            }

<div>
  <input disabled={!loggedIn} value = {loggedIn?message:"Please Sign In"} onChange={(e)=>{setMessage(e.target.value)}}/>
  <button className="text-white"  disabled={!loggedIn} onClick={async ()=>{await createMessage(message);console.log(message);setMessage("")}}>send</button>
</div>
            
</div>
            <div ></div>
        </div>
    );
}