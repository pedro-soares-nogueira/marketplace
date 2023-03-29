import { PayMethodDTO } from "./PayMethodDTO"
import { AdImageDTO } from "./AdImageDTO"
import { UserDTO } from "./UserDTO"

export type AdDTO = {
  id: string
  name: string
  description: string
  price: number
  accept_trade: boolean
  is_new: boolean
  is_active: boolean
  product_images: AdImageDTO[]
  payment_methods: PayMethodDTO[]
  user: UserDTO
  user_id: string
}
