import { Chat } from "@/types/chat"
import { User } from "@/types/user"
import { ConvertTime } from "@/utility/timeConverter"
import { Image } from "@chakra-ui/next-js"
import { Box, Container, Text } from "@chakra-ui/react"

interface ChartContainerProps{
    chat:Chat
    currentUser: User
    secondUser: User
}

export default function ChatContainer({chat,currentUser,secondUser}:ChartContainerProps ){
    const time=ConvertTime(chat.sentAt)
    return(
        <Box my={8} float={currentUser.uid==chat.person_1 ? 'right':'left'} marginLeft={currentUser.uid==chat.person_1 ? '60%':'2em'} marginRight={currentUser.uid!=chat.person_1 ? '60%':'2em'}>
            <Text>{new Date(time).toLocaleString()}</Text>
            <Image float={currentUser.uid==chat.person_1 ? 'right':'left'} rounded={'100vmax'}  alt="User Image" width={5} height={5} src={currentUser.uid==chat.person_1 ? currentUser.image : secondUser.image}/>
            <Container bg={'white'} fontWeight={'semibold'} rounded={'2xl'} textAlign={'left'} shadow={'md'} py={'1em'} maxW={'20em'}  w={'fit-content'} px={'1.5em'} >
                {chat.message}
            </Container>
        </Box>
    )
}