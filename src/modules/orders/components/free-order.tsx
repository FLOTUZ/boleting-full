import { AccessType } from "@/gql/generated";
import { TermsAndConditionsPath } from "@/routes";
import {
  Center,
  Card,
  Heading,
  Checkbox,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

interface FreeOrderProps {
  accessType: AccessType;
  onSubmit: () => void;
}

const FreeOrder = ({ accessType, onSubmit }: FreeOrderProps) => {
  return (
    <Center>
      <Card p={4} w={"80%"}>
        <Box display={"flex"} alignItems={"center"}>
          <Text fontSize={"3xl"}>Acceso</Text>
          <Heading size={"xl"} mx={2}>
            {accessType?.name.toLocaleLowerCase()}
          </Heading>
          <Text fontSize={"3xl"} mr={2}>
            para
          </Text>
          <Heading size={"xl"}>{accessType?.description}</Heading>
        </Box>
        <Box display={"flex"} alignItems={"center"} my={4}>
          <Checkbox mr={1}>
            Al dar click en registrar, usted acepta los
          </Checkbox>

          <Link href={TermsAndConditionsPath} color="blue">
            <Text
              fontWeight={"bold"}
              fontSize={"lg"}
              color={"twitter.500"}
              _dark={{ color: "twitter.300" }}
            >
              Términos de Servicio de {process.env.NEXT_PUBLIC_SYSTEM_NAME}
            </Text>
          </Link>
        </Box>
        <Button w={"full"} onClick={onSubmit}>
          Registrar
        </Button>
      </Card>
    </Center>
  );
};

export default FreeOrder;
