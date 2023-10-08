import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import { UserClient } from "@/gql/generated";
import { rootPath } from "@/routes";
import { useToast } from "@chakra-ui/react";

export const useClientSession = () => {
  const toast = useToast();
  const router = useRouter();

  const [client, setClient] = useState<UserClient | null>(null);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const response = await fetch("/api/client-auth", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      const token = response.headers.get("Authorization")!;
      localStorage.setItem("access-token", token);
      localStorage.setItem("user", JSON.stringify(data as UserClient));
      setClient(data as UserClient);
      return true;
    }

    toast({
      title: "Error",
      description: data.message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });

    return false;
  };

  const logout = () => {
    setClient(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access-token");

    router.replace(rootPath);
  };

  const getUser = useCallback(() => {
    const userStorage = localStorage.getItem("user");

    if (userStorage) {
      setClient(JSON.parse(userStorage));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return {
    client,
    login,
    logout,
  };
};
