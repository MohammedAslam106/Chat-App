'use client'

import { Image, Link } from "@chakra-ui/next-js";
import { Box } from "@chakra-ui/react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { User } from "@/types/user";

interface NavBarProps {
    secondUser: User
}

export default function NavBar({ secondUser }: NavBarProps) {
    return (
        <Box borderX={'solid 1px'} bg={'gray.200'} px={'3em'} py={'1em'}>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Link href={'/chat-room'}>
                    <IoMdArrowRoundBack size={25} />
                </Link>
                <Image unoptimized rounded={'100vmax'} shadow={'sm'} width={10} height={10} alt="User Image" src={secondUser?.image} />
            </Box>
        </Box>
    )
}