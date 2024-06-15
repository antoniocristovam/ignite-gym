import { Center, Spinner, useTheme } from "native-base";

export function Loading() {
  const theme = useTheme();
  return (
    <Center flex={1} bg={"gray.700"}>
      <Spinner color={"green.500"} />
    </Center>
  );
}
