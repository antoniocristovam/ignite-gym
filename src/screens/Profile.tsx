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

export function Profile() {
  // State
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    "https://github.com/antoniocristovam.png"
  );
  const PHOTO_SIZE = 33;

  const toast = useToast();

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
          <Input placeholder="Nome" bg={"gray.600"} />
          <Input isDisabled placeholder="E-mail" bg={"gray.600"} />
        </Center>
        <VStack px={10} mt={12} mb={9}>
          <Heading
            color={"gray.200"}
            fontSize={"md"}
            mb={2}
            alignItems={"self-start"}
          >
            Alterar senha
          </Heading>
          <Input placeholder="Senha antiga" bg={"gray.600"} secureTextEntry />
          <Input placeholder="Nova senha" bg={"gray.600"} secureTextEntry />
          <Input
            placeholder="Confirme nova senha"
            bg={"gray.600"}
            secureTextEntry
          />
          <Button title="Atualizar" mt={4} />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
