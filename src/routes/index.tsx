import { NavigationContainer } from "@react-navigation/native"
import AppRoutes from "./app.routes"
import AuthRoutes from "./auth.routes"

const Routes = () => {
  return (
    <NavigationContainer>
      <AuthRoutes />
    </NavigationContainer>
  )
}

export default Routes
