import { Box, Center, Heading, HStack, Icon, Text, VStack } from "native-base"
import React from "react"
import { Pressable, ScrollView } from "react-native"
import HomeHeader from "../components/HomeHeader"
import Input from "../components/Input"
import OwnAdsBanner from "../components/OwnAdsBanner"
import { Ionicons } from "@expo/vector-icons"
import Button from "../components/Button"
import UserPhoto from "../components/UserPhoto"
import AdsCard from "../components/AdsCard"

const Home = () => {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
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
        <Button
          title="Filtros"
          leftIcon={<Icon as={Ionicons} name="filter" color="white" size={6} />}
        />
      </Box>

      <HStack px={6} mb={8} flexWrap={"wrap"} alignItems={"flex-start"}>
        <AdsCard type="new" />
        <AdsCard type="used" />
        <AdsCard type="used" />
        <AdsCard type="new" />
        <AdsCard type="new" />
      </HStack>
    </ScrollView>
  )
}

export default Home
