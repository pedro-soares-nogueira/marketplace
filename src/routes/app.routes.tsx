import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs"
import AdDetails from "../screens/AdDetails"
import Home from "../screens/Home"
import OwnAds from "../screens/OwnAds"

import HomeSVG from "../assets/home.svg"
import OwnadsSVG from "../assets/ownads.svg"
import { Icon, useTheme } from "native-base"
import { Platform } from "react-native"
import NewAdform from "../screens/NewAdform"
import { useAuth } from "../contexts/AuthContext"
import { useEffect } from "react"
import Loading from "../components/Loading"
import { MaterialIcons } from "@expo/vector-icons"
import { AdPreviewDTO } from "../models/AdPreviewDTO"
import AdPreview from "../screens/AdPreview"
import OwnAdDetails from "../screens/OwnAdDetails"
import { AdDTO } from "../models/AdDTO"

type AppRoutes = {
  home: undefined
  adPreview: { adPreview: AdPreviewDTO } | undefined
  adDetails: undefined
  newAdform: { adDetails: AdDTO } | undefined
  ownAds: undefined
  logout: undefined
  ownAdDetails: { adId: string }
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
      <Screen
        name="adDetails"
        component={AdDetails}
        options={{ tabBarButton: () => null, tabBarStyle: { display: "none" } }}
      />

      <Screen
        name="newAdform"
        component={NewAdform}
        options={{ tabBarButton: () => null, tabBarStyle: { display: "none" } }}
      />

      <Screen
        name="adPreview"
        component={AdPreview}
        options={{ tabBarButton: () => null, tabBarStyle: { display: "none" } }}
      />

      <Screen
        name="ownAdDetails"
        component={OwnAdDetails}
        options={{ tabBarButton: () => null, tabBarStyle: { display: "none" } }}
      />

      <Screen
        name="logout"
        component={() => {
          const { signOut } = useAuth()

          async function handleSignOut() {
            await signOut()
          }

          useEffect(() => {
            handleSignOut()
          }, [])
          return <Loading />
        }}
        options={{
          tabBarIcon: () => (
            <Icon as={MaterialIcons} name="logout" color="red.600" size={7} />
          ),
        }}
      />
    </Navigator>
  )
}

export default AppRoutes
