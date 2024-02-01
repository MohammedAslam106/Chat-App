
import { Box, Container, Text } from "@chakra-ui/react";
import { User } from "@/types/user";
import { Image } from "@chakra-ui/next-js";
import { MutableRefObject } from "react";

interface UserContainerProps{
    user:User
    className:string
    linkRef:MutableRefObject<Array<HTMLDivElement | null>>
    ind:number
    onClick:()=>void
}

export default function UserContainer({user,className,linkRef,onClick,ind}:UserContainerProps ){
    return(
        <Container my={3} onClick={()=>onClick()} ref={(e)=>linkRef.current[ind]=e} className={className} _hover={{bg:'gray.200',shadow:'md'}} transition={'all .1s ease-in 0s'} rounded={10} py={'0.8em'}  display={'flex'} justifyContent={'start'} gap={4} alignItems={'center'}>
            <Image rounded={'100vmax'} border={'solid 1px'} alt="user profile" width={50} height={50} src={user.image}/>
            <Box wordBreak={'normal'} textOverflow={'ellipsis'} overflow={'hidden'}>
                <Text fontSize={'1.05rem'} fontWeight={'semibold'} >{user.name}</Text>
                <Text fontSize={'0.8rem'}>{user.uid}</Text>
            </Box>
        </Container>
    )
}