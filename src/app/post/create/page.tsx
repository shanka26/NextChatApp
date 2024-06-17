'use client';
import { useEffect, useState } from "react";
import { createPost, getLoggedIn } from "../../api/add-pet/route";
export default function Page() {


    let [loggedIn ,setLoggedIn]=useState(false)

    const isLoggedIn = ()=>{
        let auth = getLoggedIn()
        setLoggedIn(auth?auth.isValid:false)
      }

      useEffect(()=>{
        isLoggedIn()
      },[])
    
    let [title,setTitle]=useState("")
    let [body,setBody]=useState("")
 

    return (
        <div>

            loggedIn?
            <div>

                add title
                <input value={title} onChange={(e)=>{setTitle(e.target.value)}}>
                
                </input>

                add body
                <input className="input" value={body} onChange={(e)=>{setBody(e.target.value)}}>
                
                </input>
                <button onClick={()=>{createPost(title,body,"leonars")}}>
                    POST
                </button>

            </div>
            :
            <p>please log in to createPost</p>

            

        </div>
    );
}