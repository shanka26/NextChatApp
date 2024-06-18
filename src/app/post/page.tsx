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
        <div className="grid grid-cols-1 gap-4 justify-center place-items-center h-dvh bg-slate-800">
{ 
            
          posts.map((post,i)=>(

            <div key={i} className="card w-96 bg-neutral text-neutral-content p-4 ">
              <div className="card-body items-center text-center">
                <h2 className="card-title">{post.title}</h2>
                <p className="max-w-80 truncate">{post.body}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Accept</button>
                  <button className="btn btn-ghost">Deny</button>
                </div>
              </div>
            </div>
          )) 
         
            }


        </div>
    );
}