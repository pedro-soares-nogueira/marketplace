import React from "react"
import { Button as ButtonNativeBase, Text, IButtonProps } from "native-base"

type Props = IButtonProps & { title: string; variant?: "solid" | "outline" }

const Button = ({ title, variant = "solid", ...rest }: Props) => {
  return (
    <ButtonNativeBase
      bgColor={variant === "outline" ? "transparent" : "blue.400"}
      borderWidth={variant === "outline" ? 1 : 0}
      borderColor="blue.400"
      py={4}
      borderRadius={6}
      _pressed={{ bgColor: "blue.300" }}
      {...rest}
    >
      <Text
        color={variant === "outline" ? "blue.400" : "white"}
        fontWeight={600}
        fontSize={"md"}
      >
        {title}
      </Text>
    </ButtonNativeBase>
  )
}

export default Button
