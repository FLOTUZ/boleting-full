import { User } from "@/gql/generated";
import { EventsPath, LoginPath } from "@/routes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useUserSession = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  const router = useRouter();

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoginLoading(true);

    const response = await fetch("/api/user-auth", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setLoginLoading(false);

    const data = await response.json();

    if (response.ok) {
      const token = response.headers.get("Authorization")!;
      localStorage.setItem("access-token", token);
      localStorage.setItem("user", JSON.stringify(data as User));

      router.replace(EventsPath);
      return;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access-token");
    router.push(LoginPath);
  };

  useEffect(() => {
    const getUser = (): User | null => {
      const userStorage = localStorage.getItem("user");

      if (userStorage) setUser(JSON.parse(userStorage));

      return null;
    };
    getUser();
  }, []);

  return {
    user,
    setUser,
    logout,
    login,
    loginLoading,
  };
};
