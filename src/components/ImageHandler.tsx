import { Center, useTheme, IButtonProps, Pressable, Icon } from "native-base"
import { Entypo } from "@expo/vector-icons"

type Props = IButtonProps & {}

export function ImageHandler({ ...rest }: Props) {
  const { colors } = useTheme()

  return (
    <Pressable {...rest}>
      <Center w={24} h={24} rounded={6} bgColor="gray.300" mt={4}>
        <Icon as={Entypo} name="plus" color="gray.800" size={7} />
      </Center>
    </Pressable>
  )
}
