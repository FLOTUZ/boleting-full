import { createContext, useContext, useEffect } from "react";
import { UserClient } from "@/gql/generated";
import { useClientSession } from "@/hooks/useClientSession";

interface ClientContextProps {
  client: UserClient | null;
  login: (client: UserClient) => void;
  logout: () => void;
}

export const ClientSessionContext = createContext<ClientContextProps>({
  client: null,
  login: () => {},
  logout: () => {},
});

export const useClient = () => useContext(ClientSessionContext);

export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const { client, login, logout } = useClientSession();

  return (
    <ClientSessionContext.Provider value={{ client, login, logout }}>
      {children}
    </ClientSessionContext.Provider>
  );
};
