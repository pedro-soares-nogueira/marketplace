import { useToast } from "native-base"
import { createContext, ReactNode, useContext, useState } from "react"
import { AdDTO } from "../models/AdDTO"
import { AdPreviewDTO } from "../models/AdPreviewDTO"
import { api } from "../services/api"
import { AppError } from "../utils/AppError"
import { useAuth } from "./AuthContext"

export type AdsDataProps = {
  userAds: AdDTO[]
  createAd: (ads: AdPreviewDTO) => Promise<void>
  loadUserAds: () => Promise<void>
  isLoadingAds: boolean
}

type AdsProvider = {
  children: ReactNode
}

export const AdsContext = createContext<AdsDataProps>({} as AdsDataProps)
export function useAds() {
  const context = useContext(AdsContext)
  return context
}

export function AdsContextProvider({ children }: AdsProvider) {
  const { user } = useAuth()
  const [userAds, setUserAds] = useState<AdDTO[]>([])
  const toast = useToast()
  const [isLoadingAds, setIsLoadingAds] = useState(false)

  const createAd = async (ads: AdPreviewDTO) => {
    try {
      setIsLoadingAds(true)

      const {
        imagesUri,
        name,
        price,
        description,
        is_new,
        accept_trade,
        payment_methods,
      } = ads

      const response = await api.post("/products", {
        name,
        description,
        price,
        is_new,
        accept_trade,
        payment_methods,
        imagesUri,
      })

      const { id } = response.data

      await uploadImages(id, imagesUri)
    } catch (error) {
      throw error
    } finally {
      setIsLoadingAds(false)
    }
  }

  const uploadImages = async (adId: string, images: string[]) => {
    try {
      const imageData = new FormData()
      imageData.append("product_id", adId)

      images.forEach((item) => {
        const imageExtension = item.split(".").pop()

        const imageFile = {
          name: `${user.name}.${imageExtension}`,
          uri: item,
          type: `image/${imageExtension}`,
        } as any

        imageData.append("images", imageFile)
      })

      await api.post("/products/images/", imageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    } catch (error) {
      throw error
    }
  }

  const loadUserAds = async () => {
    try {
      setIsLoadingAds(true)
      const response = await api.get("users/products")
      setUserAds(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os dados."

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      })
    } finally {
      setIsLoadingAds(false)
    }
  }

  return (
    <AdsContext.Provider
      value={{ createAd, loadUserAds, userAds, isLoadingAds }}
    >
      {children}
    </AdsContext.Provider>
  )
}
