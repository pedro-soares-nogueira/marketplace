import { Box, Icon, Text } from "native-base"
import React, { useState } from "react"
import Button from "./Button"
import UserPhoto from "./UserPhoto"
import { MaterialIcons } from "@expo/vector-icons"
import defaultImageUserPhoto from "../assets/avatar.png"
import { useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "../routes/app.routes"

const HomeHeader = () => {
  const [userPhoto, setUserPhoto] = useState("")
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  return (
    <Box
      mt={"12"}
      p={6}
      flexDirection={"row"}
      alignItems="center"
      justifyContent={"space-between"}
    >
      <Box flexDirection={"row"} alignItems="center" justifyContent={"center"}>
        {userPhoto ? (
          <UserPhoto
            source={{ uri: userPhoto }}
            size={16}
            mr={3}
            alt="imagem do usuário"
          />
        ) : (
          <UserPhoto
            source={defaultImageUserPhoto}
            size={16}
            mr={3}
            alt="imagem do usuário"
          />
        )}
        <Box>
          <Text fontSize={16}>Boas vindas, </Text>
          <Text fontWeight={"bold"} fontSize={20}>
            Pedro
          </Text>
        </Box>
      </Box>
      <Button
        onPress={() => navigation.navigate("newAdform")}
        title="Criar Anúncio"
        px={6}
        leftIcon={<Icon as={MaterialIcons} name="add" color="white" size={6} />}
      />
    </Box>
  )
}

export default HomeHeader
