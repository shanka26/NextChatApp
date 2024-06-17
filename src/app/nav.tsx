'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { getLoggedIn, logout } from "./api/add-pet/route";
import { useRouter } from 'next/navigation'
import { get } from "http";

export default function Nav() {
    let [loggedIn ,setLoggedIn]=useState(false)
    const router = useRouter()


    const isLoggedIn = ()=>{
        let auth = getLoggedIn()
        setLoggedIn(auth?auth.isValid:false)
        console.log(auth)
      }

      useEffect(()=>{
        isLoggedIn()
  
      },[])


    return (
        <nav className="w-screen bg-blue-500" >
            <button className="btn">
            <Link href="/">
                HOME
                </Link>            
            </button>

            <button className="btn">
            <Link href="/post">
                POST
                </Link>
            </button>
            
            <button className="btn" onClick={()=>{!loggedIn?router.push('/'):logout()}}>
            
                {!loggedIn?"login":"logout"}
                
            </button>

            
        </nav>
    );
}