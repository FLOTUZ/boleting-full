import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  LinkBox,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaCalendarAlt, FaMapPin } from "react-icons/fa";
import { MdPlace } from "react-icons/md";

const cards = [
  {
    // La url redirecciona al evento al presionar el boton de comprar boleto
    img: "/assets/foto_provisional_eventos.jpg",
    name: "Dia de muertos",
    day: "02/nov/2024",
    place: "Morelia",
    urlButton: "#",
  },
  {
    img: "/assets/foto_provisional_eventos.jpg",
    name: "Dia de muertos",
    day: "02/nov/2024",
    place: "Morelia",
    urlButton: "#",
  },
  {
    img: "/assets/foto_provisional_eventos.jpg",
    name: "Dia de muertos",
    day: "02/nov/2024",
    place: "Morelia",
    urlButton: "#",
  },
  {
    img: "/assets/foto_provisional_eventos.jpg",
    name: "Dia de muertos",
    day: "02/nov/2024",
    place: "Morelia",
    urlButton: "#",
  },
  {
    img: "/assets/foto_provisional_eventos.jpg",
    name: "Dia de muertos",
    day: "02/nov/2024",
    place: "Morelia",
    urlButton: "#",
  },
];

const Populares = () => {
  return (
    <>
      <Box margin={4}>
        <Grid
          margin={4}
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap={4}
        >
          {cards.map((item, index) => (
            <GridItem key={index}>
              <Card
                maxW="sm"
                mx="auto"
                bg="white"
                _dark={{
                  bg: "#2c313d",
                }}
                shadow="lg"
                rounded="lg"
                overflow="hidden"
              >
                <Image
                  w="full"
                  h={40}
                  fit="cover"
                  objectPosition="center"
                  src={item.img}
                  alt="Imagen del evento"
                />
                <Box py={4} px={4}>
                  <Heading
                    as="h4"
                    size="md"
                    color="gray.800"
                    _dark={{
                      color: "white",
                    }}
                  >
                    {item.name}
                  </Heading>
                  <Flex
                    alignItems="center"
                    mt={4}
                    color="gray.700"
                    _dark={{
                      color: "gray.200",
                    }}
                  >
                    <Icon as={FaCalendarAlt} h={6} w={6} mr={2} />
                    <Text fontSize="md">{item.day}</Text>
                  </Flex>

                  <Flex
                    alignItems="center"
                    mt={4}
                    color="gray.700"
                    _dark={{
                      color: "gray.200",
                    }}
                  >
                    <Icon as={FaMapPin} h={6} w={6} mr={2} />
                    <Text fontSize="md">{item.place}</Text>
                  </Flex>

                  <Button
                    as={Link}
                    href={item.urlButton}
                    variant="outline"
                    display="inline-flex"
                    w="200px"
                    mt={4}
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
                    Comprar boleto
                  </Button>
                </Box>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Populares;
