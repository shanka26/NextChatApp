'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import { auth, getLoggedIn, createAuth } from "./api/add-pet/route";
import { useRouter } from 'next/navigation'

export default function Home() {

  let [loggedIn ,setLoggedIn]=useState(false)
  let [email,setEmail]=useState("")
  let [password,setPassword]=useState("")
  let [confirmPassword,setConfirmPassword]=useState("")
  let router =  useRouter()

  const isLoggedIn = ()=>{
    let auth = getLoggedIn()
    setLoggedIn(auth?auth.isValid:false)
    console.log(auth.isValid)
    
  }
 

  useEffect(()=>{
// console.log("refrsh"+isLoggedIn)
    
  })

  useEffect(()=>{
    router.refresh()

    
  },[loggedIn])
 
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


        <button className="btn" onClick={()=>{createAuth(email,password,confirmPassword); isLoggedIn()}}>Register</button>
        <button className="btn" onClick={()=>{auth(email,password).then(()=>isLoggedIn())}}>Sign In</button>
      </div>
      
      :
      
      <h2>This is Home</h2>

      }
      
          </div>
      
      
  )}
