import React from "react"
import { FormControl, IInputProps, TextArea } from "native-base"

type TextAreaInputProps = IInputProps & {
  errorMessage?: string | null
}

const TextAreaInput = ({
  isInvalid,
  errorMessage,
  ...rest
}: TextAreaInputProps) => {
  const invalid = !!errorMessage || isInvalid
  return (
    <FormControl isInvalid={invalid} mb={4}>
      <TextArea
        autoCompleteType={undefined}
        bg={"white"}
        px={4}
        py={3}
        w={"100%"}
        h={200}
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

export default TextAreaInput
