import { Center, Text } from "native-base"
import React from "react"
import { ScrollView } from "react-native"
import HomeHeader from "../components/HomeHeader"

const Home = () => {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <HomeHeader />
    </ScrollView>
  )
}

export default Home
