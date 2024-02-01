import { Chat } from "@/types/chat"
import { User } from "@/types/user"
import { ConvertTime } from "@/utility/timeConverter"
import { Image } from "@chakra-ui/next-js"
import { Box, Container, Text } from "@chakra-ui/react"

interface ChartContainerProps {
    chat: Chat
    currentUser: User
    secondUser: User
}

export default function ChatContainer({ chat, currentUser, secondUser }: ChartContainerProps) {
    const time = ConvertTime(chat.sentAt)
    return (
        // Chat-Container-1
        // <Box className=" max-sm:text-[.8rem]" my={8} float={currentUser.uid==chat.person_1 ? 'right':'left'} marginLeft={currentUser.uid==chat.person_1 ? '50%':'1.5em'} marginRight={currentUser.uid!=chat.person_1 ? '50%':'1.5em'}>
        //     <Text>{new Date(time).toLocaleString()}</Text>
        //     <Image float={currentUser.uid==chat.person_1 ? 'right':'left'} rounded={'100vmax'}  alt="User Image" width={5} height={5} src={currentUser.uid==chat.person_1 ? currentUser.image : secondUser.image}/>
        //     <Container bg={'white'} fontWeight={'semibold'} rounded={'2xl'} textAlign={'left'} shadow={'md'} py={'1em'} maxW={'20em'}  w={'fit-content'} px={'1.5em'} >
        //         {chat.message}
        //     </Container>
        // </Box>


        // Chat-Container-2
        // <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={currentUser.uid==chat.person_1 ?'end':'start'} className=" max-sm:text-[.8rem]" my={8} marginLeft={currentUser.uid==chat.person_1 ? '50%':'1.5em'} marginRight={currentUser.uid!=chat.person_1 ? '50%':'1.5em'}>

        //     <Box  display={'flex'} flexDirection={currentUser.uid==chat.person_1 ?'row':'row-reverse'}>
        //         <Text>{new Date(time).toLocaleString()}</Text>
        //         <Image  rounded={'100vmax'}  alt="User Image" width={5} height={5} src={currentUser.uid==chat.person_1 ? currentUser.image : secondUser.image}/>
        //     </Box>

        //     <Container  bg={'white'} fontWeight={'semibold'} rounded={'2xl'} textAlign={'left'} shadow={'md'} py={'1em'} maxW={'20em'}  w={'fit-content'} px={'1.5em'} >
        //         {chat.message}
        //     </Container>
        // </Box>


        // Chat-Container-3
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={currentUser.uid == chat.person_1 ? 'end' : 'start'} className=" chat-container" my={8} marginLeft={currentUser.uid == chat.person_1 ? '50%' : '1.5em'} marginRight={currentUser.uid != chat.person_1 ? '50%' : '1.5em'}>

            <Box display={'flex'} flexDirection={currentUser.uid == chat.person_1 ? 'row' : 'row-reverse'} alignItems={'center'} gap={2}>
                <Text>{new Date(time).toLocaleString()}</Text>
                <Image rounded={'100vmax'} alt="User Image" width={5} height={5} src={currentUser.uid == chat.person_1 ? currentUser.image : secondUser.image} />
            </Box>

            <Container bg={'white'} m={0} fontWeight={'semibold'} rounded={'2xl'} textAlign={'left'} shadow={'md'} py={'1em'} maxW={'20em'} w={'100%'} px={'1.5em'} >
                {chat.message}
            </Container>
        </Box>
    )
}