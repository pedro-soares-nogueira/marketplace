import { useNavigation } from "@react-navigation/native"
import {
  Box,
  Center,
  Heading,
  Text,
  ScrollView,
  Icon,
  Pressable,
  useToast,
} from "native-base"
import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import LogoSVG from "../assets/logo_main.svg"
import Button from "../components/Button"
import Input from "../components/Input"
import AuthNavigatorRoutesProps from "../routes/auth.routes"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { MaterialIcons } from "@expo/vector-icons"
import { useAuth } from "../contexts/AuthContext"
import { AppError } from "../utils/AppError"

type FormSingInProps = {
  email: string
  password: string
}

const singInSchema = yup.object({
  email: yup.string().email("Email obrigatório"),
  password: yup.string().min(6, "Min de 6 caracteres"),
})

const SingIn = () => {
  const { signIn } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const [show, setShow] = useState(false)
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSingInProps>({
    resolver: yupResolver(singInSchema),
  })

  const handleNewAccount = () => {
    navigation.navigate("signUp")
  }

  const handleSingIn = async ({ email, password }: FormSingInProps) => {
    try {
      setIsLoading(true)
      await signIn(email, password)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : "Não foi possível logar."

      setIsLoading(false)

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Center>
        <Center py={"32"} borderBottomRadius={"3xl"} mb="32">
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
                  onChangeText={onChange}
                  errorMessage={errors.email?.message}
                  type={show ? "text" : "password"}
                  InputRightElement={
                    <Pressable onPress={() => setShow(!show)}>
                      <Icon
                        as={
                          <MaterialIcons
                            name={show ? "visibility" : "visibility-off"}
                          />
                        }
                        size={5}
                        mr="2"
                        color="muted.400"
                      />
                    </Pressable>
                  }
                />
              )}
            />

            <Button title="Entrar" onPress={handleSubmit(handleSingIn)} />
          </Box>
        </Center>

        <Box bg={"white"} w="full" h={"xs"}>
          <Box pt={"32"} pb={10} mx={20}>
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
        </Box>
      </Center>
    </ScrollView>
  )
}

export default SingIn
