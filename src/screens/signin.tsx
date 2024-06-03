// Assets
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/input";
import BackgroundImg from "@assets/background.png";

// NativeBase components
import { Center, Heading, Image, Text, VStack } from "native-base";

export function SignIn() {
  return (
    <VStack flex={1} bg={"gray.700"} px={10}>
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
        <Input
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input placeholder="Senha" secureTextEntry />
      </Center>

      <Center mt={24}>
        <Text
          color={"gray.100"}
          fontSize={"sm"}
          marginBottom={3}
          fontFamily={"body"}
        >
          Ainda não tem acesso ?
        </Text>
      </Center>
    </VStack>
  );
}
