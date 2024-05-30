import { VStack, Image, Text, Center } from "@gluestack-ui/themed";

import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";

export function SignIn() {
  return (
    <VStack flex={1} bg={"$gray700"}>
      <Image
        source={BackgroundImg}
        position="absolute"
        resizeMode="contain"
        alt="Pessoas treinando"
      />
      <Center>
        <LogoSvg />
        <Text>Treine sua mente e seu corpo</Text>
      </Center>
    </VStack>
  );
}
