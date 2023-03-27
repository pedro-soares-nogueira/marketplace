import { Box, Center, Heading, HStack, Icon, Text, VStack } from "native-base"
import React, { useState } from "react"
import { TouchableOpacity } from "react-native"
import UserPhoto from "./UserPhoto"
import { Entypo, Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "../routes/app.routes"

type AdsCardProps = {
  type: "used" | "new"
}

const AdsCard = ({ type }: AdsCardProps) => {
  const [disabled, setDisabled] = useState(false)
  const navigation = useNavigation<AppNavigatorRoutesProps>()

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
      <HStack justifyContent={"space-between"} alignItems={"center"}>
        <VStack>
          <Text fontSize={16} mt={2}>
            Tênis vermelho
          </Text>
          <Heading fontSize={20}>R$ 56,90</Heading>
        </VStack>

        <TouchableOpacity onPress={() => navigation.navigate("adDetails")}>
          <Icon
            as={Ionicons}
            name="arrow-forward"
            color="gray.800"
            size={8}
            m={4}
          />
        </TouchableOpacity>
      </HStack>
    </Box>
  )
}

export default AdsCard
