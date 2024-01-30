'use client'
import firebase_app from "@/firebase/config"
import { Logout } from "@/firebase/services"
import { Button } from "@chakra-ui/react"
import { getFirestore,onSnapshot,orderBy,query } from "firebase/firestore"

import { addDoc,serverTimestamp,collection } from "firebase/firestore"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

interface pageProps{
    
}
const db=getFirestore(firebase_app)

export type User={
    uid:string,
    name:string,
    email:string,
    image:string
}

export default function page({}:pageProps ){
    const [users,setUsers]=useState<User[]>([])
    useEffect(() => {
            const q = query(
            collection(db, "user"),
            orderBy("name")
            );
            let fetchedMessages:any=[]
            const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
                console.log(QuerySnapshot)
                QuerySnapshot.forEach((doc) => {
                fetchedMessages.push({ ...doc.data()});
            });
            setUsers(fetchedMessages.filter((user:any)=>{
                return JSON.stringify(user.uid)!==(window.localStorage.getItem('currentUser') || '')
            }));
            });
        }, []);
    
    return(
        <div className=''>Chat-Room
            <input style={{border:'1px solid black'}} type="text" name="" id="" />
            <Button onClick={()=>{
                Logout()
            }}>Logout</Button>
            <main>
                <div>
                    {users.map((user,id)=>{
                        return(
                            <Link href={`/chat-room/${user.uid}`} key={user.uid}>
                                <Image alt="user-image" width={25} height={25} src={user.image}/>
                                {user.name}
                            </Link>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}