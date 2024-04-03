import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUserClientIsAuthenticatedLazyQuery } from "@/gql/generated";
import { LoginClientPath } from "@/routes";
import { Button, Flex, Center } from "@chakra-ui/react";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";

interface AutenticationClientProps {
  children?: React.ReactNode | React.ReactNode[];
}

const AutenticationClientComponent = ({
  children,
}: AutenticationClientProps) => {
  const router = useRouter();
  const [isAutenticatedClient, setIsAutenticatedClient] = useState<Boolean>();
  const [GET_USER_CLIENT_IS_AUTHENTICATED, { loading }] =
    useUserClientIsAuthenticatedLazyQuery({
      fetchPolicy: "network-only",
      onCompleted(data) {
        setIsAutenticatedClient(data.userClientIsAuthenticated as Boolean);
      },
      onError(error) {
        console.error(error);
      },
    });

  useEffect(() => {
    GET_USER_CLIENT_IS_AUTHENTICATED();
  }, [GET_USER_CLIENT_IS_AUTHENTICATED]);

  if (loading) {
    return <ProgressLoaderComponent />;
  }

  return isAutenticatedClient ? (
    <>{children}</>
  ) : (
    <Center>
      <Flex
        placeContent={"center"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        Usuario no autenticado
        <Button
          mt={4}
          onClick={() => {
            router.push(LoginClientPath);
          }}
        >
          Presione aqui para iniciar sesion
        </Button>
      </Flex>
    </Center>
  );
};
export default AutenticationClientComponent;
