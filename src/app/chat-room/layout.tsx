'use client'

import SideBar from "@/components/SideBar"
import { Box } from "@chakra-ui/react"
import { ReactNode } from "react"

interface layoutProps{
    children:ReactNode
}

export default function RootLayout({children}:layoutProps ){

    return(
        <>
            <Box className=" max-md:grid-cols-[1fr] grid-cols-[1fr,2fr]" display={'grid'}  justifyContent={'space-between'} w={'100%'} >
                <Box className=" max-md:hidden">
                    <SideBar/>
                </Box>
                <Box >
                    {children}
                </Box>
            </Box>
        </>
    )
}