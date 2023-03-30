import { Box, Icon, Text } from "native-base"
import React, { useState } from "react"
import Button from "./Button"
import UserPhoto from "./UserPhoto"
import { MaterialIcons } from "@expo/vector-icons"
import defaultImageUserPhoto from "../assets/avatar.png"
import { useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "../routes/app.routes"
import { useAuth } from "../contexts/AuthContext"
import { api } from "../services/api"

const HomeHeader = () => {
  const { user } = useAuth()
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
        {user.avatar ? (
          <UserPhoto
            source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}` }}
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
            {user.name}
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
