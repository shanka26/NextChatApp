'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import { auth, getLoggedIn, createAuth } from "../api/add-pet/route";
import { useRouter } from 'next/navigation'
import { userStore } from "../store/userStore";

export default function login() {

const loggedIn = userStore((state:any)=>state.loggedIn)
const setLoggedIn = userStore((state:any)=>state.setLoggedIn)

  let [email,setEmail]=useState("")
  let [password,setPassword]=useState("")
  let [confirmPassword,setConfirmPassword]=useState("")
  let router =  useRouter()

 
  return (
    <div className="flex justify-center h-screen items-center">
      
      
      
      <div className="shadow-lg flex flex-col h-[300px] p-8 gap-4 text-center "> 
      
      <h5>Login</h5>
        <input value={email} placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
        
        
        
        <input value={password} placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>


        <button className="btn btn-sm" onClick={()=>{createAuth(email,password,confirmPassword)}}>Register</button>
        <button className="btn btn-sm" onClick={async()=>{let usr = await auth(email,password); setLoggedIn(usr.isValid,usr?.model?.username)}}>Sign In</button>
      </div>
      
      
      
          </div>
      
      
  )}
