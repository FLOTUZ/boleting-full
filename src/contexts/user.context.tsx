import { createContext, useContext } from "react";
import { User } from "@/gql/generated";
import { useUserSession } from "@/hooks/useUserSession";
import CircularLoaderComponent from "@/components/loaders/circular-loader.component";
import { LoginPath } from "@/routes";
import { useRouter } from "next/router";
import { Button, Card, Center, Container, Text } from "@chakra-ui/react";

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
  const router = useRouter();
  const { user, setUser, logout, loginLoading } = useUserSession();

  if (loginLoading) {
    return <CircularLoaderComponent />;
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {user ? (
        children
      ) : (
        <Center h={"100vh"} flexDirection={"column"}>
          <Text>No estas autorizado</Text>
          <Button onClick={() => router.replace(LoginPath)}>
            Iniciar sesión
          </Button>
        </Center>
      )}
    </UserContext.Provider>
  );
};
