import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 

import PocketBase from 'pocketbase';





// example create data
const getPosts = async ()=>{
  const pb = new PocketBase('http://127.0.0.1:8090');
const resultList = await pb.collection('Posts').getList(1, 50, {
  filter: 'created >= "2023-01-01 00:00:00" ',
});
return resultList.items

}



const createPost = async (title:string,body:string,author:string)=>{
  const pb = new PocketBase('http://127.0.0.1:8090');
  let data = {
    "Title": title,
    "Body": body,
    "author": author
};
  await pb.collection('Posts').create(data);
}



const googleAuth = async()=>{
  const pb = new PocketBase('http://127.0.0.1:8090');

  await pb.collection('users').authWithOAuth2({
    provider: 'google',
    urlCallback: (url) => {
      
  }
});
}

const createAuth = async(email:string,password:string,passwordConfirm:string)=>{
  const pb = new PocketBase('http://127.0.0.1:8090');

let data = {
  "username": email.replaceAll("@","").replaceAll(".com",""),
  "email":email,
  "emailVisibility": true,
  "password":password,
  "passwordConfirm": passwordConfirm,
  "name": "test"
}
await pb.collection('users').create(data).then(async ()=>
   await pb.collection('users').requestVerification(email)
)


}


const auth = async(email:string,password:string)=>{
  const pb = new PocketBase('http://127.0.0.1:8090');
await pb.collection('users').authWithPassword(email,password)

}

const getLoggedIn = ()=>{const pb = new PocketBase('http://127.0.0.1:8090'); return pb.authStore}

const logout = ()=>{const pb = new PocketBase('http://127.0.0.1:8090');pb.authStore.clear()
}


// (optional) send an email verification request




export {createPost,googleAuth,auth,getLoggedIn,logout,createAuth,getPosts}


