'use client';
import { useEffect, useState } from "react";
import { createPost, getLoggedIn, getPosts } from "../api/add-pet/route";
import { RecordModel } from "pocketbase";
import Pocketbase from "pocketbase";
import ChatBubble from "../(components)/chatBubble";

export default function Page() {

    let [posts ,setPosts]=useState([] as RecordModel[])
 
  

      const fetchPosts = async ()=> {
        try {
          posts.length===0?setPosts(await getPosts()):null
          // console.log("fetch")
          }
      catch (error) {
          console.error('Error fetching posts:', error);
      }
  }

      useEffect( ()=>{
       fetchPosts()
      //  console.log(posts)
      })
 
 

    return (
        <div className="grid grid-cols-4  h-full gap-4 justify-center place-items-center  bg-slate-800">
          <div ></div>
          
          <div className="col-span-2 h-full flex-col min-w-full text-center flex p-2 overflow-auto align-bottom justify-end pb-24">
            
{  
          posts.map((post,i)=>(

            <div key={i} className=" flex flex-col p-2">
              <ChatBubble username={post.author} body={post.body} isSender={false} />
            </div>
          )) 
         
            }

<div>
  <input/>
  <button className="text-white">send</button>
</div>
            
</div>
            <div ></div>
        </div>
    );
}