import SideBar from "@/components/SideBar"
import { Box, Flex } from "@chakra-ui/react"
import { ReactNode } from "react"

interface layoutProps{
    children:ReactNode
}

export default function RootLayout({children}:layoutProps ){
    return(
        <>
            <Box display={'grid'} gridTemplateColumns={'1fr 2fr'} justifyContent={'space-between'} w={'100%'} >
                <SideBar/>
                <Box >
                    {children}
                </Box>
            </Box>
        </>
    )
}