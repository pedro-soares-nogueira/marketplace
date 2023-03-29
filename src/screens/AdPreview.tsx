import {
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  useToast,
  VStack,
} from "native-base"
import React, { useState } from "react"
import { Dimensions, FlatList, ScrollView } from "react-native"
import UserPhoto from "../components/UserPhoto"
import Button from "../components/Button"
import {
  AntDesign,
  FontAwesome5,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons"
import { AdPreviewDTO } from "../models/AdPreviewDTO"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useAuth } from "../contexts/AuthContext"
import { api } from "../services/api"
import { priceFormatter } from "../utils/formatter"
import { AppNavigatorRoutesProps } from "../routes/app.routes"
import { AppError } from "../utils/AppError"
import { useAds } from "../contexts/AdContext"
import { PayMethod } from "../components/PayMethod"

type RouteParams = {
  adPreview: AdPreviewDTO
}

const AdPreview = () => {
  const { createAd } = useAds()
  const { user } = useAuth()
  const route = useRoute()
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const { width } = Dimensions.get("window")

  const { adPreview } = route.params as RouteParams

  const handlePublishAd = async () => {
    try {
      setIsLoading(true)

      await createAd(adPreview)

      toast.show({
        title: "Anúncio criado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      })

      navigation.navigate("ownAds")
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : "Não foi possivel criar o anúncio..."

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
      <Box flex={1}>
        <Box
          mt={"12"}
          p={6}
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"space-between"}
          bgColor={"#647AC7"}
        >
          <Heading>Pré visualização do anúncio</Heading>
          <Text>É assim que seu anúncio vai aparecer!!</Text>
        </Box>

        <Box>
          <FlatList
            data={adPreview.imagesUri}
            keyExtractor={(item) => item}
            horizontal
            pagingEnabled
            renderItem={({ item }) => (
              <Box bgColor={"gray.700"} w={width} h="400px" key={item}>
                <Image
                  w={width}
                  h="400px"
                  mb={8}
                  source={{
                    uri: item,
                  }}
                  alt="Imagem do produto"
                  resizeMode="cover"
                />
              </Box>
            )}
          />
        </Box>

        <VStack py="6" px={6} flex={1}>
          <HStack alignItems={"center"}>
            <UserPhoto
              size={10}
              alt=""
              mr={2}
              source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}` }}
            />
            <Heading fontSize={"lg"}>{user.name}</Heading>
          </HStack>

          <HStack mt={10}>
            {adPreview.is_new ? (
              <Center py={1} px={3} bg={"#647AC7"} rounded={"full"}>
                <Text
                  color={"white"}
                  fontWeight={"semibold"}
                  textTransform={"uppercase"}
                >
                  Novo
                </Text>
              </Center>
            ) : (
              <Center py={1} px={3} bg={"gray.600"} rounded={"full"}>
                <Text
                  color={"white"}
                  fontWeight={"semibold"}
                  textTransform={"uppercase"}
                >
                  Usado
                </Text>
              </Center>
            )}
          </HStack>

          <HStack w="full" mt="8" justifyContent={"space-between"}>
            <Heading>{adPreview.name}</Heading>
            <Heading color={"#647AC7"}>
              {priceFormatter.format(adPreview.price)}
            </Heading>
          </HStack>

          <Text mt={4} fontSize={16}>
            {adPreview.description}
          </Text>

          <HStack alignItems={"center"} pt={5}>
            <Heading fontSize={"lg"} mr={3}>
              Aceita troca?
            </Heading>
            <Text fontSize={"lg"}>
              {adPreview.accept_trade ? "Sim" : "Não"}
            </Text>
          </HStack>

          <VStack mt={5}>
            <Heading fontSize={"lg"}>Meios de pagamento</Heading>
            {adPreview.payment_methods.map((item) => (
              <PayMethod type={item} key={item} />
            ))}
          </VStack>
        </VStack>

        <HStack
          bg={"white"}
          w="full"
          py="6"
          alignItems={"center"}
          justifyContent="space-between"
          px={6}
        >
          <Button
            onPress={() => navigation.navigate("newAdform")}
            title="Voltar e editar"
            variant={"outline"}
            px={6}
            leftIcon={
              <Icon
                as={Ionicons}
                name="chevron-back"
                color="#647AC7"
                size={6}
              />
            }
          />
          <Button
            title="Puplicar"
            onPress={handlePublishAd}
            px={12}
            leftIcon={
              <Icon as={FontAwesome} name="tag" color="white" size={6} />
            }
          />
        </HStack>
      </Box>
    </ScrollView>
  )
}

export default AdPreview
