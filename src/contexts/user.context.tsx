import { createContext, useContext, useEffect } from "react";
import { UserEntity } from "@/gql/generated";
import { useSession } from "@/hooks/useSession";
import CircularLoaderComponent from "@/components/loaders/circular-loader.component";
import LoginView from "@/modules/auth/views/login.view";

export type UserContextType = {
  user: UserEntity | null;
  setUser: (user: UserEntity | null) => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { getUser, user, setUser, userLoading, logout } = useSession();

  if (userLoading) {
    return <CircularLoaderComponent />;
  }

  if (!getUser()) {
    return <LoginView />;
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
