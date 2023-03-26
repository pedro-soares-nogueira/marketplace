import { Center, Spinner } from "native-base"
import React from "react"

const Loading = () => {
  return (
    <Center flex={1}>
      <Spinner />
    </Center>
  )
}

export default Loading
