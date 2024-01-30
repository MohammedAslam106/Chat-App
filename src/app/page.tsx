'use client'
import Image from "next/image";
import { Box, Button, Flex, Grid } from "@chakra-ui/react";
import { Logout, SignInWithGithub, SinginWithGoogle } from "@/firebase/services";


export default function Home() {
  return (
    <Grid justifyContent={'center'} alignItems={'center'} h={'100svh'}>
      <Flex className=" max-sm:flex-col" gap={2}>
        <Button onClick={()=>{
          SinginWithGoogle()
        }} fontSize={{ base: "0.6rem", md: "0.8rem", lg: "1rem" }} fontWeight={'semibold'} maxW={'fit-content'} px={'2.5em'} py={'1.3em'} rounded={'100vmax'} shadow={'md'} bg={"gray.100"} textColor={'black.500'}>
          <Box display={'flex'} gap={'2'} justifyContent={'center'} alignItems={'center'}>
            <Image alt="Google Logo" width={25} height={25} src={'/G_logo.svg.png'}/>
            <h1>
              Signin With Google
            </h1>
          </Box>
        </Button>

        <Button onClick={()=>{
          SignInWithGithub()
        }} fontSize={{ base: "0.6rem", md: "0.8rem", lg: "1rem" }} fontWeight={'semibold'} maxW={'fit-content'} px={'2.5em'} py={'1.3em'} rounded={'100vmax'}  shadow={'md'} bg={"gray.100"} textColor={'black.500'}>
          <Box display={'flex'} gap={'2'} justifyContent={'center'} alignItems={'center'}>
            <Image alt="GitHub Logo" width={25} height={25} src={'/Github_Logo.svg.png'}/>
            <h1>
              Signin With GitHub
            </h1>
          </Box>
        </Button>
      </Flex>

    </Grid>
  );
}
