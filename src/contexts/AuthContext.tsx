import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { UserDTO } from "../models/UserDTO"

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
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  async function signIn(email: string, password: string) {}
  async function signOut() {}
  async function loadUserData() {}

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
