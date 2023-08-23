import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";

import Link from "next/link";
import { Text, Box, Button } from "@chakra-ui/react";
import { EditUserPath } from "@/routes";
import { useShowUser } from "../hooks/use-show-user.hook";
import { useRouter } from "next/router";
import RemoveUserModalComponent from "../components/remove-user-modal.component";

const ShowUserView = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { user, error, loading } = useShowUser(userId as string);

  if (error) {
    return (
      <Box m={4}>
        {error.graphQLErrors.map((error, index) => (
          <pre key={index}>{error.message}</pre>
        ))}
      </Box>
    );
  }

  if (loading) {
    return <ProgressLoaderComponent />;
  }
  return (
    <IntroAnimationComponent data={user}>
      <Box m={4}>
        <Link href={EditUserPath(String(user?.id))}>
          <Button>Editar</Button>
        </Link>
        <RemoveUserModalComponent userId={user?.id!} />
      </Box>
      <Box m={4}>
        <Text as={"b"}>Nombre</Text>
        <Text> {user?.name}</Text>

        <Text as={"b"}>Apellido</Text>
        <Text> {user?.last_name}</Text>

        <Text as={"b"}>Email</Text>
        <Text> {user?.email}</Text>

        <Text as={"b"}>Roles</Text>
        <Text> {user?.roles?.map((role) => role.name).join(", ")}</Text>

        <Text as={"b"}>Fecha de creación</Text>
        <Text> {new Date(user?.createdAt).toLocaleString()}</Text>

        <Text as={"b"}>Ultima actualización</Text>
        <Text> {new Date(user?.updatedAt).toLocaleString()}</Text>
      </Box>
    </IntroAnimationComponent>
  );
};

export default ShowUserView;
