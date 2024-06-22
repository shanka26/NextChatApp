'use client';
import { useEffect, useState } from "react";
import { createPost, getLoggedIn, getPosts } from "../api/add-pet/route";
import { RecordModel } from "pocketbase";
import Pocketbase from "pocketbase";

export default function Page() {

    let [posts ,setPosts]=useState([] as RecordModel[])
 
  

      const fetchPosts = async ()=> {
        try {
          posts.length===0?setPosts(await getPosts()):null
          console.log("fetch")
          }
      catch (error) {
          console.error('Error fetching posts:', error);
      }
  }

      useEffect( ()=>{
       fetchPosts()
       console.log(posts)
      })
 
 

    return (
        <div className="grid grid-cols-4  gap-4 justify-center place-items-center h-vh bg-slate-800">
          <div ></div>
          
          <div className="col-span-2 h-dvh flex-col bg-slate-300 min-w-full text-center flex p-2 overflow-auto">
            
{  
          posts.map((post,i)=>(

            <div key={i} className=" flex flex-col p-2 min-h-[65vh] m-4 bg-slate-500">
              <div className="bg-blue-800 h-[20%] p-2  flex items-center justify-center">{post.title}</div>
              <div className="bg-blue-950 h-[80%] p-2">{post.body}</div>
             
              
            </div>
          )) 
         
            }
</div>
            <div ></div>
        </div>
    );
}