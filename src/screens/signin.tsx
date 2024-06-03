// Assets
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/input";
import BackgroundImg from "@assets/background.png";

// NativeBase components
import { Center, Heading, Image, Text, VStack } from "native-base";

export function SignIn() {
  return (
    <VStack flex={1} bg={"gray.700"}>
      <Image
        position="absolute"
        resizeMode="contain"
        source={BackgroundImg}
        alt="Pessoas treinando"
      />
      <Center my={24}>
        <LogoSvg />
        <Text color={"gray.100"} fontSize={"sm"}>
          Treine sua mente e seu corpo
        </Text>
      </Center>

      <Center justifyContent="center" alignItems="center">
        <Heading color="gray.100" fontSize={"xl"} mb={6} fontFamily={"heading"}>
          Acesse sua conta
        </Heading>
        <Input />
      </Center>
    </VStack>
  );
}
