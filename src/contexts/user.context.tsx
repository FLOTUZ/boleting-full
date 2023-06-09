import { createContext, useContext, useEffect } from "react";
import { User } from "@/gql/generated";
import { useSession } from "@/hooks/useSession";
import CircularLoaderComponent from "@/components/loaders/circular-loader.component";
import { useRouter } from "next/router";
import { LoginPath } from "@/routes";

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser, logout, loginLoading } = useSession();

  if (loginLoading) {
    return <CircularLoaderComponent />;
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
