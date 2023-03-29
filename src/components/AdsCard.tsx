import {
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from "native-base"
import React, { useState } from "react"
import { TouchableOpacity } from "react-native"
import UserPhoto from "./UserPhoto"
import { Entypo, Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "../routes/app.routes"
import { AdDTO } from "../models/AdDTO"
import { priceFormatter } from "../utils/formatter"
import { api } from "../services/api"

type AdsCardProps = {
  adDetails: AdDTO
  owner?: boolean
}

const AdsCard = ({ owner, adDetails }: AdsCardProps) => {
  const [disabled, setDisabled] = useState(!adDetails?.is_active)
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  console.log(adDetails)

  return (
    <Box w={"full"} mb={8} mr={4} opacity={disabled ? "50" : "1"}>
      <Box rounded={"xl"} position={"relative"}>
        <Image
          source={
            adDetails?.product_images.length > 0
              ? {
                  uri: `${api.defaults.baseURL}/images/${adDetails?.product_images[0].path}`,
                }
              : undefined
          }
          alt="imagem do produto"
          width="full"
          h={"48"}
          rounded={6}
          position="relative"
          resizeMode="cover"
          style={adDetails?.is_active === false && { opacity: 0.4 }}
        />
        {disabled && (
          <Center mt={4}>
            <Heading>Desativado</Heading>
          </Center>
        )}
      </Box>
      <HStack justifyContent={"space-between"} alignItems={"center"}>
        <VStack>
          <Text fontSize={16}>{adDetails?.name}</Text>
          <Heading fontSize={20}>
            {priceFormatter.format(adDetails?.price)}
          </Heading>
        </VStack>

        {adDetails?.is_new ? (
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

        {owner ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ownAdDetails", { adId: adDetails.id })
            }
          >
            <Icon
              as={Ionicons}
              name="arrow-forward"
              color="gray.800"
              size={8}
              m={4}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate("adDetails")}>
            <Icon
              as={Ionicons}
              name="arrow-forward"
              color="gray.800"
              size={8}
              m={4}
            />
          </TouchableOpacity>
        )}
      </HStack>
    </Box>
  )
}

export default AdsCard
