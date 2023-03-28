import { useNavigation } from "@react-navigation/native"
import {
  Center,
  Heading,
  Box,
  Text,
  ScrollView,
  Icon,
  Pressable,
  useToast,
} from "native-base"
import React, { useState } from "react"
import LogoSVG from "../assets/logo_main.svg"
import Button from "../components/Button"
import Input from "../components/Input"
import UserPhoto from "../components/UserPhoto"
import { MaterialIcons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native"
import defaultImageUserPhoto from "../assets/avatar.png"
import * as ImagePicker from "expo-image-picker"
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { api } from "../services/api"
import * as FileSystem from "expo-file-system"
import { AppError } from "../utils/AppError"

type UserPhotoProps = {
  photo: {
    uri: string
    name: string
    type: string
  }
}

type FormSingUpProps = {
  name: string
  email: string
  phone: number
  password: string
  password_confirm: string
}

const singUpSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  phone: yup
    .number()
    .required("Informe o telefone.")
    .min(6, "A senha deve ter pelo menos 8 dígitos."),
  email: yup.string().required("Informe o e-mail").email("E-mail inválido."),
  password: yup
    .string()
    .required("Informe a senha")
    .min(6, "A senha deve ter pelo menos 6 dígitos."),
  password_confirm: yup
    .string()
    .required("Confirme a senha.")
    .oneOf([yup.ref("password")], "A confirmação da senha não confere"),
})

const SingUp = () => {
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState({} as UserPhotoProps)
  const navigation = useNavigation()
  const toast = useToast()

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormSingUpProps>({
    resolver: yupResolver(singUpSchema),
  })

  const handleSingUp = async (data: FormSingUpProps) => {
    const { name, email, phone, password } = data
    try {
      setIsLoading(true)
      const userForm = new FormData()

      const userAvatar: any = {
        ...userPhoto.photo,
        name: `${name}.${userPhoto.photo.name}`.toLowerCase(),
      }

      userForm.append("avatar", userAvatar)
      userForm.append("name", name)
      userForm.append("email", email)
      userForm.append("tel", phone.toString())
      userForm.append("password", password)

      await api.post("/users", userForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      toast.show({
        title: "Usuário cadastrado com sucesso!",
        placement: "top",
        top: "4",
        bgColor: "green.500",
      })
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : "Não foi possível criar a conta."

      toast.show({
        title,
        placement: "top",
        top: "4",
        bgColor: "red.500",
      })
    }
  }

  const handleGoBack = () => {
    navigation.goBack()
  }

  const handleUserImageSelect = async () => {
    setIsLoading(true)

    const photoSelected = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 4],
      allowsEditing: true,
    })

    if (photoSelected.canceled) {
      return
    }

    if (photoSelected.assets[0].uri) {
      const photoInfo = await FileSystem.getInfoAsync(
        photoSelected.assets[0].uri
      )

      const fileExtension = photoSelected.assets[0].uri.split(".").pop()

      const photoFile = {
        name: `${fileExtension}`.toLowerCase(),
        uri: photoSelected.assets[0].uri,
        type: `${photoSelected.assets[0].type}/${fileExtension}`,
      } as any

      setUserPhoto({
        photo: { ...photoFile },
      })

      toast.show({
        title: "Foto selecionada!",
        placement: "top",
        top: "4",
        bgColor: "green.600",
      })

      setIsLoading(false)
    }
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
            {userPhoto.photo ? (
              <UserPhoto
                source={{ uri: userPhoto.photo?.uri }}
                size={100}
                alt="imagem do usuário"
              />
            ) : (
              <UserPhoto
                source={defaultImageUserPhoto}
                size={100}
                alt="imagem do usuário"
              />
            )}
            <Box
              bgColor={"#647AC7"}
              rounded={"full"}
              p="2"
              bottom={0}
              right={0}
              position={"absolute"}
            >
              <TouchableOpacity onPress={handleUserImageSelect}>
                <Icon as={MaterialIcons} name="edit" size={5} color={"white"} />
              </TouchableOpacity>
            </Box>
          </Center>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Nome"
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />
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
            name="phone"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Telefone"
                keyboardType="phone-pad"
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.phone?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Senha"
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.password?.message}
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
          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Confirme a senha"
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.password_confirm?.message}
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
          <Button
            title="Entrar"
            onPress={handleSubmit(handleSingUp)}
            isLoading={isLoading}
          />
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
