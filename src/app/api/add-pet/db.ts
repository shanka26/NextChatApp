import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 

import PocketBase, { BaseAuthStore } from 'pocketbase';





// example create data
const getPosts = async ()=>{
  const pb = new PocketBase('https://theonenext.pockethost.io/');
const resultList = await pb.collection('messages').getFullList();
return resultList

}

const getMyPosts = async (username:string)=>{
  const pb = new PocketBase('https://theonenext.pockethost.io/');
const resultList = await pb.collection('messages').getFullList( {
  filter: 'author = '+username,
});
return resultList

}




const createMessage = async (message:string)=>{
  const pb = new PocketBase('https://theonenext.pockethost.io/');
  // const pb = new PocketBase('https://theonenext.pockethost.io/');
  let data = {
    
    "message": message,
    "author": pb.authStore.model?.username
};
  await pb.collection('messages').create(data);
  console.log(data)
}



const googleAuth = async()=>{
  const pb = new PocketBase('https://theonenext.pockethost.io/');

  await pb.collection('users').authWithOAuth2({
    provider: 'google',
    urlCallback: (url) => {
      
  }
});
}

const createAuth = async(username:string,password:string)=>{
  const pb = new PocketBase('https://theonenext.pockethost.io/');
let user:BaseAuthStore
let data = {
  "username":username,
  // "email":"e@mail.com",
  // "emailVisibility": true,
  "password":password,
  "passwordConfirm": password,
  "name": "test"
}
user = await pb.collection('users').create(data).then(async()=>{
  await pb.collection('users').authWithPassword(username,password)
  user = pb.authStore
  return(user)
})
return(user)
}


const auth = async(username:string,password:string)=>{
  const pb = new PocketBase('https://theonenext.pockethost.io/');
await pb.collection('users').authWithPassword(username,password)

return(pb.authStore)
}

const getLoggedIn = ()=>{const pb = new PocketBase('https://theonenext.pockethost.io/'); return pb.authStore}

const logout = ()=>{const pb = new PocketBase('https://theonenext.pockethost.io/');pb.authStore.clear()
}


// (optional) send an email verification request




export {createMessage,googleAuth,auth,getLoggedIn,logout,createAuth,getPosts}


