import {
  Text,
  Center,
  VStack,
  Heading,
  Skeleton,
  ScrollView,
  useToast,
} from "native-base";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native";

// Components
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { UserPhoto } from "@components/UserPhoto";
import { ScreenHeader } from "@components/ScreenHeader";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

export function Profile() {
  type FormDataProps = {
    name: string;
    email?: string;
    old_password?: string;
    confirm_password?: string | null;
    password?: string | null;
  };

  const profileSchema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório."),
    password: yup
      .string()
      .min(6, "Mínimo de 6 caracteres.")
      .nullable()
      .transform((value) => (!!value ? value : null)),
    confirm_password: yup
      .string()
      .nullable()
      .transform((value) => (!!value ? value : null))
      .oneOf([yup.ref("password")], "Senhas devem ser iguais.")
      .when("password", {
        is: (Field: any) => Field,
        then: (schema) =>
          schema.required("Confirmação de senha é obrigatória."),
      })
      .transform((value) => (!!value ? value : null)),
  });

  const { user, updateUserProfile } = useAuth();

  // State
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    "https://github.com/antoniocristovam.png"
  );
  const PHOTO_SIZE = 33;

  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
    resolver: yupResolver(profileSchema),
  });

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsLoading(true);

      const userUpdated = user;
      userUpdated.name = data.name;

      await api.put("/users", data);
      await updateUserProfile(userUpdated);
      toast.show({
        title: "Perfil atualizado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível atualizar o perfil.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected?.assets?.[0].uri) {
        if (
          photoSelected?.assets[0].fileSize &&
          photoSelected?.assets[0].fileSize / 1024 / 1024 > 5
        ) {
          return toast.show({
            title: "A imagem deve ter no máximo 5MB",
            placement: "top",
            bgColor: "red.500",
          });
        }
        setUserPhoto(photoSelected?.assets?.[0].uri);
        toast.show({
          title: "Foto de perfil atualizada com sucesso!",
          placement: "top",
          bgColor: "green.500",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView _contentContainerStyle={{ paddingBottom: 5 }}>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded={"full"}
              startColor={"gray.500"}
              endColor={"gray.300"}
            />
          ) : (
            <UserPhoto
              source={{ uri: userPhoto }}
              alt="Foto de perfil de Antonio Cristovam"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color={"green.500"}
              fontSize={"md"}
              mt={2}
              mb={8}
              fontWeight={"bold"}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Nome"
                bg={"gray.600"}
                value={value}
                onChangeText={onChange}
                errorMessage={errors?.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                isDisabled={true}
                placeholder="E-mail"
                bg={"gray.600"}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </Center>
        <VStack px={10} mt={12} mb={9}>
          <Heading
            color={"gray.200"}
            fontSize={"md"}
            mb={2}
            alignItems={"self-start"}
            fontFamily={"heading"}
          >
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name="old_password"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Senha antiga"
                bg={"gray.600"}
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Nova senha"
                bg={"gray.600"}
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors?.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Confirme nova senha"
                bg={"gray.600"}
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors?.confirm_password?.message}
              />
            )}
          />

          <Button
            title="Atualizar"
            mt={4}
            onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isLoading}
          />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
