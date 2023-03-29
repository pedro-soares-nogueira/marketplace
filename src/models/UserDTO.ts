import { AdDTO } from "./AdDTO"

export type UserDTO = {
  id: string
  name: string
  email: string
  tel: string
  avatar: string
  products: AdDTO[]
}
