'use client'
import React,{ useEffect, useState } from "react";
import Image from "next/image";
import { auth, getLoggedIn, createAuth } from "../api/add-pet/db";
import { useRouter } from 'next/navigation'
import { userStore } from "../store/userStore";
import { error } from "console";

export default function Login() {

const loggedIn = userStore((state:any)=>state.loggedIn)
const setLoggedIn = userStore((state:any)=>state.setLoggedIn)

  let [username,setUsername]=useState("")
  let [password,setPassword]=useState("")
  let [errorMessage,setErrorMessage]=useState("")
  let router =  useRouter()


  const setError = (registration:boolean) => {
    switch (true) {
      case username==="" && password==="":
        setErrorMessage("Username and Password are required");
        break;
      case username==="":
        setErrorMessage("Username is required");
        break;
      case password==="":
        setErrorMessage("Password is required");
        break;
      case username.length < 5 && registration:
        setErrorMessage("Username must be at least 5 characters long");
        break;
      case password.length < 5 && registration:
        setErrorMessage("Password must be at least 5 characters long");
        break;
      case !registration:
          setErrorMessage("Please try again. username/password combination may not have been found");
          break;
      case  registration:
          setErrorMessage("An error occurred. Please try again. Username may already be taken");
          break;      
      default:
        setErrorMessage("An error occurred. Please try again. Username may already be taken");
    }
  };

  const handleRegister = async () => {
    try {
      let usr = await createAuth(username, password);
      if (usr?.isValid) {
        setLoggedIn(usr?.isValid, usr?.model?.username);
        router.push('/feed');
      } else {
        throw new Error("Registration failed");
      }
    } catch (error: any) {
      setError(true)
    }
  };

  const handleSignIn = async () => {
    try {
      let usr = await auth(username, password);
      if (usr?.isValid) {
        setLoggedIn(usr?.isValid, usr?.model?.username);
        router.push('/feed');
      } else {
        throw new Error("Login failed");
      }
    } catch (error: any) {
      setError(false);
    }
  };
 
  return (
    <div className="flex justify-center h-screen items-start pt-40  bg-base-100">
      
      
      
      <div className=" bg-base-300 text-base-content shadow-lg flex flex-col border-[primary] rounded-md  h-[44vh] md:h-[40vh] w-[280px] md:w-[400px] p-4 gap-2 md:p-8 md:gap-4 text-center "> 
      
      <h1 className="text-2xl md:text-3xl p-2 md:p-4">Sign In</h1>
      
      <small className="text-left text-error">{errorMessage}</small>
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
        onClick={handleRegister}>Register</button>
        <button className="btn btn-sm btn-outline btn-primary" 
        onClick={handleSignIn}>Sign In</button>
      </div>
      
      
      
          </div>
      
      
  )}
