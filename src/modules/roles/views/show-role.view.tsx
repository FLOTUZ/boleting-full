import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import UsersByRoleDatatable from "../components/users-by-role.datatable";

import { useRouter } from "next/router";

import { EditRolePath } from "@/routes";
import { useShowRole } from "../hooks/use-show-role.hook";
import { BiRefresh } from "react-icons/bi";
import { Badge, Box, Button, HStack, Text } from "@chakra-ui/react";

const ShowRoleView = () => {
  const router = useRouter();

  const { role, loading: progressPending, error, refetch } = useShowRole();

  if (error) {
    return (
      <ul>
        {error.graphQLErrors.map(({ message }, index) => {
          return <li key={index}>{message}</li>;
        })}
      </ul>
    );
  }

  if (progressPending) {
    return <ProgressLoaderComponent />;
  }

  return (
    <IntroAnimationComponent data={role}>
      <Box m={4}>
        <HStack>
          <Button onClick={() => refetch()}>
            <BiRefresh size={24} />
          </Button>
          <Button onClick={() => router.push(EditRolePath(String(role?.id)))}>
            Editar
          </Button>
        </HStack>
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

        <Box mt={4}>
          <UsersByRoleDatatable
            data={role?.users!}
            progressPending={progressPending}
          />
        </Box>
      </Box>
    </IntroAnimationComponent>
  );
};

export default ShowRoleView;
