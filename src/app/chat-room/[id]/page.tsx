'use client'

import { query,getFirestore,collection,getDoc, onSnapshot, doc, addDoc, getDocs, serverTimestamp, DocumentData } from "firebase/firestore";
import firebase_app from "@/firebase/config";
import { FormEvent, useEffect, useRef, useState } from "react";
import { User } from "@/types/user";
import NavBar from "@/components/NavBar";
import { Box, Button, Container, FormControl, Input, calc } from "@chakra-ui/react";
import { BiRightArrow } from "react-icons/bi";
import { FaCircleRight } from "react-icons/fa6";
import { BsArrowRightCircle } from "react-icons/bs";
import ChatContainer from "@/components/ChatContainer";
import { Chat } from "@/types/chat";

interface pageProps{
    params:{id:string}
}

const db=getFirestore(firebase_app)

export default function page({params}:pageProps){
    const [formValue,setFormValue]=useState('')
    const [currentUser,setCurrentUser]=useState<User>({
        name:'',
        email:'',
        image:'',
        uid:''
    })
    const [secondUser,setSecondUser]=useState<User>({
        name:'',
        email:'',
        image:'',
        uid:''
    })
    const [messages,setMessages]=useState<Chat[]>([])

    const dummyChats=[
        {
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2',
            message:'Hey How are you doing I hop doing great have nice day',
            sentAt:new Date()
        },
        {
            uid:'fxbkyAPm8vM08VHkjNVqmz6dqYs1',
            message:'Hey How is it doing, fine I suppose. What do you thing about it now is it ok to have it like this',
            sentAt:new Date()
        },
        {
            uid:'fxbkyAPm8vM08VHkjNVqmz6dqYs1',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid:'fxbkyAPm8vM08VHkjNVqmz6dqYs1',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid:'fxbkyAPm8vM08VHkjNVqmz6dqYs1',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid:'fxbkyAPm8vM08VHkjNVqmz6dqYs1',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid:'fxbkyAPm8vM08VHkjNVqmz6dqYs1',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid:'fxbkyAPm8vM08VHkjNVqmz6dqYs1',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid:'fxbkyAPm8vM08VHkjNVqmz6dqYs1',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid:'fxbkyAPm8vM08VHkjNVqmz6dqYs1',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid:'fxbkyAPm8vM08VHkjNVqmz6dqYs1',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid:'fxbkyAPm8vM08VHkjNVqmz6dqYs1',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid:'fxbkyAPm8vM08VHkjNVqmz6dqYs1',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid:'fxbkyAPm8vM08VHkjNVqmz6dqYs1',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid:'fxbkyAPm8vM08VHkjNVqmz6dqYs1',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
        {
            uid:'fxbkyAPm8vM08VHkjNVqmz6dqYs1',
            message:'Hey How are you doing',
            sentAt:new Date()
        },

        {
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2',
            message:'Hey How are you doing',
            sentAt:new Date()
        },
    ]

    const scrollRef=useRef<HTMLDivElement | null>(null)

    useEffect(()=>{

        scrollRef.current?.scrollIntoView({behavior:'smooth'})

        const getUserDetails=()=>{
            const colRef=collection(db,'user')
            getDocs(colRef).then((result)=>{
                result.docs.forEach((user,id)=>{
                    const data=user.data() as User
                    if(window.localStorage.getItem('currentUser')==JSON.stringify(data.uid)){
                        console.log(data)
                        setCurrentUser(data)
                    }
                    else if(params.id==data.uid){
                        console.log(data)
                        setSecondUser(data)
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
            console.log(messages[0].sentAt)
            const uid=window.localStorage.getItem('currentUser')
            setMessages(messages.filter((mess)=>{
                if((JSON.stringify(mess.person_1)==uid || mess.person_1==params.id) && (JSON.stringify(mess.person_2)==uid || mess.person_2==params.id)){
                    return mess

                }
            }).sort((a, b) => {
                console.log(a.sentAt.seconds,b)
                const timestampA = a.sentAt.seconds * 1000 + Math.round(a.sentAt.nanoseconds / 1e6);
                const timestampB = b.sentAt.seconds * 1000 + Math.round(b.sentAt.nanoseconds / 1e6);
            
                return timestampA - timestampB;
            }))
            scrollRef.current?.scrollIntoView({behavior:'smooth'})

        });
    },[])

    async function handleFormSubmit(e:FormEvent){
        e.preventDefault()
        await addDoc(collection(db,'messages'),{
            message:formValue,
            person_1:currentUser.uid,
            person_2:params.id,
            sentAt:new Date()
        })

        scrollRef.current?.scrollIntoView({behavior:'smooth'})

        setFormValue('')
    }
    return(
        
        <>
            <NavBar secondUser={secondUser}/>

            <Box bg={'gray.100'} position={'relative'} className="cool-scrollbar" w={'100%'} overflowY={'scroll'} height={'calc(100svh - 10em)'}>
                {
                    messages.map((chat,ind)=>{
                        return(
                            <ChatContainer secondUser={secondUser} currentUser={currentUser} chat={chat} key={ind}/>
                        )
                    })
                }
                
                <Box float={'left'} bottom={0} position={'static'} ref={scrollRef}></Box>

            </Box>

            <Box  bg={'gray.200'}>
                    <form onSubmit={handleFormSubmit}>
                        <Box px={'1.5em'} py={'1.5em'} display={'grid'} gap={'1em'} gridTemplateColumns={'1fr auto'} justifyContent={'space-between'} alignItems={'center'}>
                                <Input rounded={'xl'} bg={'gray.100'} border={'solid'} borderWidth={'1px'} outline={'none'} w={'100%'} onChange={(e)=>setFormValue(e.target.value)} value={formValue}  type="text" />
                                {/* <button type="submit">Send Message</button> */}
                                <Button type="submit">
                                    <BsArrowRightCircle type="submit" role="button" size={35} />
                                </Button>
                        </Box>
                    </form>
            </Box>
        </>
    )
}