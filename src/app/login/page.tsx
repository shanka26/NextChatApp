'use client'
import React,{ useEffect, useState } from "react";
import Image from "next/image";
import { auth, getLoggedIn, createAuth } from "../api/add-pet/db";
import { useRouter } from 'next/navigation'
import { userStore } from "../store/userStore";

export default function Login() {

const loggedIn = userStore((state:any)=>state.loggedIn)
const setLoggedIn = userStore((state:any)=>state.setLoggedIn)

  let [username,setUsername]=useState("")
  let [password,setPassword]=useState("")
  let router =  useRouter()

 
  return (
    <div className="flex justify-center h-screen items-start pt-40  bg-base-100">
      
      
      
      <div className=" bg-base-300 text-base-content shadow-lg flex flex-col border-[primary] rounded-md min-h-[400px] h-[40vh] w-[400px] p-8 gap-4 text-center "> 
      
      <h1 className="text-3xl p-4">Sign In</h1>
      
      
        <label className="input input-bordered flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
  </svg>
  <input value={username} type="text" className="grow" placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}} />
</label>
<label className="input input-bordered flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
      clipRule="evenodd" />
  </svg>
  <input type="password" className="grow" placeholder="Password" value={password}  onChange={(e)=>{setPassword(e.target.value)}}/>
</label>
        <button className="btn btn-sm  btn-primary" 
        onClick={async()=>{let usr = await createAuth(username,password); setLoggedIn(usr?.isValid,usr?.model?.username),router.push('/feed')}}>Register</button>
        <button className="btn btn-sm btn-outline btn-primary" 
        onClick={async()=>{let usr = await auth(username,password); setLoggedIn(usr?.isValid,usr?.model?.username),router.push('/feed')}}>Sign In</button>
      </div>
      
      
      
          </div>
      
      
  )}
