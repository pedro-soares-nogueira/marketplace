import { NavigationContainer } from "@react-navigation/native"
import Loading from "../components/Loading"
import { useAuth } from "../contexts/AuthContext"
import AppRoutes from "./app.routes"
import AuthRoutes from "./auth.routes"

const Routes = () => {
  const { user, isLoadingUserStorageData } = useAuth()

  if (isLoadingUserStorageData) {
    return <Loading />
  }

  return (
    <NavigationContainer>
      {user.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}

export default Routes
