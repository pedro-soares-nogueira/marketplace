import { Box, Heading, Icon, Text, View, VStack } from "native-base"
import React from "react"
import { TouchableOpacity } from "react-native"
import { Entypo, Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "../routes/app.routes"

type MainHeaderProps = {
  title: string
  isNewAdForm?: true
}

const MainHeader = ({ title, isNewAdForm }: MainHeaderProps) => {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  return (
    <>
      <Box
        mt={"12"}
        p={6}
        flexDirection={"row"}
        alignItems="center"
        justifyContent={"space-between"}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon as={Ionicons} name="arrow-back" color="gray.800" size={8} />
        </TouchableOpacity>
        <Heading>{title}</Heading>
        {!isNewAdForm ? (
          <TouchableOpacity onPress={() => navigation.navigate("newAdform")}>
            <Icon as={Entypo} name="plus" color="gray.800" size={8} />
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
      </Box>
    </>
  )
}

export default MainHeader
