// Import
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { HStack, Heading, Text, VStack, Icon } from "native-base";

// Component
import { UserPhoto } from "./UserPhoto";
import { useAuth } from "@hooks/useAuth";

import defaultUserImage from "@assets/userPhotoDefault.png";

export function HomeHeader() {
  const { user, signOut } = useAuth();

  return (
    <HStack bg={"gray.600"} pt={16} pb={5} px={8} alignItems={"center"}>
      <UserPhoto
        source={user.avatar ? { uri: user.avatar } : defaultUserImage}
        alt="Foto de perfil de Antonio Cristovam"
        size={16}
        mr={4}
      />
      <VStack flex={1}>
        <Text color={"gray.100"} fontSize={"md"}>
          Olá,
        </Text>
        <Heading color={"gray.100"} fontSize={"md"} fontFamily={"heading"}>
          {user.name}
        </Heading>
      </VStack>
      <TouchableOpacity onPress={signOut}>
        <Icon as={MaterialIcons} name="logout" size={7} color={"gray.200"} />
      </TouchableOpacity>
    </HStack>
  );
}
