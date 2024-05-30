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
import { SignIn } from "@screens/signin";
import { config } from "src/theme/gluestack-style.config";
export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });
  return (
    <StyledProvider config={config}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <SignIn /> : <Loading />}
    </StyledProvider>
  );
}
