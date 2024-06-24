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

const getMyPosts = async (username:string)=>{
  const pb = new PocketBase('http://127.0.0.1:8090');
const resultList = await pb.collection('Posts').getList(1, 50, {
  filter: 'author = '+username,
});
return resultList.items

}




const createMessage = async (message:string)=>{
  const pb = new PocketBase('http://127.0.0.1:8090');
  let data = {
    
    "message": message,
    "author": pb.authStore.model?.username
};
  await pb.collection('Posts').create(data);
  console.log(data)
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

return(pb.authStore)
}

const getLoggedIn = ()=>{const pb = new PocketBase('http://127.0.0.1:8090'); return pb.authStore}

const logout = ()=>{const pb = new PocketBase('http://127.0.0.1:8090');pb.authStore.clear()
}


// (optional) send an email verification request




export {createMessage,googleAuth,auth,getLoggedIn,logout,createAuth,getPosts}


