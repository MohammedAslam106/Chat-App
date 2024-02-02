"use client";
import firebase_app from "@/firebase/config";
import { Logout } from "@/firebase/services";
import {
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { collection } from "firebase/firestore";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, useDisclosure, useToast } from "@chakra-ui/react";

const db = getFirestore(firebase_app);

import { Image, Link } from "@chakra-ui/next-js";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import UserContainer from "./UserContainer";
import { User } from "@/types/user";
import MyModal from "./MyModal";

interface SideBarProps {}

export default function SideBar({}: SideBarProps) {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const { isOpen, onOpen, onClose } = useDisclosure()

  const linkRef = useRef<Array<HTMLDivElement | null>>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<any>();
  const [searchUser,setSearchUser]=useState('')
  const toast=useToast()

  useEffect(() => {
    linkRef;

    const userColRef = collection(db, "user");

    getDocs(userColRef)
      .then((res) => {
        res.docs.forEach((doc) => {
          let uid = doc.data().uid;
          if (
            JSON.stringify(uid) == window.localStorage.getItem("currentUser")
          ) {
            // console.log("Yes We Are Here");
            setCurrentUser({ ...doc.data() });
          }
        });
      })
      .catch((error) => console.log("Error: Getting user data"));

    const q = query(collection(db, "user"), orderBy("name"));
    let fetchedMessages: any = [];
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      // console.log(QuerySnapshot);
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data() });
      });
      setUsers(
        fetchedMessages.filter((user: any) => {
          return (
            JSON.stringify(user.uid) !==
            (window.localStorage.getItem("currentUser") || "")
          );
        })
      );
    });
  }, []);

  function handleSubmit(e:FormEvent){
    e.preventDefault()

    const searchResult=users.find((user)=>{
      return user.email==searchUser
    })?.email

    if(!searchUser.match(regex)){
      toast({
        title: 'Invalid Email for Invitation',
        description: "Please enter a valid email address to send the invitation.",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position:'top-right'
    })
    }else if(!searchResult){
      onOpen()
    }else{
      setUsers((prev)=>{
        return prev.filter((user)=> user.email==searchResult)
      })
    }
  }
  return (
    <>
      {/* {isSmallerThan850 && 
                <> */}
      <Box w={"100%"} h={"100svh"} overflow={"hidden"} bg={"gray.300"}>
        {" "}
        {/* Don't thouch this box it's main box*/}
        <Box
          bg={"gray.200"}
          shadow={"sm"}
          position={"relative"}
          transition={"all 0.1s ease-in 0s"}
          _hover={{ bg: "gray.300", textColor: "white" }}
          px={6}
          py={4}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text
            zIndex={1}
            textColor={"black.500"}
            fontSize={"0.9rem"}
            fontWeight={"600"}
          >
            {currentUser?.name}
          </Text>
          <Box className="parent-context-menu" role="button" >
            <Image
              objectFit="cover"
              unoptimized
              rounded={"100vmax"}
              borderColor={"black"}
              border={"solid"}
              shadow={"md"}
              alt="User Image"
              width={45}
              height={45}
              src={currentUser?.image}
            />

            <Box className="context-menu">
              <ul>
                <li>
                  <Button onClick={() => Logout()} type="button">
                    Logout
                  </Button>
                </li>
              </ul>
            </Box>
          </Box>
        </Box>
        {/* <Box px={4} py={3}> */}
        <Box px={4}>
          <form onSubmit={handleSubmit}>
            <Input
              bg={"gray.200"}
              my={3}
              placeholder="Search with email..."
              backgroundImage={"url(/G_logo.svg.png)"}
              backgroundPosition={"right"}
              backgroundSize={35}
              backgroundRepeat={"no-repeat"}
              outline={"none"}
              px={"1.5em"}
              py={"1em"}
              rounded={"100vmax"}
              border={"solid 1px"}
              shadow={"md"}
              textColor={"black.500"}
              borderColor={"gray"}
              _placeholder={{ px: 2, textColor: "gray.500" }}
              onChange={(e) => {
                setSearchUser(e.target.value)
                if (e.target.value != "") {
                  e.currentTarget.style.backgroundImage = "none";
                } else {
                  e.currentTarget.style.backgroundImage = "url(/G_logo.svg.png)";
                }
              }}
            />
          </form>
        </Box>
        <Box
          px={2}
          className="cool-scrollbar"
          h={"calc(100svh - 150px)"}
          overflowY={"scroll"}
        >
          {users.map((user, ind) => {
            return (
              <>
                <hr />
                <Link href={`/chat-room/${user.uid}`} key={user.uid}>
                  <UserContainer
                    onClick={() => {
                      // console.log(linkRef.current);
                      linkRef.current.forEach((item) => {
                        item?.classList.replace("active-link", "inactive-link");
                      });
                      linkRef.current[ind]?.classList.replace(
                        "inactive-link",
                        "active-link"
                      );
                    }}
                    linkRef={linkRef}
                    ind={ind}
                    className="inactive-link "
                    user={user}
                  />
                </Link>
                <hr />
              </>
            );
          })}
        </Box>
      </Box>{" "}
      {/* Don't thouch this box it's main box*/}

      <MyModal isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
          <form id="invite" onSubmit={async(e)=>{
            e.preventDefault()
            if(!searchUser.match(regex)){
              toast({
                title: 'Invalid Email for Invitation',
                description: "Please enter a valid email address to send the invitation.",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position:'top-right'
            })
          }else{
            const response= ( fetch('/api/send-invitation',{
              method:"POST",
              body:JSON.stringify({
                from:currentUser.email,
                to:searchUser,
                message:'Hey Lets Connect!'
              }),
              headers:{
                'Content-Type':"application/json"
              }
            }))
              toast.promise(response,{
                  success: { title: "Invitation Sent Successfully",
                  description: "Your friend has been invited to join us. Encourage them to connect and explore together!",position:'top' },
                  error: { title: "Invitation Failed",
                  description: "Oops! Something went wrong while sending the invitation. Please try again later, and make sure the provided email address is valid.",position:'top'  },
                  loading: { title: "Invitation Pending",
                  description: "Your invitation is in queue. Sit tight while we process the request. We'll notify you once it's sent!",position:'top'  },
              })
            response.then((res)=>{if(res.status==200){return res.json()}else {throw new Error(res.statusText)}}).then(re=>{if(re.id)onClose()}).catch((error)=>{
              console.log(error)
              toast({
                title:'Opps! Error',
                description:error,
                position:'top',
                status:'error',
                isClosable:true,
                duration:5000
              })
              onClose()
            })
          }
          }}>
        <ModalContent>
            <ModalHeader textColor={'red.300'} fontWeight={'semibold'} fontSize={'1.01rem'}>User Not Found: Extend an Invitation to Connect!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Input  type="email" value={searchUser} onChange={(e)=>setSearchUser(e.target.value)}/>
            </ModalBody>
  
            <ModalFooter>
              <Button type="button" variant={'ghost'}  mr={3} onClick={onClose}>
                Close
              </Button>
              <Button type="submit" colorScheme="blue">Send Invitation</Button>
            </ModalFooter>
          </ModalContent>
              </form>
      </MyModal>
    </>

    // }
    //     </>
  );
}
