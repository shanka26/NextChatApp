'use client';
import { sql } from "@vercel/postgres";
import { db } from "@vercel/postgres";
import { useState } from "react";
export default function Page() {

    
    let [title,setTitle]=useState("")
    let [body,setBody]=useState("")
  
    const  post = async ()=>{
        let client = await db.connect()
        await client.sql `Insert into posts (title,body) values(${title}${body})`}
    return (
        <div>

            add title
            <input value={title} onKeyDown={(e)=>{setTitle(title+e.key)}}>
            
            </input>

            add body
            <input className="input" value={body} onKeyDown={(e)=>{setBody(body+e.key)}}>
            
            </input>
            <button onClick={post}>
                postpost
            </button>

        </div>
    );
}