import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack"
import React from "react"
import SingIn from "../screens/SingIn"
import SingUp from "../screens/SingUp"

type AuthRoutes = {
  navigate: any
  signIn: undefined
  signUp: undefined
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>()

const AuthRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signIn" component={SingIn} />
      <Screen name="signUp" component={SingUp} />
    </Navigator>
  )
}

export default AuthRoutes
