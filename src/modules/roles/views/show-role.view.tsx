import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";

import { useRouter } from "next/router";

import { EditRolePath } from "@/routes";
import { useShowRole } from "../hooks/use-show-role.hook";
import { Badge, Box, Button, Text } from "@chakra-ui/react";

const ShowRoleView = () => {
  const router = useRouter();

  const { role, loading, error } = useShowRole();

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
