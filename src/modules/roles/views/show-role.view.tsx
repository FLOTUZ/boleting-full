import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import { Role, useShowRoleLazyQuery } from "@/gql/generated";
import { Box, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ShowRoleView = () => {
  const router = useRouter();
  const { roleId } = router.query;
  const [role, setrole] = useState<Role>();

  const [getRole, { loading, error }] = useShowRoleLazyQuery({
    onCompleted(data) {
      setrole(data.role as Role);
    },
  });

  useEffect(() => {
    if (roleId) {
      getRole({ variables: { roleId: Number(roleId) } });
    }
  }, [getRole, roleId]);

  if (error) {
    return (
      <ul>
        {error.graphQLErrors.map(({ message }, index) => {
          return <li key={index}>{message}</li>;
        })}
      </ul>
    );
  }

  if (loading) {
    return <ProgressLoaderComponent />;
  }

  return (
    <IntroAnimationComponent data={role}>
      <Box m={4}>
        <Button onClick={() => router.back()}>Editar</Button>
      </Box>
      <Box m={4}>
        <Text as={"b"}>Creado por</Text>
        <Box> {role?.name}</Box>

        <Text as={"b"}>Descripción</Text>
        <Box>{role?.description ? role?.description : "Sin descripción"}</Box>

        <Text as={"b"}>Permisos</Text>
        <Box>
          {role?.abilities?.map((ability) => (
            <Text key={ability.id}>{ability.name}</Text>
          ))}
        </Box>

        {/* TODO: Poner usuarios con este rol */}
      </Box>
    </IntroAnimationComponent>
  );
};

export default ShowRoleView;
