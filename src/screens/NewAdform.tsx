import {
  Box,
  Center,
  Checkbox,
  FormControl,
  Heading,
  HStack,
  Icon,
  Pressable,
  Switch,
  Text,
  TextArea,
  useToast,
  VStack,
} from "native-base"
import React, { useCallback, useState } from "react"
import { AntDesign } from "@expo/vector-icons"
import MainHeader from "../components/MainHeader"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import Input from "../components/Input"
import TextAreaInput from "../components/TextAreaInput"
import { ScrollView } from "react-native"
import Button from "../components/Button"
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "../routes/app.routes"
import { MaterialIcons } from "@expo/vector-icons"
import { ImagePreview } from "../components/ImagePreview"
import * as ImagePicker from "expo-image-picker"
import { ImageHandler } from "../components/ImageHandler"
import { AdPreviewDTO } from "../models/AdPreviewDTO"
import { AppError } from "../utils/AppError"
import { api } from "../services/api"
import { AdDTO } from "../models/AdDTO"
import { AdImageDTO } from "../models/AdImageDTO"

type FormAdProps = {
  title: string
  price: number
  description: string
  isNew: boolean
  exchange: boolean
  payMethods: string[]
}
const FormAdSchema = yup.object({
  title: yup.string().min(4, "Nome é obrigatório"),
  price: yup.number().min(4, "Valor é  obrigatório"),
  description: yup.string().min(2, "Descreva algo sobre o produto"),
  isNew: yup.boolean(),
  exchange: yup.boolean(),
})

const NewAdform = () => {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const [isLoading, setIsLoading] = useState(false)
  const [imagesUri, setImagesUri] = useState<string[]>([])
  const [payMethods, setPayMethods] = useState<string[]>([])

  const toast = useToast()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormAdProps>({
    resolver: yupResolver(FormAdSchema),
  })

  const handleSelectImage = async () => {
    const imageSelected = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 4],
      allowsEditing: true,
    })

    if (imageSelected.canceled) {
      return
    }

    if (imageSelected.assets[0].uri) {
      setImagesUri([...imagesUri, imageSelected.assets[0].uri])
    }
  }

  const removeImage = (uri: string) => {
    const imagesFiltered = imagesUri.filter((imageUri) => imageUri !== uri)
    setImagesUri(imagesFiltered)
  }

  const handlePreview = (data: FormAdProps) => {
    setIsLoading(true)

    const { title, description, price, exchange, isNew } = data

    const adPreview: AdPreviewDTO = {
      name: title,
      description,
      price: price,
      imagesUri,
      is_new: isNew,
      accept_trade: exchange,
      payment_methods: payMethods,
    }

    setIsLoading(false)
    navigation.navigate("adPreview", { adPreview })
  }

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
            <HStack>
              {imagesUri.length > 0 &&
                imagesUri.map((imageUri) => (
                  <Box key={imageUri}>
                    <ImagePreview uri={imageUri} />

                    <Pressable
                      onPress={() => removeImage(imageUri)}
                      position="absolute"
                      mt={5}
                      ml={1}
                      w={5}
                      h={5}
                      rounded="full"
                      bgColor="gray.400"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon
                        as={AntDesign}
                        name="close"
                        color="gray.800"
                        size={3}
                      />
                    </Pressable>
                  </Box>
                ))}
              {imagesUri.length < 3 && (
                <ImageHandler onPress={handleSelectImage} />
              )}
            </HStack>
          </Box>

          <VStack mt={10}>
            <Heading mb={3}>Sobre o produto</Heading>

            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, value } }) => (
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
              render={({ field: { onChange, value } }) => (
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
              render={({ field: { onChange, value } }) => (
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
                  errorMessage={errors.price?.message}
                />
              )}
            />

            <HStack alignItems="flex-start" flexDirection={"column"} space={4}>
              <HStack alignItems="baseline">
                <Heading fontSize="lg">Produto novo?</Heading>
              </HStack>
              <Controller
                control={control}
                name="isNew"
                render={({ field: { onChange, value } }) => (
                  <Switch
                    onToggle={(val: boolean) => onChange(val)}
                    isChecked={value}
                  />
                )}
              />
            </HStack>

            <HStack alignItems="flex-start" flexDirection={"column"} space={4}>
              <HStack alignItems="baseline">
                <Heading fontSize="lg">Aceita troca?</Heading>
              </HStack>
              <Controller
                control={control}
                name="exchange"
                render={({ field: { onChange, value } }) => (
                  <Switch
                    onToggle={(val: boolean) => onChange(val)}
                    isChecked={value}
                  />
                )}
              />
            </HStack>

            <Checkbox.Group
              mt={8}
              onChange={(method) => setPayMethods(method)}
              value={payMethods}
            >
              <HStack alignItems="baseline">
                <Heading fontSize="lg">Formas de pagamento</Heading>
              </HStack>
              <Checkbox my={2} value="card">
                Cartão de Crédito
              </Checkbox>
              <Checkbox my={2} value="cash">
                Dinheiro
              </Checkbox>
              <Checkbox my={2} value="boleto">
                Boleto
              </Checkbox>
              <Checkbox my={2} value="deposit">
                Depósito bancário
              </Checkbox>
              <Checkbox my={2} value="pix">
                Pix
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
            <Button
              px={16}
              title="Avançar"
              onPress={handleSubmit(handlePreview)}
              isLoading={isLoading}
            />
          </HStack>
        </VStack>
      </Box>
    </ScrollView>
  )
}

export default NewAdform
