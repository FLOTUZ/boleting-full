import {
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiLinkExternal } from "react-icons/bi";

// @Emmanuel, en este componente se requiere:
// saber cual es el evento principal
// mostrar imageConfigDefault, nombre y descripcion
//Redireccionar a ver mas sobre el evento

const MainEvent = () => {
  const bg = useColorModeValue("gray.", "gray.800");
  return (
    <SimpleGrid
      columns={{
        base: 1,
        md: 2,
      }}
      spacing={0}
    >
      <Flex bg="brand.400">
        <Image
          src="/assets/evento_principal_prov.jpg"
          alt="Imagen del evento"
          fit="cover"
          w="full"
          h={{
            base: "64vh",
            lg: "74vh",
          }}
          bg="gray.100"
          loading="lazy"
          opacity={0.8}
          _dark={{
            opacity: 0.4,
          }}
        />
      </Flex>
      <Flex
        direction="column"
        alignItems="start"
        justifyContent="center"
        px={{
          base: 4,
          md: 8,
          lg: 20,
        }}
        py={10}
      >
        <Heading
          mb={4}
          fontSize={{
            base: "4xl",
            md: "4xl",
            lg: "5xl",
          }}
          fontWeight="bold"
          color="brand.600"
          _dark={{
            color: "gray.300",
          }}
          lineHeight="shorter"
          textShadow="2px 0 currentcolor"
        >
          Ultra Music Festival
        </Heading>
        <Text
          pr={{
            base: 0,
            lg: 16,
          }}
          mb={4}
          fontSize="lg"
          color="brand.600"
          _dark={{
            color: "gray.400",
          }}
          letterSpacing="wider"
        >
          Un fin de semana alocado con conciertos al aire libre en Downtown de
          Miami con los DJ y artistas electrónicos más reconocidos del mundo.
        </Text>
        <Box display="inline-flex" rounded="md" shadow="md">
          <Link
            mt={2}
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            px={5}
            py={3}
            border="solid transparent"
            fontWeight="bold"
            w="full"
            rounded="md"
            _light={{
              color: "#1a202ceb",
            }}
            _dark={{
              bg: "brand.500",
            }}
            _hover={{
              bg: "#dae5f1f7",
              _dark: {
                bg: "#2c313d",
              },
            }}
          >
            Ver mas
            <Icon as={BiLinkExternal} ml={2} />
          </Link>
        </Box>
      </Flex>
    </SimpleGrid>
  );
};

export default MainEvent;
