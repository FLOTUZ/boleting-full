import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import { AccessType, useShowAccessTypeLazyQuery } from "@/gql/generated";
import { EditAccessTypePath } from "@/routes";
import { Text, Box, Heading, VStack, HStack, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ShowAccessTypeView = () => {
  const router = useRouter();
  const { id, accessTypeId } = router.query;

  const [accessType, setAccessType] = useState<AccessType>();

  const [showAccessType, { data, loading }] = useShowAccessTypeLazyQuery({
    onCompleted(data) {
      setAccessType(data.accessType as AccessType);
    },
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    if (accessTypeId != null) {
      showAccessType({
        variables: {
          accessTypeId: Number(accessTypeId),
        },
      });
    }
  }, [accessTypeId, showAccessType]);

  if (loading) {
    return <ProgressLoaderComponent />;
  }

  return (
    <IntroAnimationComponent data={data}>
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
            Se permite reentrada
          </Text>
          <Text>{accessType?.enter_and_exit_option ? "Si" : "No"}</Text>

          <Text mt={2} fontWeight="bold">
            Creado en
          </Text>
          <Text>{new Date(accessType?.createdAt).toLocaleString()}</Text>

          <Text mt={2} fontWeight="bold">
            Actualizado en
          </Text>
          <Text>{new Date(accessType?.updatedAt).toLocaleString()}</Text>
        </VStack>
        <HStack mt={4}>
          <Button colorScheme="red">Eliminar</Button>
          <Button
            colorScheme="green"
            onClick={() =>
              router.push(EditAccessTypePath(Number(id), Number(accessTypeId)))
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
