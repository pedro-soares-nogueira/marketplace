import React from "react"
import { FormControl, IInputProps, Input as InputNativeBase } from "native-base"

type InputProps = IInputProps & {
  errorMessage?: string | null
}

const Input = ({ isInvalid, errorMessage, ...rest }: InputProps) => {
  const invalid = !!errorMessage || isInvalid
  return (
    <FormControl isInvalid={invalid} mb={4}>
      <InputNativeBase
        bg={"white"}
        px={4}
        py={3}
        w={"100%"}
        borderRadius={6}
        borderColor={"white"}
        fontSize={"md"}
        _focus={{
          borderColor: "gray.400",
          bgColor: "white",
        }}
        {...rest}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  )
}

export default Input
