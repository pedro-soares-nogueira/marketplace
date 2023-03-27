import { Box, Center, Heading, HStack, Text } from "native-base"
import React, { useState } from "react"
import UserPhoto from "./UserPhoto"

type AdsCardProps = {
  type: "used" | "new"
}

const AdsCard = ({ type }: AdsCardProps) => {
  const [disabled, setDisabled] = useState(true)

  return (
    <Box w={"full"} mb={8} mr={4} opacity={disabled ? "50" : "1"}>
      <Box bg={"gray.300"} h={"48"} rounded={"xl"} position={"relative"}>
        <HStack justifyContent={"space-between"}>
          <UserPhoto size={8} m={2} alt={"userimage"} />
          {type === "used" && (
            <Center m={2} py={1} px={3} bg={"gray.600"} rounded={"full"}>
              <Text
                color={"white"}
                fontWeight={"semibold"}
                textTransform={"uppercase"}
              >
                Usado
              </Text>
            </Center>
          )}

          {type === "new" && (
            <Center m={2} py={1} px={3} bg={"#647AC7"} rounded={"full"}>
              <Text
                color={"white"}
                fontWeight={"semibold"}
                textTransform={"uppercase"}
              >
                Novo
              </Text>
            </Center>
          )}
        </HStack>
        {disabled && (
          <Center mt={10}>
            <Heading>Desativado</Heading>
          </Center>
        )}
      </Box>
      <Text fontSize={16} mt={2}>
        Tênis vermelho
      </Text>
      <Heading fontSize={20}>R$ 56,90</Heading>
    </Box>
  )
}

export default AdsCard
