import {
  Box,
  Checkbox,
  Heading,
  HStack,
  Icon,
  Modal,
  Select,
  Switch,
  Text,
} from "native-base"
import React, { useState } from "react"
import {} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Button from "./Button"

type FiltersModalProps = {}

const FiltesModal = () => {
  const [showModal, setShowModal] = useState(false)
  const [condition, setCondition] = useState("")
  const [groupValues, setGroupValues] = useState([])

  const setModalOpen = () => {
    setShowModal(!showModal)
  }
  return (
    <>
      <Button
        title="Filtros"
        onPress={setModalOpen}
        leftIcon={<Icon as={Ionicons} name="filter" color="white" size={6} />}
      />
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        justifyContent="flex-end"
        size="full"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Filtros</Modal.Header>
          <Modal.Body>
            <HStack alignItems="flex-start" flexDirection={"column"} space={4}>
              <HStack alignItems="baseline">
                <Heading fontSize="lg">Aceita troca?</Heading>
              </HStack>
              <Switch size="md" />
            </HStack>
            <Box maxW="300" mt={6}>
              <HStack alignItems="baseline">
                <Heading fontSize="lg">Condição do produto</Heading>
              </HStack>
              <Select
                selectedValue={condition}
                minWidth="200"
                accessibilityLabel="Qual a condição do produto"
                placeholder="Qual a condição do produto"
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
                <Select.Item label="Produto novo" value="new" />
                <Select.Item label="Produto usado" value="used" />
              </Select>
            </Box>
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
          </Modal.Body>
          <Modal.Footer>
            <Button
              title="Resetar"
              onPress={setModalOpen}
              px={10}
              mr={2}
              variant={"outline"}
            />
            <Button title="Aplicar" onPress={setModalOpen} px={10} />
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default FiltesModal
