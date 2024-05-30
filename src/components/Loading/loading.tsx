import { Center, Spinner, useTheme } from "@gluestack-ui/themed";
export function Loading() {
  const theme = useTheme();
  console.log(theme);

  return (
    <Center flex={1} backgroundColor={"$gray300"}>
      <Spinner />
    </Center>
  );
}
