'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { getLoggedIn, logout } from "./api/add-pet/route";
import { useRouter } from 'next/navigation'
import { get } from "http";
import { userStore } from "./store/userStore";

export default function Nav() {
    const loggedIn = userStore((state:any)=>state.loggedIn)
    const setLoggedIn = userStore((state:any)=>state.setLoggedIn)
    const router = useRouter()
    const getIsLoggedIn = userStore((state:any)=>state.isLoggedIn)
    
const signOut = async()=>{
    await logout()
    setLoggedIn(false)
}

    return (
        <nav className="w-screen bg-blue-500" >
            <button className="btn" onClick={()=>console.log("s")}>
            <Link href="/">
                HOME
                </Link>            
            </button>

            <button className="btn">
            <Link href="/feed">
                FEED
                </Link>
            </button>
            
            <button className="btn" onClick={()=>{!loggedIn?router.push('/'):signOut()}}>
            
                {!loggedIn?"login":"logout"}
                
            </button>


            <button className="btn">
            <Link href="/post">
                POST
                </Link>
            </button>

            
        </nav>
    );
}