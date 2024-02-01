"use client";
import SideBar from "@/components/SideBar";
import { Box } from "@chakra-ui/react";
import Image from "next/image";

interface pageProps { }

export default function page({ }: pageProps) {
    return (
        <>
            {/* Large Devices */}
            <Box
                className="chat-room-logo"
                bg={"gray.200"}
                w={"100%"}
                h={"100svh"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <Image
                    width={250}
                    height={250}
                    src={"/Chat_Logo.svg"}
                    alt="Chat-Logo"
                />
            </Box>

            {/* Smaller Devices */}
            <Box className=" chat-room-sidebar">
                <SideBar />
            </Box>
        </>
    );
}
