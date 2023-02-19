import { Storage } from "@ionic/storage";
import axios, { AxiosError, AxiosResponse } from "axios";
import { createContext, useContext, useEffect, useState } from "react";

import { NoServerException } from "./NoServerException";
import { InvalidCredentialsException } from "./InvalidCredentialsException";

const TOKEN_KEY = "token";
const SERVER_KEY = "server";

interface LoginResponse {
  status: string;
  user: {
    id: number;
    email: string;
    username: string;
    rol: string;
  };
  token: string;
}
export const AuthContext = createContext<{
  token: string;
  server: string;
  login: Function;
  logout: Function;
  isLoading: boolean;
  connectServer: Function;
} | null>(null);
export const AuthProvider = ({ children }: { children: any }) => {
  const [store, setStore] = useState<Storage>();
  const [token, setToken] = useState("");
  const [server, setServer] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await initStorage();
    setIsLoading(false);
  };
  const initStorage = async () => {
    const createStore = new Storage({
      name: "stock-distribuidoras",
    });
    const store = await createStore.create();
    setStore(store);

    const token = (await store.get(TOKEN_KEY)) || "";
    const server = (await store.get(SERVER_KEY)) || "";

    setToken(token);
    setServer(server);
  };
  const login = async (username: string, password: string) => {
    if (!server) throw new NoServerException();

    try {
      const response: AxiosResponse<LoginResponse> = await axios.post(
        `${server}/auth/login`,
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        const { token } = response.data;

        await store?.set(TOKEN_KEY, token);
        setToken(token);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response!.status === 401) {
          throw new InvalidCredentialsException();
        }
      }

      throw err;
    }
  };

  const logout = async () => {
    try {
      await store?.remove(TOKEN_KEY);
      setToken("");
    } catch (err) {}
  };

  const connectServer = async (serverUrl: string) => {
    try {
      await store?.remove(TOKEN_KEY);
      await store?.set(SERVER_KEY, serverUrl);
      setToken("");
      setServer(serverUrl);
    } catch (err) {
      throw err;
    }
  };

  const values = {
    token,
    login,
    logout,
    server,
    isLoading,
    connectServer,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth has to be used within <AuthContext.Provider>");
  }

  return auth;
};
