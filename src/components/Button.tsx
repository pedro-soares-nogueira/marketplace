import React from "react"
import { Button as ButtonNativeBase, Text, IButtonProps } from "native-base"

type Props = IButtonProps & { title: string; variant?: "solid" | "outline" }

const Button = ({ title, variant = "solid", ...rest }: Props) => {
  return (
    <ButtonNativeBase
      bgColor={variant === "outline" ? "transparent" : "#647AC7"}
      borderWidth={variant === "outline" ? 1 : 0}
      borderColor="#647AC7"
      py={4}
      borderRadius={6}
      _pressed={{ opacity: 80 }}
      {...rest}
    >
      <Text
        color={variant === "outline" ? "#647AC7" : "white"}
        fontWeight={600}
        fontSize={"md"}
      >
        {title}
      </Text>
    </ButtonNativeBase>
  )
}

export default Button
