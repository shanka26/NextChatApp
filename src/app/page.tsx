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
      
    mwahhahahahaha

          </div>
      
      
  )}
