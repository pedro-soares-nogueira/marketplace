import {
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  Pressable,
  useTheme,
  useToast,
  VStack,
} from "native-base"
import React, { useCallback, useState } from "react"
import { Alert, Dimensions, FlatList, ScrollView, View } from "react-native"
import MainHeader from "../components/MainHeader"
import UserPhoto from "../components/UserPhoto"
import Button from "../components/Button"
import { AntDesign, FontAwesome5, FontAwesome } from "@expo/vector-icons"
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native"
import { AdDTO } from "../models/AdDTO"
import { api } from "../services/api"
import { AppError } from "../utils/AppError"
import { useAuth } from "../contexts/AuthContext"
import { priceFormatter } from "../utils/formatter"
import { AppNavigatorRoutesProps } from "../routes/app.routes"
import Loading from "../components/Loading"

type RouteParams = {
  adId: string
}

const OwnAdDetails = () => {
  const [ad, setAd] = useState({} as AdDTO)

  const [isLoading, setIsLoading] = useState(false)
  const [changeStatusLoading, setChangeStatusLoading] = useState(false)
  const [data, setData] = useState(["#ff6633", "#ffb399", "#3366e6", "#b34d4d"])
  const { width } = Dimensions.get("window")
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const { user } = useAuth()
  const { colors } = useTheme()
  const toast = useToast()

  const route = useRoute()
  const { adId } = route.params as RouteParams

  const handleChangeStatus = async () => {
    try {
      setChangeStatusLoading(true)

      await api.patch(`/products/${adId}`, {
        is_active: !ad.is_active,
      })

      setAd((state) => {
        return {
          ...state,
          is_active: !state.is_active,
        }
      })

      toast.show({
        title: "Status do anúncio atualizado!",
        placement: "top",
        bgColor: "green.500",
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : "Não foi possível atualizar o status."

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      })
    } finally {
      setChangeStatusLoading(false)
    }
  }

  const loadProductData = async () => {
    try {
      setIsLoading(true)
      const response = await api.get(`/products/${adId}`)
      setAd(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os dados."

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const removeAd = async () => {
    try {
      setIsLoading(true)
      await api.delete(`/products/${adId}`)

      toast.show({
        title: "Anúncio removido!",
        placement: "top",
        bgColor: "green.500",
      })

      navigation.goBack()
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : "Não foi possível remover o anúncio."

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveAd = async () => {
    Alert.alert("Remover", "Deseja remover o anúncio?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => removeAd() },
    ])
  }

  useFocusEffect(
    useCallback(() => {
      loadProductData()
    }, [adId])
  )

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <Box flex={1}>
          <MainHeader title="Anúncio" />

          <Pressable
            onPress={() => navigation.navigate("editAdform", { adDetails: ad })}
            flexDirection="row"
            justifyContent={"center"}
            alignItems="center"
            my="4"
          >
            <Text mr="3">Editar</Text>
            <Icon
              as={FontAwesome5}
              name="edit"
              color="gray.700"
              size={4}
              mr={2}
            />
          </Pressable>

          <Box>
            <FlatList
              data={ad.product_images}
              keyExtractor={(item) => item.id}
              horizontal
              pagingEnabled
              renderItem={({ item }) => (
                <Box w={width} h="400px" key={item.id}>
                  <Image
                    w={width}
                    h="400px"
                    mb={8}
                    source={{
                      uri: `${api.defaults.baseURL}/images/${item.path}`,
                    }}
                    alt="Imagem do produto"
                    resizeMode="cover"
                  />
                </Box>
              )}
            />
          </Box>

          {!ad.is_active && (
            <Center mt={4}>
              <Heading>Desativado</Heading>
            </Center>
          )}

          <VStack py="6" px={6}>
            <HStack alignItems={"center"}>
              <UserPhoto
                size={10}
                alt=""
                mr={2}
                source={{
                  uri: `${api.defaults.baseURL}/images/${user.avatar}`,
                }}
              />
              <Heading fontSize={"lg"}> {user.name}</Heading>
            </HStack>

            <HStack mt={10}>
              {ad?.is_new ? (
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
              <Heading> {ad.name}</Heading>
              <Heading color={"#647AC7"}>
                {priceFormatter.format(ad.price)}
              </Heading>
            </HStack>

            <Text mt={4} fontSize={16}>
              {ad.description}
            </Text>

            <HStack alignItems={"center"} pt={5}>
              <Heading fontSize={"lg"} mr={3}>
                Aceita troca?
              </Heading>
              {ad.accept_trade ? <Text>Sim</Text> : <Text>Não</Text>}
            </HStack>

            <VStack mt={5}>
              <Heading fontSize={"lg"}>Meios de pagamento</Heading>

              {ad.payment_methods?.map((item) => (
                <>
                  {item.key === "card" && (
                    <HStack alignItems={"center"} pt={3} key={item.name}>
                      <Icon
                        as={FontAwesome5}
                        name="money-check-alt"
                        color="gray.700"
                        size={6}
                        mr={2}
                      />
                      <Text fontSize={"lg"}>Cartão de Crédito</Text>
                    </HStack>
                  )}
                  {item.key === "cash" && (
                    <HStack alignItems={"center"} pt={3} key={item.name}>
                      <Icon
                        as={FontAwesome}
                        name="money"
                        color="gray.700"
                        size={6}
                        mr={2}
                      />
                      <Text fontSize={"lg"}>Dinheiro</Text>
                    </HStack>
                  )}
                  {item.key === "boleto" && (
                    <HStack alignItems={"center"} pt={5} key={item.name}>
                      <Icon
                        as={AntDesign}
                        name="barcode"
                        color="gray.700"
                        size={6}
                        mr={2}
                      />
                      <Text fontSize={"lg"}>Boleto</Text>
                    </HStack>
                  )}
                  {item.key === "deposit" && (
                    <HStack alignItems={"center"} pt={5} key={item.name}>
                      <Icon
                        as={AntDesign}
                        name="barcode"
                        color="gray.700"
                        size={6}
                        mr={2}
                      />
                      <Text fontSize={"lg"}>Depósito bancário</Text>
                    </HStack>
                  )}
                  {item.key === "pix" && (
                    <HStack alignItems={"center"} pt={3} key={item.name}>
                      <Icon
                        as={AntDesign}
                        name="qrcode"
                        color="gray.700"
                        size={6}
                        mr={2}
                      />
                      <Text fontSize={"lg"}>PIX</Text>
                    </HStack>
                  )}
                </>
              ))}
            </VStack>
          </VStack>

          <VStack m={6}>
            <Button
              title={ad.is_active ? "Desativar anúncio" : "Reativar anúncio"}
              bgColor={ad.is_active ? "gray.700" : "green.600"}
              mb={3}
              onPress={handleChangeStatus}
              isLoading={changeStatusLoading}
            />
            <Button
              title="Excluir anúncio"
              mb={10}
              isLoading={isLoading}
              onPress={handleRemoveAd}
            />
          </VStack>
        </Box>
      )}
    </ScrollView>
  )
}

export default OwnAdDetails
