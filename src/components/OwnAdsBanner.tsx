import { Box, Heading, HStack, Icon, Text } from "native-base"
import React from "react"
import { TouchableOpacity } from "react-native"
import { MaterialIcons, AntDesign } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "../routes/app.routes"

const OwnAdsBanner = () => {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const handleAdDetails = () => {
    navigation.navigate("ownAds")
  }
  return (
    <Box px={6} my={8}>
      <Text fontSize={14} mb={2} fontFamily={"body"}>
        Seus produtos anunciados para venda
      </Text>
      <TouchableOpacity onPress={handleAdDetails}>
        <HStack
          bg={"blue.100"}
          rounded={6}
          p={4}
          justifyContent={"space-between"}
        >
          <HStack>
            <Icon
              as={MaterialIcons}
              name="bookmark"
              color="blue.600"
              size={8}
              mr={4}
            />
            <Box>
              <Heading>4</Heading>
              <Text fontSize={"md"}>anúncios ativos</Text>
            </Box>
          </HStack>

          <HStack alignItems={"center"} justifyContent={"center"}>
            <Text fontWeight={"bold"} fontSize={18} color={"blue.600"} mr={2}>
              Meus anúncios
            </Text>
            <Icon
              as={AntDesign}
              name="arrowright"
              color="blue.600"
              size={6}
              mr={4}
            />
          </HStack>
        </HStack>
      </TouchableOpacity>
    </Box>
  )
}

export default OwnAdsBanner
