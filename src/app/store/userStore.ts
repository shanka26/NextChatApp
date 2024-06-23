import { BaseAuthStore } from 'pocketbase'
// import { useState } from 'react'
import {create} from 'zustand'
// import { auth,getLoggedIn } from '../api/add-pet/route'
// import { get } from 'http'




export const userStore = create((set)=>({
     loggedIn:false,
     setLoggedIn: (l:boolean)=>{
        set({loggedIn: l})
    }
    
}))


// interface BearState {
//   bears: boolean
//   increase: (email:string,password:string) => void
// }

// const useBearStore = create<BearState>()((set) => ({
//   bears: false,
//   increase:async (email,password)=>{
//             const logged=await auth(email,password);
//             set({user: logged ? logged: null})
//             set({loggedIn: logged ? logged.isValid : false})
//         },
// }))