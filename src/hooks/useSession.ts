import { User, useLoginMutation, useWhoAMiQuery } from "@/gql/generated";
import { LoginPath, rootPath } from "@/routes";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export const useSession = () => {
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();
  const toast = useToast();

  const [login, { loading: loginLoading, error: loginError }] =
    useLoginMutation({
      async onCompleted(data) {
        localStorage.setItem(
          "access-token",
          data.login.accessToken ? data.login.accessToken : ""
        );

        localStorage.setItem("user", JSON.stringify(data.login.user as User));

        router.replace(rootPath);
      },

      onError(error) {
        toast({
          title: error.name,
          description: error.message,
          colorScheme: "red",
        });
        console.error({
          error,
        });
      },
    });

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access-token");
    router.push(LoginPath);
  };

  useEffect(() => {
    const getUser = (): User | null => {
      const userStorage = localStorage.getItem("user");

      if (userStorage) {
        setUser(JSON.parse(userStorage));
        return JSON.parse(userStorage) as User;
      }

      return null;
    };
    getUser();
  }, []);

  useEffect(() => {
    const userStorage = localStorage.getItem("user");

    if (!userStorage) {
      router.replace(LoginPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    user,
    setUser,
    logout,
    login,
    loginLoading,
    loginError,
  };
};
