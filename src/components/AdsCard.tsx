import { Box, Center, Heading, HStack, Text } from "native-base"
import React from "react"
import UserPhoto from "./UserPhoto"

const AdsCard = () => {
  return (
    <Box w={"46%"} m={"auto"} mb={8}>
      <Box bg={"gray.300"} h={"32"} rounded={"xl"} position={"relative"}>
        <HStack justifyContent={"space-between"}>
          <UserPhoto size={8} m={2} alt={"userimage"} />
          <Center m={2} py={1} px={3} bg={"gray.600"} rounded={"full"}>
            <Text
              color={"white"}
              fontWeight={"semibold"}
              textTransform={"uppercase"}
            >
              Usado
            </Text>
          </Center>
        </HStack>
      </Box>
      <Text fontSize={14} mt={2}>
        Tênis vermelho
      </Text>
      <Heading fontSize={18}>R$ 56,90</Heading>
    </Box>
  )
}

export default AdsCard
