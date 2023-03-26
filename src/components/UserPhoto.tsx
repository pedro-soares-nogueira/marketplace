import { IImageProps, Image } from "native-base"
import React from "react"

type UserPhotoProps = IImageProps & {
  size: number
}

const UserPhoto = ({ size, ...rest }: UserPhotoProps) => {
  return (
    <Image
      w={size}
      h={size}
      rounded="full"
      borderWidth={2}
      borderColor="#647AC7"
      {...rest}
    />
  )
}

export default UserPhoto
