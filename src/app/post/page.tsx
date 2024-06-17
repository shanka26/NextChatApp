'use client';
import { useEffect, useState } from "react";
import { createPost, getLoggedIn, getPosts } from "../api/add-pet/route";
import { RecordModel } from "pocketbase";
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
      },[])
 
 

    return (
        <div>
{ 
            
          posts.map((p,i)=>(

            <div key={i}>
                <h5>{p.title}</h5>
                <p>{p.body}</p>
             
            </div>
          )) 
         
            }


        </div>
    );
}