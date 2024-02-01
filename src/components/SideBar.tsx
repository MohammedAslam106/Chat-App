'use client'
import firebase_app from "@/firebase/config"
import { Logout } from "@/firebase/services"
import { getDocs, getFirestore,onSnapshot,orderBy,query } from "firebase/firestore"

import { addDoc,serverTimestamp,collection } from "firebase/firestore"
import { useEffect, useRef, useState } from "react"
import { TbUser, TbUserCircle } from "react-icons/tb"
import { useMediaQuery } from "@chakra-ui/react"


interface pageProps{
    
}
const db=getFirestore(firebase_app)


import { Image, Link } from "@chakra-ui/next-js";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import UserContainer from "./UserContainer"
import { User } from "@/types/user"

interface SideBarProps{
    
}

export default function SideBar({}:SideBarProps ){

    const [isSmallerThan850]=useMediaQuery('min-width:850px')

    const linkRef=useRef<Array<HTMLDivElement | null>>([])
    const [users,setUsers]=useState<User[]>([])
    const [currentUser,setCurrentUser]=useState<any>()
    const dummyUser=[
        {
            email: 'mohammedaslam4106@gmail.com',
            name: 'Mohammed Aslam',
            image: 'https://avatars.githubusercontent.com/u/117932780?v=4',
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2'
          },
          {
            email: 'mohammedaslam4106@gmail.com',
            name: 'Mohammed Aslam',
            image: 'https://avatars.githubusercontent.com/u/117932780?v=4',
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2'
          },
          {
            email: 'mohammedaslam4106@gmail.com',
            name: 'Mohammed Aslam',
            image: 'https://avatars.githubusercontent.com/u/117932780?v=4',
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2'
          },
          {
            email: 'mohammedaslam4106@gmail.com',
            name: 'Mohammed Aslam',
            image: 'https://avatars.githubusercontent.com/u/117932780?v=4',
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2'
          },
          {
            email: 'mohammedaslam4106@gmail.com',
            name: 'Mohammed Aslam',
            image: 'https://avatars.githubusercontent.com/u/117932780?v=4',
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2'
          },
          {
            email: 'mohammedaslam4106@gmail.com',
            name: 'Mohammed Aslam',
            image: 'https://avatars.githubusercontent.com/u/117932780?v=4',
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2'
          },
          {
            email: 'mohammedaslam4106@gmail.com',
            name: 'Mohammed Aslam',
            image: 'https://avatars.githubusercontent.com/u/117932780?v=4',
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2'
          },
          {
            email: 'mohammedaslam4106@gmail.com',
            name: 'Mohammed Aslam',
            image: 'https://avatars.githubusercontent.com/u/117932780?v=4',
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2'
          },
          {
            email: 'mohammedaslam4106@gmail.com',
            name: 'Mohammed Aslam',
            image: 'https://avatars.githubusercontent.com/u/117932780?v=4',
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2'
          },
          {
            email: 'mohammedaslam4106@gmail.com',
            name: 'Mohammed Aslam',
            image: 'https://avatars.githubusercontent.com/u/117932780?v=4',
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2'
          },
          {
            email: 'mohammedaslam4106@gmail.com',
            name: 'Mohammed Aslam',
            image: 'https://avatars.githubusercontent.com/u/117932780?v=4',
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2'
          },
          {
            email: 'mohammedaslam4106@gmail.com',
            name: 'Mohammed Aslam',
            image: 'https://avatars.githubusercontent.com/u/117932780?v=4',
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2'
          },
          {
            email: 'mohammedaslam4106@gmail.com',
            name: 'Mohammed Aslam',
            image: 'https://avatars.githubusercontent.com/u/117932780?v=4',
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2'
          },
          {
            email: 'mohammedaslam4106@gmail.com',
            name: 'Mohammed Aslam',
            image: 'https://avatars.githubusercontent.com/u/117932780?v=4',
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2'
          },
          {
            email: 'mohammedaslam4106@gmail.com',
            name: 'Mohammed Aslam',
            image: 'https://avatars.githubusercontent.com/u/117932780?v=4',
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2'
          },
          {
            email: 'mohammedaslam4106@gmail.com',
            name: 'Mohammed Aslam',
            image: 'https://avatars.githubusercontent.com/u/117932780?v=4',
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2'
          },
          {
            email: 'mohammedaslam4106@gmail.com',
            name: 'Mohammed Aslam',
            image: 'https://avatars.githubusercontent.com/u/117932780?v=4',
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2'
          },
          {
            email: 'mohammedaslam4106@gmail.com',
            name: 'Mohammed Aslam',
            image: 'https://avatars.githubusercontent.com/u/117932780?v=4',
            uid: 'hjIrEijs2kNqaMPLvfU0ZZ2KPqq2'
          }
    ]

    useEffect(() => {

        linkRef

        const userColRef=collection(db,'user')

        getDocs(userColRef).then((res)=>{

            res.docs.forEach((doc)=>{  
                let uid=doc.data().uid
                if(JSON.stringify(uid)==window.localStorage.getItem('currentUser')){
                    console.log('Yes We Are Here')
                    setCurrentUser({...doc.data()})
                }
            })
        }).catch((error)=>console.log('Error: Getting user data'))

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
        <>
            {/* {isSmallerThan850 && 
                <> */}
            <Box w={'100%'} h={'100svh'} overflow={'hidden'} bg={'blue.200'}> {/* Don't thouch this box it's main box*/}
                    <Box bg={'gray.200'} shadow={'sm'} position={'relative'} transition={'all 0.1s ease-in 0s'} _hover={{bg:'gray.300',textColor:'white'}} px={6} py={4} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                            <Text zIndex={1} textColor={'black.500'} fontSize={'0.9rem'} fontWeight={'600'}>
                                {currentUser?.name}
                            </Text>
                            <Box className="parent-context-menu"  role="button"  >
                                <Image objectFit="cover" unoptimized rounded={'100vmax'} borderColor={'black'} border={'solid'} shadow={'md'} alt="User Image" width={45} height={45} src={currentUser?.image}/>

                                <Box className="context-menu" >
                                    <ul>
                                        <li>
                                            <Button onClick={()=>Logout()} type="button">Logout</Button>
                                        </li>
                                    </ul>
                                </Box>
                            </Box>
                        </Box>
                    {/* <Box px={4} py={3}> */}
                        <Box px={4} >
                            <Input bg={'gray.200'}  my={3} placeholder="Search with email..." backgroundImage={'url(/G_logo.svg.png)'} backgroundPosition={'right'} backgroundSize={35} backgroundRepeat={'no-repeat'} outline={'none'} px={'1.5em'} py={'1em'} rounded={'100vmax'} border={'solid 1px'} shadow={'md'} textColor={'black.500'} borderColor={'gray'} _placeholder={{px:2,textColor:'gray.500'}} onChange={(e)=>{
                                if(e.target.value!=''){
                                    e.currentTarget.style.backgroundImage='none'
                                }else{
                                    e.currentTarget.style.backgroundImage='url(/G_logo.svg.png)'
                                }
                            }} />

                        </Box>

                        <Box px={2} className="cool-scrollbar" h={'calc(100svh - 150px)'} overflowY={'scroll'} >
                            {users.map((user,ind)=>{
                                return(
                                    <>
                                        <hr/>
                                        <Link href={`/chat-room/${user.uid}`} key={user.uid}>
                                            <UserContainer onClick={()=>{
                                                console.log(linkRef.current)
                                                linkRef.current.forEach((item)=>{
                                                    item?.classList.replace('active-link','inactive-link')
                                                })
                                                linkRef.current[ind]?.classList.replace('inactive-link','active-link')
                                        }} linkRef={linkRef} ind={ind} className="inactive-link my-3" user={user} />
                                        </Link>
                                        <hr/>
                                    </>
                                )
                            })}
                        </Box>


        </Box> {/* Don't thouch this box it's main box*/}
        </>
        
    // }  
    //     </>
    )
}