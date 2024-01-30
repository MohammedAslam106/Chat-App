'use client'

import { query,getFirestore,collection,getDoc, onSnapshot, doc, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import firebase_app from "@/firebase/config";
import { FormEvent, useEffect, useState } from "react";
import { User } from "../page";

interface pageProps{
    params:{id:string}
}

const db=getFirestore(firebase_app)

export default function page({params}:pageProps){
    const [formValue,setFormValue]=useState('')
    const [currentUser,setCurrentUser]=useState<any | null>(null)
    const [messages,setMessages]=useState<any[]>([])
    console.log(params)

    useEffect(()=>{
        console.log(localStorage.getItem('currentUser'))
        const getUserDetails=()=>{
            const colRef=collection(db,'user')
            getDocs(colRef).then((result)=>{
                result.docs.forEach((user,id)=>{
                    const data=user.data()
                    if(window.localStorage.getItem('currentUser') || '{}'==JSON.stringify(data.uid)){
                        console.log(data)
                        setCurrentUser(data)
                    }
                })
            }).catch((error)=>console.log(error))
        }

        getUserDetails()
        const q=query(
            collection(db,'messages')
        )
        const unsub = onSnapshot(q, (QuerySnapshot) => {
            console.log(QuerySnapshot.docs)
            let messages:any[]=[]
            QuerySnapshot.forEach((message:any)=>{
                messages.push({...message.data()})
            })
            const uid=JSON.parse(window.localStorage.getItem('currentUser') || '')
            console.log(uid)
            setMessages(messages.filter((mess)=>{
                if((mess.person_1==uid || mess.person_1==params.id) && (mess.person_2==uid || mess.person_2==params.id)){
                    console.log('true')
                    return mess

                }
            }))
        });
    },[])

    async function handleFormSubmit(e:FormEvent){
        e.preventDefault()
        await addDoc(collection(db,'messages'),{
            message:formValue,
            person_1:currentUser.uid,
            person_2:params.id,
            sentAt:serverTimestamp.toString()
        })
        setFormValue('')
    }
    return(
        <div className=''>
            Chat-Room-{params.id}

            <form onSubmit={handleFormSubmit}>
                <input onChange={(e)=>setFormValue(e.target.value)} value={formValue}  type="text" />
                <button type="submit">Send Message</button>
            </form>

            <div>
                {messages.map((message,id)=>{
                    return <p key={id}>{message.message}</p>
                })}
            </div>
        </div>
    )
}