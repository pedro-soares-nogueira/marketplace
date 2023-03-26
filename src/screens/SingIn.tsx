import { useNavigation } from "@react-navigation/native"
import { Box, Center, Heading, Text, ScrollView } from "native-base"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import LogoSVG from "../assets/logo_main.svg"
import Button from "../components/Button"
import Input from "../components/Input"
import AuthNavigatorRoutesProps from "../routes/auth.routes"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

type FormSingInProps = {
  email: string
  password: string
}

const singInSchema = yup.object({
  email: yup.string().email("Email obrigatório"),
  password: yup.string().min(3, "Min de 3 caracteres"),
})

const SingIn = () => {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSingInProps>({
    resolver: yupResolver(singInSchema),
  })

  console.log(errors.email, errors.password)

  const handleNewAccount = () => {
    navigation.navigate("signUp")
  }

  const handleSingIn = ({ email, password }: FormSingInProps) => {
    console.log(email, password)
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Center>
        <Center
          py={"32"}
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
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  onChangeText={onChange}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Button title="Entrar" onPress={handleSubmit(handleSingIn)} />
          </Box>
        </Center>

        <Box w="65%" pt={"32"} pb={10}>
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
    </ScrollView>
  )
}

export default SingIn
