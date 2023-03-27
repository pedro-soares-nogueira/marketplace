import {
  useFonts,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins"
import { NativeBaseProvider } from "native-base"
import { StatusBar } from "react-native"
import Loading from "./src/components/Loading"
import Routes from "./src/routes"
import { theme } from "./src/themes/theme"

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_900Black,
  })
  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </NativeBaseProvider>
  )
}
