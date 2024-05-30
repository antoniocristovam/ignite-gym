import { StatusBar, View } from "react-native";
import {
  GluestackUIStyledProvider,
  StyledProvider,
} from "@gluestack-ui/themed";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Loading } from "@components/Loading/loading";
import { configThemeCustom } from "src/theme";
export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });
  return (
    <StyledProvider config={configThemeCustom}>
      <GluestackUIStyledProvider config={configThemeCustom}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? <View /> : <Loading />}
      </GluestackUIStyledProvider>
    </StyledProvider>
  );
}
