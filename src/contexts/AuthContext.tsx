import { api } from "@services/api";
import { UserDTO } from "@dtos/UserDTO";
import { createContext, useEffect, useState } from "react";
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from "@storage/storageUser";
import { storageAuthTokenSave } from "@storage/storageAuthToken";

export type AuthContextDataProps = {
  user: UserDTO;
  isLoadingUserStorageData: boolean;
  signIn: (mail: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);

  async function storageUserAndToken(userData: UserDTO, token: string) {
    try {
      setUser(userData);
      await storageUserSave(userData);
      await storageAuthTokenSave(token);
      setIsLoadingUserStorageData(true);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { password, email });

      if (data.user && data.token) {
        setUser(data.user);
        storageUserAndToken(data.user, data.token);
      }
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as UserDTO);
      await storageUserRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function loadUserData() {
    try {
      const userLogged = await storageUserGet();

      if (userLogged) {
        setUser(userLogged);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signIn, isLoadingUserStorageData, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
