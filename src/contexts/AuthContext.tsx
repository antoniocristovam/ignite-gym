import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { createContext, useState } from "react";
import { Alert } from "react-native";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (mail: string, password: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState({} as UserDTO);

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { password, email });

      if (data.user) {
        setUser(data.user);
      }
    } catch (error: string | any) {
      Alert.alert(error.message);

      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
