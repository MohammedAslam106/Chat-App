'use client'

import { ChakraProvider } from "@chakra-ui/react"
import { ReactNode } from "react"

interface ChakraProps{
    children:ReactNode
}

export default function Chakra({children}:ChakraProps ){
    return(
        <ChakraProvider>
            {children}
        </ChakraProvider>
    )
}