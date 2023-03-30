import {
  Box,
  Modal,
  FormControl,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
  FlatList,
  Center,
  useTheme,
} from "native-base"
import React, { useCallback, useState } from "react"
import { ScrollView } from "react-native"
import HomeHeader from "../components/HomeHeader"
import Input from "../components/Input"
import OwnAdsBanner from "../components/OwnAdsBanner"
import { Ionicons } from "@expo/vector-icons"
import Button from "../components/Button"
import UserPhoto from "../components/UserPhoto"
import AdsCard from "../components/AdsCard"
import FiltesModal from "../components/FiltesModal"
import { useAds } from "../contexts/AdContext"
import { useFocusEffect } from "@react-navigation/native"
import Loading from "../components/Loading"
import { SmileyXEyes } from "phosphor-react-native"

const Home = () => {
  const { ads, isLoadingAds, loadAds } = useAds()
  const { colors } = useTheme()

  useFocusEffect(
    useCallback(() => {
      loadAds()
    }, [])
  )
  return (
    <>
      <HomeHeader />
      <OwnAdsBanner />

      <Box px={6} mb={8}>
        <Text fontSize={14} mb={2} fontFamily={"body"}>
          Compre produtos variados
        </Text>
        <Input
          placeholder="Search"
          InputRightElement={
            <Icon
              as={<Ionicons name={"search"} />}
              size={5}
              mr="2"
              color="muted.400"
            />
          }
        />

        <FiltesModal />
      </Box>

      <HStack px={6} mb={8} flexWrap={"wrap"} alignItems={"flex-start"}>
        {isLoadingAds ? (
          <Loading />
        ) : (
          <FlatList
            data={ads}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AdsCard adDetails={item} key={item.id} />
            )}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[ads.length === 0 && { flex: 1 }]}
            ListEmptyComponent={() => (
              <Center flex={1}>
                <SmileyXEyes size={62} color={colors.gray[500]} />
                <Text fontSize="md" color="gray.500">
                  Sem anúncios para mostrar.
                </Text>
              </Center>
            )}
          />
        )}
      </HStack>
    </>
  )
}

export default Home
