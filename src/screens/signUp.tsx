// Assets
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import * as yup from "yup";
import BackgroundImg from "@assets/background.png";
import { yupResolver } from "@hookform/resolvers/yup";

// NativeBase components
import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "native-base";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { api } from "@services/api";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Alert } from "react-native";
import { AppError } from "@utils/AppError";

const signUpSchema = yup.object({
  name: yup.string().required("Nome é obrigatório."),
  email: yup
    .string()
    .required("E-mail é obrigatório.")
    .email("E-mail inválido."),
  password: yup
    .string()
    .required("Senha é obrigatória.")
    .min(6, "Mínimo de 6 caracteres."),
  password_confirm: yup
    .string()
    .required("Confirmação de senha é obrigatória.")
    .oneOf([yup.ref("password")], "Senhas devem ser iguais."),
});

export function SignUp() {
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleSignUp({ name, email, password }: FormDataProps) {
    try {
      const response = await api.post("/users", { name, email, password });
      console.log(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível criar a conta.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
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
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors?.name?.message}
              />
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
                errorMessage={errors?.email?.message}
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
                errorMessage={errors?.password?.message}
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
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors?.password_confirm?.message}
              />
            )}
          />

          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
          />
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
