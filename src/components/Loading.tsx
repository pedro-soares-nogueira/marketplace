import { Center, Spinner } from "native-base"
import React from "react"

const Loading = () => {
  return (
    <Center flex={1}>
      <Spinner color={"#647AC7"} />
    </Center>
  )
}

export default Loading
