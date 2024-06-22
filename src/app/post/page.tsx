'use client';
import { useEffect, useState } from "react";
import { createPost, getLoggedIn } from "../api/add-pet/route";
import Link from "next/link";
export default function Page() {


    let [loggedIn ,setLoggedIn]=useState(false)
    let [username ,setUsername]=useState("")

    const isLoggedIn = ()=>{
        let auth = getLoggedIn()
        setLoggedIn(auth?auth.isValid:false)
        setUsername(auth?auth.model?.username:null)
      }

      useEffect(()=>{
        isLoggedIn()
        
      },[])
    

    
    let [title,setTitle]=useState("")
    let [body,setBody]=useState("")
 

    return (
        <div className="grid grid-cols-4  gap-4 justify-center place-items-center h-vh bg-slate-800">
<div ></div>


{
            loggedIn?


            
                
          
            <div className="col-span-2 h-dvh flex-col bg-slate-300 min-w-full text-center flex p-2 overflow-auto">


            <div  className=" flex flex-col p-2 min-h-[65vh] m-4 bg-slate-500">
              <div className="bg-blue-800 h-[20%] p-2  flex items-center justify-center">
              Title
              <input value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
              </div>


              <div className="bg-blue-950 h-[80%] p-2">
              Body 
              <input className="input" value={body} onChange={(e)=>{setBody(e.target.value)}}/>
              </div>
             
              <button className="btn" onClick={()=>{createPost(title,body,username);}}> </button>
            </div>

            </div>
            
        :<Link href="/">
            PLease sign in
        </Link>
                }

        <div ></div>
        </div>


    );
}