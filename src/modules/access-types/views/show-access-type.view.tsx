import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import { EditAccessTypePath } from "@/routes";
import { Text, Box, Heading, VStack, HStack, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useShowAccessType } from "../hooks/use-show-access-type.hook";

const ShowAccessTypeView = () => {
  const router = useRouter();
  const { id: eventId, accessTypeId } = router.query;

  const { accessType, loading } = useShowAccessType({ accessTypeId, eventId });

  if (loading) {
    return <ProgressLoaderComponent />;
  }

  return (
    <IntroAnimationComponent data={accessType}>
      <Box m={4}>
        <Heading as={"h1"} size={"lg"} fontWeight="bold">
          Ver Acceso
        </Heading>
        <VStack alignItems={"start"} spacing={2}>
          <Text mt={2} fontWeight="bold">
            Nombre
          </Text>
          <Text>{accessType?.name}</Text>

          <Text mt={2} fontWeight="bold">
            Descripción
          </Text>
          <Text>{accessType?.description}</Text>

          <Text mt={2} fontWeight="bold">
            Precio
          </Text>
          <Text>$ {accessType?.price.toString()} MXN </Text>

          <Text mt={2} fontWeight="bold">
            Se permite reentrada
          </Text>
          <Text>{accessType?.enter_and_exit_option ? "Si" : "No"}</Text>

          <Text mt={2} fontWeight="bold">
            Creado en
          </Text>
          {accessType?.createdAt != null && (
            <Text>{new Date(accessType.createdAt).toLocaleString()}</Text>
          )}

          <Text mt={2} fontWeight="bold">
            Actualizado en
          </Text>
          {accessType?.updatedAt != null && (
            <Text>{new Date(accessType.updatedAt).toLocaleString()}</Text>
          )}
        </VStack>
        <HStack mt={4}>
          <Button colorScheme="red">Eliminar</Button>
          <Button
            colorScheme="green"
            onClick={() =>
              router.push(
                EditAccessTypePath(Number(eventId), Number(accessTypeId))
              )
            }
          >
            Editar
          </Button>
        </HStack>
      </Box>
    </IntroAnimationComponent>
  );
};

export default ShowAccessTypeView;
