'use client'

import SideBar from "@/components/SideBar"
import { Box } from "@chakra-ui/react"
import { ReactNode } from "react"

interface layoutProps {
    children: ReactNode
}

export default function RootLayout({ children }: layoutProps) {

    return (
        <>
            <Box className=" chat-room-partioner" display={'grid'} justifyContent={'space-between'} w={'100%'} >
                <Box className=" md-side-bar">
                    <SideBar />
                </Box>
                <Box h={'100svh'}>
                    {children}
                </Box>
            </Box>
        </>
    )
}