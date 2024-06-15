// Assets
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import BackgroundImg from "@assets/background.png";

import { AuthNavigatorRoutesParams } from "@routes/auth.routes";

// NativeBase components
import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesParams>();

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={10}>
        <Image
          position="absolute"
          defaultSource={BackgroundImg}
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
          <Heading
            color="gray.100"
            fontSize={"xl"}
            mb={6}
            fontFamily={"heading"}
          >
            Acesse sua conta
          </Heading>
          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input placeholder="Senha" secureTextEntry />
          <Button title="Acessar" />
        </Center>

        <Center mt={40}>
          <Text
            color={"gray.100"}
            fontSize={"sm"}
            marginBottom={3}
            fontFamily={"body"}
          >
            Ainda não tem acesso ?
          </Text>
        </Center>
        <Button
          onPress={() => handleNewAccount()}
          title="Criar Conta"
          variant={"outline"}
        />
      </VStack>
    </ScrollView>
  );
}
