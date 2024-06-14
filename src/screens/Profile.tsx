import { UserPhoto } from "@components/UserPhoto";
import { ScreenHeader } from "@components/ScreenHeader";
import {
  Center,
  ScrollView,
  VStack,
  Skeleton,
  Text,
  Heading,
} from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Input } from "@components/input";
import { Button } from "@components/button";

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const PHOTO_SIZE = 33;
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView>
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
              source={{ uri: "https://github.com/antoniocristovam.png" }}
              alt="Foto de perfil de Antonio Cristovam"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity>
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
          <Heading color={"gray.200"} fontSize={"md"} mb={2}>
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
