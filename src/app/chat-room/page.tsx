'use client'
import SideBar from "@/components/SideBar"
import firebase_app from "@/firebase/config"
import { Logout } from "@/firebase/services"
import { Box, Button, Text } from "@chakra-ui/react"
import { getFirestore,onSnapshot,orderBy,query } from "firebase/firestore"

import { addDoc,serverTimestamp,collection } from "firebase/firestore"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

interface pageProps{
    
}
const db=getFirestore(firebase_app)


export default function page({}:pageProps ){
    
    return(
        <>
            {/* Large Devices */}
            <Box className="max-md:hidden  flex" bg={'gray.200'} w={'100%'} h={'100svh'} justifyContent={'center'} alignItems={'center'}>
                <Image width={250} height={250} src={'/Chat_Logo.svg'} alt="Chat-Logo"/>
            </Box>
        
            {/* Smaller Devices */}
            <Box className=" hidden max-md:block">
                <SideBar/>
            </Box>
        </>
    )
}