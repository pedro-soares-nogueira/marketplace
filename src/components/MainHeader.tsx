import { Box, Heading, Icon, Text, VStack } from "native-base"
import React from "react"
import { TouchableOpacity } from "react-native"
import { Entypo, Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "../routes/app.routes"

const MainHeader = () => {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  return (
    <>
      <Box
        mt={"12"}
        p={6}
        flexDirection={"row"}
        alignItems="center"
        justifyContent={"space-between"}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon as={Ionicons} name="arrow-back" color="gray.800" size={8} />
        </TouchableOpacity>
        <Heading>Meus anúncios</Heading>
        <TouchableOpacity>
          <Icon as={Entypo} name="plus" color="gray.800" size={8} />
        </TouchableOpacity>
      </Box>
    </>
  )
}

export default MainHeader
