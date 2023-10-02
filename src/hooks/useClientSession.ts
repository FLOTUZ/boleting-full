import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import { UserClient } from "@/gql/generated";
import { LoginClientPath, rootPath } from "@/routes";

import { useToast } from "@chakra-ui/react";

export const useClientSession = () => {
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

      router.back();
      return;
    }

    throw new Error(data.message);
  };

  const logout = () => {
    setClient(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access-token");
    router.push(rootPath);
  };

  const getUser = useCallback(() => {
    const userStorage = localStorage.getItem("user");

    if (userStorage) {
      setClient(JSON.parse(userStorage));
    } else {
      router.replace(LoginClientPath);
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
