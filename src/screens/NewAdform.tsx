import { Box, Center, Text } from "native-base"
import React from "react"
import MainHeader from "../components/MainHeader"

const NewAdform = () => {
  return (
    <Box flex={1}>
      <MainHeader title="Criar anúncio" isNewAdForm />
    </Box>
  )
}

export default NewAdform
