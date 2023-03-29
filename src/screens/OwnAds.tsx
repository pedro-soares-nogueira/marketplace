import {
  Box,
  Center,
  FlatList,
  Heading,
  HStack,
  Icon,
  Select,
  Text,
  useTheme,
  VStack,
} from "native-base"
import { Entypo, Ionicons } from "@expo/vector-icons"
import React, { useCallback, useState } from "react"
import MainHeader from "../components/MainHeader"
import AdsCard from "../components/AdsCard"
import { useAds } from "../contexts/AdContext"
import { useFocusEffect } from "@react-navigation/native"
import Loading from "../components/Loading"

const OwnAds = () => {
  const { colors } = useTheme()

  const { userAds, loadUserAds, isLoadingAds } = useAds()
  const [adStatusType, setAdStatusType] = useState<string>("default")

  const filteredList = userAds.filter((item) => {
    switch (adStatusType) {
      case "active":
        return item.is_active === true
      case "inactive":
        return item.is_active === false

      default:
        return userAds
    }
  })

  useFocusEffect(
    useCallback(() => {
      loadUserAds()
    }, [])
  )
  return (
    <Box flex={1}>
      <MainHeader title="Meus anúncios" />

      <HStack
        justifyContent={"space-between"}
        alignItems={"center"}
        px={6}
        mt={10}
      >
        <Text>{filteredList.length} anúncios</Text>
        <Box maxW="300">
          <Select
            selectedValue={adStatusType}
            minWidth="200"
            accessibilityLabel="Selecione o tipo"
            placeholder="Selecione o tipo"
            isDisabled={userAds.length === 0}
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
            onValueChange={(itemValue) => setAdStatusType(itemValue)}
          >
            <Select.Item label="Todos" value="default" />
            <Select.Item label="Ativos" value="active" />
            <Select.Item label="Inativos" value="inactive" />
          </Select>
        </Box>
      </HStack>

      {isLoadingAds ? (
        <Loading />
      ) : (
        <>
          <HStack
            px={6}
            mb={8}
            flexWrap={"wrap"}
            alignItems={"flex-start"}
            mt={10}
          >
            <FlatList
              data={filteredList}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <AdsCard type="used" key={item.id} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[filteredList.length === 0 && { flex: 1 }]}
              ListEmptyComponent={() => (
                <Center flex={1}>
                  <Text fontSize="md" color="gray.500">
                    Sem anúncios para mostrar.
                  </Text>
                </Center>
              )}
            />
          </HStack>
        </>
      )}
    </Box>
  )
}

export default OwnAds
