import Image from "next/image";
import {
  Box,
  Flex,
  Heading,
  Icon,
  Link,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { BiLinkExternal } from "react-icons/bi";
import { Event } from "@/gql/generated";

// @Emmanuel, en este componente se requiere:
// saber cual es el evento principal
// mostrar imagen, nombre y descripcion
//Redireccionar a ver mas sobre el evento

interface MainEventProps {
  event: Event | null;
}

const MainEvent = ({ event }: MainEventProps) => {
  return (
    <>
      {event && (
        <SimpleGrid
          columns={{
            md: 2,
          }}
          spacing={0}
        >
          <Flex bg="brand.400">
            <Image
              src={
                event.event_banner_url || "/assets/evento_principal_prov.jpg"
              }
              alt="Imagen del evento"
              height={2440}
              width={2440}
              loading="lazy"
              style={{
                opacity: 0.4,
                borderRadius: "5px",
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
              {event.name}
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
              {event.description ?? "No hay descripción para este evento"}
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
      )}
    </>
  );
};

export default MainEvent;
