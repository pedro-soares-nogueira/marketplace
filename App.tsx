import {
  useFonts,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_900Black,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins"
import { Box, NativeBaseProvider } from "native-base"
import { StatusBar } from "react-native"
import Loading from "./src/components/Loading"
import { AdsContextProvider } from "./src/contexts/AdContext"
import { AuthContextProvider } from "./src/contexts/AuthContext"
import Routes from "./src/routes"
import { theme } from "./src/themes/theme"

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_900Black,
    Poppins_400Regular,
  })
  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        <AdsContextProvider>
          {fontsLoaded ? <Routes /> : <Loading />}
        </AdsContextProvider>
      </AuthContextProvider>
    </NativeBaseProvider>
  )
}
