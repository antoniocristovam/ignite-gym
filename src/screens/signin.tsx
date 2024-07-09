// Assets
import { useState } from "react";
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import BackgroundImg from "@assets/background.png";

import { AuthNavigatorRoutesParams } from "@routes/auth.routes";

// NativeBase components
import {
  Text,
  Image,
  Center,
  VStack,
  Heading,
  useToast,
  ScrollView,
} from "native-base";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";

type FormData = {
  email: string;
  password: string;
};

export function SignIn() {
  const toast = useToast();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<AuthNavigatorRoutesParams>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  async function handleSignIn({ email, password }: FormData) {
    try {
      setLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : "Erro na autenticação.";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setLoading(false);
    }
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

          <Controller
            control={control}
            name="email"
            rules={{ required: "E-mail é obrigatório" }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                autoCapitalize="none"
                onChangeText={onChange}
                keyboardType="email-address"
                errorMessage={errors?.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{ required: "Senha é obrigatória" }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                autoCapitalize="none"
                onChangeText={onChange}
                secureTextEntry
                errorMessage={errors?.password?.message}
              />
            )}
          />
          <Button
            isLoading={loading}
            onPress={handleSubmit(handleSignIn)}
            title="Acessar"
          />
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
