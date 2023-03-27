import {
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  Select,
  Text,
  VStack,
} from "native-base"
import { Entypo, Ionicons } from "@expo/vector-icons"
import React, { useState } from "react"
import MainHeader from "../components/MainHeader"
import AdsCard from "../components/AdsCard"

const OwnAds = () => {
  const [condition, setCondition] = useState("")

  return (
    <Box flex={1}>
      <MainHeader title="Meus anúncios" />

      <HStack
        justifyContent={"space-between"}
        alignItems={"center"}
        px={6}
        mt={10}
      >
        <Text>9 anúncios</Text>
        <Box maxW="300">
          <Select
            selectedValue={condition}
            minWidth="200"
            accessibilityLabel="Selecione o tipo"
            placeholder="Selecione o tipo"
            _selectedItem={{
              bg: "gray.200",
              endIcon: (
                <Icon
                  as={<Ionicons name={"checkmark"} />}
                  size={5}
                  mr="2"
                  color="muted.400"
                />
              ),
            }}
            mt={1}
            onValueChange={(itemValue) => setCondition(itemValue)}
          >
            <Select.Item label="Todos" value="new" />
            <Select.Item label="Produto novo" value="new" />
            <Select.Item label="Produto usado" value="used" />
          </Select>
        </Box>
      </HStack>

      <HStack px={6} mb={8} flexWrap={"wrap"} alignItems={"flex-start"} mt={10}>
        <AdsCard type="new" />
        <AdsCard type="used" />
      </HStack>
    </Box>
  )
}

export default OwnAds
