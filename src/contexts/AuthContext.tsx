import { UserDTO } from "@dtos/UserDTO";
import { createContext, useState } from "react";

export type AuthContextDataProps = {
  user: UserDTO;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState({
    id: "a",
    name: "John asas",
    email: "tste@gmail.com",
    avatar: "an.png",
  });

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
