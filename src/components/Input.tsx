import React from "react"
import { IInputProps, Input as InputNativeBase } from "native-base"

const Input = ({ ...rest }: IInputProps) => {
  return (
    <InputNativeBase
      bg={"white"}
      px={4}
      py={3}
      w={"100%"}
      borderRadius={6}
      borderColor={"white"}
      fontSize={"md"}
      mb={4}
      _focus={{
        borderColor: "gray.400",
        bgColor: "white",
      }}
      {...rest}
    />
  )
}

export default Input
