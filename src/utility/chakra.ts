import { useMediaQuery } from "@chakra-ui/react"

export const isMobile=()=>{
    const [isSmallerThan640]=useMediaQuery('max-width:640px')
    return isSmallerThan640
}