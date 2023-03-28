import { Box, Center, Heading, HStack, Icon, Text, VStack } from "native-base"
import React, { useState } from "react"
import { Dimensions, FlatList, ScrollView, View } from "react-native"
import MainHeader from "../components/MainHeader"
import UserPhoto from "../components/UserPhoto"
import Button from "../components/Button"
import { AntDesign, FontAwesome5, FontAwesome } from "@expo/vector-icons"
import { AdDetailsDTO } from "../models/AdDetailsDTO"
import { useRoute } from "@react-navigation/native"

type AdDetailsProps = {
  type?: "used" | "new"
}

type RouteParams = {
  adDetails: AdDetailsDTO
}

const AdDetails = ({ type = "used" }: AdDetailsProps) => {
  const [data, setData] = useState(["#ff6633", "#ffb399", "#3366e6", "#b34d4d"])
  const route = useRoute()

  const { adDetails } = route.params as RouteParams
  console.log(adDetails)

  const { width } = Dimensions.get("window")
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Box flex={1}>
        <MainHeader title="Anúncio" />

        <Box>
          <FlatList
            data={data}
            keyExtractor={(item) => item}
            horizontal
            pagingEnabled
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: item,
                  height: width / 1.5,
                  width: width,
                }}
              />
            )}
          />
        </Box>

        <VStack py="6" px={6}>
          <HStack alignItems={"center"}>
            <UserPhoto size={10} alt="" mr={2} />
            <Heading fontSize={"lg"}>Makenna Baptista</Heading>
          </HStack>

          <HStack mt={10}>
            {type === "used" && (
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

            {type === "new" && (
              <Center py={1} px={3} bg={"#647AC7"} rounded={"full"}>
                <Text
                  color={"white"}
                  fontWeight={"semibold"}
                  textTransform={"uppercase"}
                >
                  Novo
                </Text>
              </Center>
            )}
          </HStack>

          <HStack w="full" mt="8" justifyContent={"space-between"}>
            <Heading>{adDetails.name}</Heading>
            <Heading color={"#647AC7"}>R$ 120,00</Heading>
          </HStack>

          <Text mt={4} fontSize={16}>
            Cras congue cursus in tortor sagittis placerat nunc, tellus arcu.
            Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet
            nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus iaculis
            in aliquam.
          </Text>

          <HStack alignItems={"center"} pt={5}>
            <Heading fontSize={"lg"} mr={3}>
              Aceita troca?
            </Heading>
            <Text fontSize={"lg"}>Sim</Text>
          </HStack>

          <VStack mt={5}>
            <Heading fontSize={"lg"}>Meios de pagamento</Heading>

            <HStack alignItems={"center"} pt={5}>
              <Icon
                as={AntDesign}
                name="barcode"
                color="gray.700"
                size={6}
                mr={2}
              />
              <Text fontSize={"lg"}>Boleto</Text>
            </HStack>

            <HStack alignItems={"center"} pt={3}>
              <Icon
                as={AntDesign}
                name="qrcode"
                color="gray.700"
                size={6}
                mr={2}
              />
              <Text fontSize={"lg"}>PIX</Text>
            </HStack>

            <HStack alignItems={"center"} pt={3}>
              <Icon
                as={FontAwesome}
                name="money"
                color="gray.700"
                size={6}
                mr={2}
              />
              <Text fontSize={"lg"}>Dinheiro</Text>
            </HStack>

            <HStack alignItems={"center"} pt={3}>
              <Icon
                as={FontAwesome5}
                name="money-check-alt"
                color="gray.700"
                size={6}
                mr={2}
              />
              <Text fontSize={"lg"}>Cartão de Crédito</Text>
            </HStack>

            <HStack alignItems={"center"} pt={3}>
              <Icon
                as={FontAwesome5}
                name="money-check"
                color="gray.700"
                size={6}
                mr={2}
              />
              <Text fontSize={"lg"}>Cartão de Débito</Text>
            </HStack>
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
          <Heading color={"#647AC7"}>R$ 120,00</Heading>
          <Button
            title="Entrar em contato"
            px={6}
            leftIcon={
              <Icon as={FontAwesome} name="whatsapp" color="white" size={6} />
            }
          />
        </HStack>
      </Box>
    </ScrollView>
  )
}

export default AdDetails
