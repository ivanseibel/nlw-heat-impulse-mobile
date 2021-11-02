import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from "../services/api";
import { Message } from '../components/Message/index';


type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

type AuthContextData = {
  user: User | null;
  isSigningIn: boolean;
  signIn(): Promise<void>;
  signOut(): Promise<void>;
}

type AuthResponse = {
  token: string;
  user: User;
}

type AuthorizationResponse = {
  params: {
    code?: string;
    error?: string;
  },
  type?: string;
}

const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode;
}

const CLIENT_ID = 'a6aaa95d1d7ce8446491';
const SCOPE = 'read:user';
const USER_STORAGE = '@nlwheat:user';
const TOKEN_STORAGE = '@nlwheat:token';

function AuthProvider({ children }: AuthProviderProps) {
  const [isSigningIn, setIsSigningIn] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const authUrl = `https://github.com/login/oauth/authorize?scope=${SCOPE}&client_id=${CLIENT_ID}`;

  const signIn = useCallback(async () => {
    try {
      setIsSigningIn(true);
      const authSessionResponse = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

      if (
        authSessionResponse.type === 'success' &&
        authSessionResponse.params.error !== 'access_denied'
      ) {
        const result = await api.post<AuthResponse>('/authenticate', { code: authSessionResponse.params.code });

        const { token, user } = result.data;
        setUser(user);

        api.defaults.headers.common.authorization = `Bearer ${token}`;

        await AsyncStorage.setItem(TOKEN_STORAGE, JSON.stringify(token));
        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSigningIn(false);
    }

  }, []);

  const signOut = useCallback(async () => {
    setUser(null);
    delete api.defaults.headers.common.authorization;
    await AsyncStorage.removeItem(TOKEN_STORAGE);
    await AsyncStorage.removeItem(USER_STORAGE);
  }, []);

  useEffect(() => {
    const getStorageUserDate = async () => {
      const userStorage = await AsyncStorage.getItem(USER_STORAGE);
      const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);

      if (userStorage && tokenStorage) {
        api.defaults.headers.common.authorization = `Bearer ${tokenStorage}`;
        setUser(JSON.parse(userStorage));
      }

      setIsSigningIn(false);
    };

    getStorageUserDate();
  }, [setUser, setIsSigningIn]);

  return (
    <AuthContext.Provider value={{
      user,
      signOut,
      isSigningIn,
      signIn,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };