import { UserPhoto } from "@components/UserPhoto";
import { ScreenHeader } from "@components/ScreenHeader";
import { Center, ScrollView, VStack, Skeleton, Text } from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Input } from "@components/input";

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
      </ScrollView>
    </VStack>
  );
}
