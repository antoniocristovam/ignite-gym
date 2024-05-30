import { Center, Spinner, useTheme } from "@gluestack-ui/themed";
import { configThemeCustom } from "src/theme";

export function Loading() {
  const theme = useTheme();
  console.log(theme);

  return (
    <Center flex={1} backgroundColor={configThemeCustom.tokens.colors.gray300}>
      <Spinner />
    </Center>
  );
}
