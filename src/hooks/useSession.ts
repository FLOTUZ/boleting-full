import { UserEntity, useLoginMutation, useWhoAmIQuery } from "@/gql/generated";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

export const useSession = () => {
  const [user, setUser] = useState<UserEntity | null>(null);

  const router = useRouter();
  const toast = useToast();

  const [login, { loading: loginLoading, error: loginError }] =
    useLoginMutation({
      async onCompleted(data) {
        localStorage.setItem(
          "access-token",
          data.login.accessToken ? data.login.accessToken : ""
        );

        await refetchUser();
        router.replace("/");
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

  const { refetch: refetchUser, loading: userLoading } = useWhoAmIQuery({
    onCompleted(data) {
      setUser(data.me as UserEntity);
      localStorage.setItem("user", JSON.stringify(data.me));
    },
    onError(error) {
      console.log({
        message: "Error on get user",
        error,
      });
    },
  });

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access-token");
    router.push("/auth/login");
  };

  const getUser = (): UserEntity | null => {
    if (user) return user;

    const userStorage = localStorage.getItem("user");

    if (userStorage) {
      setUser(JSON.parse(userStorage));
      return JSON.parse(userStorage) as UserEntity;
    }

    return null;
  };

  return {
    getUser,
    user,
    setUser,
    refetchUser,
    userLoading,
    logout,
    login,
    loginLoading,
    loginError,
  };
};
