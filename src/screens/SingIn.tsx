import { useNavigation } from "@react-navigation/native"
import { Box, Center, Heading, Text } from "native-base"
import React from "react"
import LogoSVG from "../assets/logo_main.svg"
import Button from "../components/Button"
import Input from "../components/Input"
import AuthNavigatorRoutesProps from "../routes/auth.routes"

const SingIn = () => {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleNewAccount() {
    navigation.navigate("signUp")
  }

  return (
    <Center>
      <Center
        pt={"48"}
        pb={"32"}
        bgColor={"gray.200"}
        borderBottomRadius={"3xl"}
        mb="16"
      >
        <LogoSVG />
        <Heading fontWeight={"bold"} fontSize={"3xl"} mt="10" mb="2">
          Marketspace
        </Heading>
        <Text fontFamily={"Poppins_500Medium"} fontSize={"lg"} mb="8">
          Seu lugar de compra e venda!
        </Text>

        <Box mx={20}>
          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input placeholder="Senha" secureTextEntry />
          <Button title="Entrar" />
        </Box>
      </Center>

      <Box w="65%" pt={"20"}>
        <Center>
          <Text fontFamily={"Poppins_500Medium"} fontSize={"lg"} mb="5">
            Ainda não tem uma conta?
          </Text>
        </Center>
        <Button
          title="Criar conta"
          variant={"outline"}
          onPress={handleNewAccount}
        />
      </Box>
    </Center>
  )
}

export default SingIn
