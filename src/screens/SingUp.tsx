import { useNavigation } from "@react-navigation/native"
import { Center, Heading, Box, Text, ScrollView, Icon } from "native-base"
import React from "react"
import LogoSVG from "../assets/logo_main.svg"
import Button from "../components/Button"
import Input from "../components/Input"
import UserPhoto from "../components/UserPhoto"
import { MaterialIcons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native"
import defaultImageUserPhoto from "../assets/avatar.png"

const SingUp = () => {
  const navigation = useNavigation()

  const handleGoBack = () => {
    navigation.goBack()
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Center bgColor={"gray.100"} flex={1} pb={"10"} mt={"16"}>
        <LogoSVG />
        <Box mx={20}>
          <Center>
            <Heading fontWeight={"bold"} fontSize={"3xl"} my="2">
              Boas vindas!
            </Heading>
            <Text
              fontFamily={"Poppins_500Medium"}
              fontSize={"md"}
              mb="8"
              textAlign={"center"}
            >
              Crie sua conta e use o espaço para comprar itens variados e vender
              seus produtos
            </Text>
          </Center>
          <Center mb={5} position={"relative"} maxW={150} m="auto">
            <UserPhoto
              source={defaultImageUserPhoto}
              size={100}
              alt="imagem do usuário"
            />
            <Box
              bgColor={"#647AC7"}
              rounded={"full"}
              p="2"
              bottom={0}
              right={0}
              position={"absolute"}
            >
              <TouchableOpacity>
                <Icon as={MaterialIcons} name="edit" size={5} color={"white"} />
              </TouchableOpacity>
            </Box>
          </Center>

          <Input placeholder="Nome" />
          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input placeholder="Telefone" keyboardType="phone-pad" />
          <Input placeholder="Senha" secureTextEntry />
          <Input placeholder="Confirme sua senha" secureTextEntry />
          <Button title="Entrar" />
        </Box>

        <Box w="65%" pt={"20"}>
          <Center>
            <Text fontFamily={"Poppins_500Medium"} fontSize={"lg"} mb="5">
              Já tem uma conta?
            </Text>
          </Center>
          <Button
            title="Voltar e logar"
            variant={"outline"}
            onPress={handleGoBack}
          />
        </Box>
      </Center>
    </ScrollView>
  )
}

export default SingUp
