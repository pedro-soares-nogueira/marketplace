import {
  Box,
  Center,
  Checkbox,
  Heading,
  HStack,
  Icon,
  Switch,
  Text,
  TextArea,
  VStack,
} from "native-base"
import React, { useState } from "react"
import { Entypo } from "@expo/vector-icons"
import MainHeader from "../components/MainHeader"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import Input from "../components/Input"
import TextAreaInput from "../components/TextAreaInput"
import { ScrollView } from "react-native"
import Button from "../components/Button"
import { useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "../routes/app.routes"
import { MaterialIcons } from "@expo/vector-icons"

type FormAdProps = {
  title: string
  price: number
  description: string
}

const FormAdSchema = yup.object({
  title: yup.string().min(4, "Nome obrigatório"),
  price: yup.number().min(4, "Nome obrigatório"),
  description: yup.string().min(2, "Descreva algo sobre o produto"),
})

const NewAdform = () => {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const [groupValues, setGroupValues] = useState([])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormAdProps>({
    resolver: yupResolver(FormAdSchema),
  })
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Box flex={1} mb="10">
        <MainHeader title="Criar anúncio" isNewAdForm />

        <VStack px={6}>
          <Heading mb={2}>Imagens</Heading>
          <Text maxW={370}>
            Escolha até 3 imagens para mostrar o quando o seu produto é
            incrível!
          </Text>

          <Box mt={8} flexDirection={"row"}>
            <Center w={"1/4"} mr={2} h={100} bg={"gray.300"} rounded="md">
              <Icon
                as={<Entypo name={"plus"} />}
                size={8}
                mr="2"
                color="gray.400"
              />
            </Center>
            <Center w={"1/4"} mr={2} h={100} bg={"gray.300"} rounded="md">
              <Icon
                as={<Entypo name={"plus"} />}
                size={8}
                mr="2"
                color="gray.400"
              />
            </Center>
            <Center w={"1/4"} mr={2} h={100} bg={"gray.300"} rounded="md">
              <Icon
                as={<Entypo name={"plus"} />}
                size={8}
                mr="2"
                color="gray.400"
              />
            </Center>
          </Box>

          <VStack mt={10}>
            <Heading mb={3}>Sobre o produto</Heading>

            <Controller
              control={control}
              name="title"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Nome do produto"
                  onChangeText={onChange}
                  errorMessage={errors.title?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange } }) => (
                <TextAreaInput
                  placeholder="Dê uma descrição ao produto"
                  onChangeText={onChange}
                  errorMessage={errors.description?.message}
                />
              )}
            />
            <Heading fontSize="lg" mb={4}>
              Preço de venda
            </Heading>

            <Controller
              control={control}
              name="price"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Preco do produto"
                  onChangeText={onChange}
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="attach-money" />}
                      size={5}
                      ml="2"
                      color="gray.600"
                    />
                  }
                  keyboardType="numeric"
                  errorMessage={errors.title?.message}
                />
              )}
            />

            <HStack alignItems="flex-start" flexDirection={"column"} space={4}>
              <HStack alignItems="baseline">
                <Heading fontSize="lg">Produto novo?</Heading>
              </HStack>
              <Switch size="md" />
            </HStack>

            <HStack alignItems="flex-start" flexDirection={"column"} space={4}>
              <HStack alignItems="baseline">
                <Heading fontSize="lg">Aceita troca?</Heading>
              </HStack>
              <Switch size="md" />
            </HStack>

            <Checkbox.Group
              mt={8}
              onChange={setGroupValues}
              value={groupValues}
              accessibilityLabel="formas de pagamento"
            >
              <HStack alignItems="baseline">
                <Heading fontSize="lg">Formas de pagamento</Heading>
              </HStack>
              <Checkbox value="pix" my={2}>
                PIX
              </Checkbox>
              <Checkbox my={2} value="boleto">
                Boleto
              </Checkbox>
              <Checkbox my={2} value="dinheiro">
                Dinheiro
              </Checkbox>
              <Checkbox my={2} value="cartaoCredito">
                Crédito
              </Checkbox>
              <Checkbox my={2} value="cartaoDebito">
                Débito
              </Checkbox>
            </Checkbox.Group>
          </VStack>

          <HStack mt="10" w="full" justifyContent={"space-between"}>
            <Button
              px={16}
              title="Cancelar"
              variant={"outline"}
              onPress={() => navigation.goBack()}
            />
            <Button px={16} title="Avançar" />
          </HStack>
        </VStack>
      </Box>
    </ScrollView>
  )
}

export default NewAdform