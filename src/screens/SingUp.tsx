import { Center, Heading, Box, Text, ScrollView } from "native-base"
import React from "react"
import LogoSVG from "../assets/logo_main.svg"
import Button from "../components/Button"
import Input from "../components/Input"

const SingUp = () => {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Center bgColor={"gray.100"} flex={1} pb={"10"}>
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
          <Button title="Voltar e logar" variant={"outline"} />
        </Box>
      </Center>
    </ScrollView>
  )
}

export default SingUp
