// Assets
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import BackgroundImg from "@assets/background.png";

// NativeBase components
import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesParams } from "@routes/auth.routes";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

import { useForm, Controller } from "react-hook-form";

export function SignUp() {
  const navigation = useNavigation();

  const { control, handleSubmit } = useForm<FormDataProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  function handleSignU(data: FormDataProps) {
    console.log(data);
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={10}>
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
          <Heading
            color="gray.100"
            fontSize={"xl"}
            mb={6}
            fontFamily={"heading"}
          >
            Crie sua conta
          </Heading>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input placeholder="Nome" onChangeText={onChange} value={value} />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirme a senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignU)}
                returnKeyType="send"
              />
            )}
          />

          <Button title="Criar e acessar" onPress={handleSubmit(handleSignU)} />
        </Center>

        <Button
          onPress={() => handleGoBack()}
          mt={24}
          title="Voltar para o login"
          variant={"outline"}
        />
      </VStack>
    </ScrollView>
  );
}
