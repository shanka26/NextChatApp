'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { getLoggedIn, logout } from "./api/add-pet/db";
import { useRouter } from 'next/navigation'
import { get } from "http";
import { userStore } from "./store/userStore";
import { themeChange } from 'theme-change';

export default function Nav() {
    const loggedIn = userStore((state:any)=>state.loggedIn)
    const setLoggedIn = userStore((state:any)=>state.setLoggedIn)
    const router = useRouter()
    const getIsLoggedIn = userStore((state:any)=>state.isLoggedIn)

    const [theme, setTheme] = useState("");
    
      const toggleTheme = () => {
        setTheme(theme === 'dim' ? 'cupcake' : 'dim');
      }; 

      const signOut = async()=>{
          await logout()
          setLoggedIn(false)
      }
      useEffect(()=>{
        setTheme(localStorage?.getItem('theme')||"")
      },[])



/*Initialize under useEffect */

useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
    document.querySelector('html')?.setAttribute('data-theme', theme);
  }, [theme]);
    return (
        <nav className="flex flex-row justify-between w-screen bg-primary p-2 md:p-3 space-x-2 " >

            <div className="space-x-2 md:space-x-3 flex flex-row md:px-4 border-out">
            <button className="btn" onClick={()=>console.log("s")}>mbb
            <Link href="/">
                HOME
                </Link>            
            </button>

            <button className="btn">
            <Link href="/feed">
                FEED
                </Link>
            </button>
            


            </div>


            <div className="flex flex-row px-2 space-x-2 md:space-x-4">

            <label className="pl-0 grid cursor-pointer place-items-center">

<input

  type="checkbox"
  value="synthwave"
  className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
  onChange={()=>toggleTheme()} />
<svg
  className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
  xmlns="http://www.w3.org/2000/svg"
  width="14"
  height="14"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round">
  <circle cx="12" cy="12" r="5" />
  <path
    d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
</svg>
<svg
  className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
  xmlns="http://www.w3.org/2000/svg"
  width="14"
  height="14"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round">
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
</svg>
</label>
            
            <button className="btn " onClick={()=>{!loggedIn?router.push('/login'):signOut()}}>
            
                {!loggedIn?"login":"logout"}
                
            </button>
            </div>
            
        </nav>
    );
}