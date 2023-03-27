import {
  BottomTabBarButtonProps,
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs"
import AdDetails from "../screens/AdDetails"
import Home from "../screens/Home"
import OwnAds from "../screens/OwnAds"
import SingIn from "../screens/SingIn"

import HomeSVG from "../assets/home.svg"
import OwnadsSVG from "../assets/ownads.svg"
import LogoutSVG from "../assets/logout.svg"
import { useTheme } from "native-base"
import { Platform } from "react-native"

type AppRoutes = {
  home: undefined
  adDetails: undefined
  ownAds: undefined
  logout: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

const AppRoutes = () => {
  const { sizes, colors } = useTheme()

  const iconSize = sizes[8]

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray["900"],
        tabBarInactiveTintColor: colors.gray["400"],
        tabBarStyle: {
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 96,
          paddingBottom: sizes[8],
          paddingTop: sizes[8],
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSVG fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen
        name="ownAds"
        component={OwnAds}
        options={{
          tabBarIcon: ({ color }) => (
            <OwnadsSVG fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      {/* 
      <Screen
        name="logout"
        component={SingIn}
        options={{
          tabBarIcon: ({ color }) => (
            <LogoutSVG fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      /> */}
      <Screen
        name="adDetails"
        component={AdDetails}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  )
}

export default AppRoutes
