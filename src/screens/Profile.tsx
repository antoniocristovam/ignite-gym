import { UserPhoto } from "@components/UserPhoto";
import { ScreenHeader } from "@components/ScreenHeader";
import { Center, ScrollView, VStack, Skeleton } from "native-base";
import { useState } from "react";

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
        </Center>
      </ScrollView>
    </VStack>
  );
}
