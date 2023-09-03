import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import { Role, useShowRoleLazyQuery } from "@/gql/generated";
import { EditRolePath } from "@/routes";
import { Badge, Box, Button, Spacer, Text } from "@chakra-ui/react";
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
        <Button onClick={() => router.push(EditRolePath(String(role?.id)))}>
          Editar
        </Button>
      </Box>
      <Box m={4}>
        <Text as={"b"}>Creado por</Text>
        <Box> {role?.name}</Box>

        <Text as={"b"}>Descripción</Text>
        <Box>{role?.description ? role?.description : "Sin descripción"}</Box>

        <Text as={"b"}>Permisos</Text>
        <Box>
          {role?.abilities?.length == 0 ? (
            <Box>Sin permisos</Box>
          ) : (
            role?.abilities?.map((ability) => {
              const colors: any = [
                { name: "create", color: "green" },
                { name: "read", color: "blue" },
                { name: "update", color: "yellow" },
                { name: "delete", color: "red" },
              ];
              const action = ability.name.split(":")[0];

              const badgeColor = colors.find(
                (color: any) => color.name === action
              )?.color;
              return (
                <Box key={ability.id} alignItems={"center"} display={"flex"}>
                  <Badge colorScheme={badgeColor} mr={2}>
                    {ability.name.split(":")[0]}
                  </Badge>

                  <Text>{ability.name.split(":")[1]}</Text>
                </Box>
              );
            })
          )}
        </Box>

        {/* TODO: Poner usuarios con este rol */}
      </Box>
    </IntroAnimationComponent>
  );
};

export default ShowRoleView;
