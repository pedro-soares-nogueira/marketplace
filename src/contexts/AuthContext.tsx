import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { UserDTO } from "../models/UserDTO"
import { api } from "../services/api"
import {
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from "../storage/storageAuthToken"
import { storageUserRemove, storageUserSave } from "../storage/storageUser"

export type AuthContextDataProps = {
  user: UserDTO
  isLoadingUserStorageData: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode
}

const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
)

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(false)

  const saveUserAndTokenInStorage = async (
    user: UserDTO,
    token: string,
    refresh_token: string
  ) => {
    try {
      setIsLoadingUserStorageData(true)

      await storageUserSave(user)
      await storageAuthTokenSave({ token, refresh_token })
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  const updateUserAndToken = (user: UserDTO, token: string) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`
    setUser(user)
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/sessions", { email, password })

      if (data.user && data.token && data.refresh_token) {
        setIsLoadingUserStorageData(true)

        await saveUserAndTokenInStorage(
          data.user,
          data.token,
          data.refresh_token
        )

        updateUserAndToken(data.user, data.token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }
  const signOut = async () => {
    try {
      setIsLoadingUserStorageData(true)

      setUser({} as UserDTO)

      await storageUserRemove()
      await storageAuthTokenRemove()
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }
  const loadUserData = async () => {}

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, signIn, isLoadingUserStorageData, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
