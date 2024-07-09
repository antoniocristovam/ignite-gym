import { useAuth } from "@hooks/useAuth";
import { useTheme, Box } from "native-base";
import { AuthRoutes } from "./auth.routes";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

export function Routes() {
  const { colors } = useTheme();
  const { user } = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  console.log("=>>>>>", user);

  return (
    <Box flex={1} bg={"gray.700"}>
      <NavigationContainer theme={theme}>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  );
}
