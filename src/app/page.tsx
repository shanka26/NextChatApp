'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import { auth, getLoggedIn, createAuth } from "./api/add-pet/route";
import { useRouter } from 'next/navigation'
import { userStore } from "./store/userStore";

export default function Home() {

const loggedIn = userStore((state:any)=>state.loggedIn)
const setLoggedIn = userStore((state:any)=>state.setLoggedIn)

  let [email,setEmail]=useState("")
  let [password,setPassword]=useState("")
  let [confirmPassword,setConfirmPassword]=useState("")
  let router =  useRouter()

 
  return (
    <div className="flex justify-center h-100vh">
      
      
      { !loggedIn?
      
      <div>
        <p>Email:</p>
        <input value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        
        
        <p>Password:</p>
        <input value={password} onChange={(e)=>{setPassword(e.target.value)}}/>

        <p>Confirm Password:</p>
        <input value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>


        <button className="btn" onClick={()=>{createAuth(email,password,confirmPassword)}}>Register</button>
        <button className="btn" onClick={async()=>{let usr = await auth(email,password); setLoggedIn(usr.isValid)}}>Sign In</button>
      </div>
      
      :
      
      <h2>This is Home</h2>

      }
      
          </div>
      
      
  )}
