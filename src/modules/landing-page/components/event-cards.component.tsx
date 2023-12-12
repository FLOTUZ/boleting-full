import { Event } from "@/gql/generated";
import { SearchEventById } from "@/routes";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Icon,
  Spacer,
  Text,
} from "@chakra-ui/react";

import { FaCalendarAlt, FaMapPin } from "react-icons/fa";

import moment from "moment";

interface EventCardsProps {
  events: Event[];
}
const EventCards = ({ events }: EventCardsProps) => {
  return (
    <>
      <Box
        className="container"
        my={8}
        w="100%"
        overflow={"auto"}
        css={{
          "&::-webkit-scrollbar": {
            width: "0px",
            height: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            // color gray light
            backgroundColor: "#a0a0a0",
            borderRadius: "10px",
          },
          "&:hover::-webkit-scrollbar-thumb": {
            backgroundColor: "#d4d4d4",
          },
        }}
      >
        <Flex className="no-scrollbar" gap={4}>
          {events.map((item, index) => (
            <Box key={index}>
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
                  height={250}
                  width={250}
                  objectFit={"fill"}
                  objectPosition="center"
                  style={{
                    borderRadius: "5px",
                  }}
                  src={
                    item.event_logo_url ||
                    "/assets/foto_provisional_eventos.jpg"
                  }
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
                    <Text fontSize="md">
                      {moment(item.start_date).format("DD MMM YYYY")}
                    </Text>
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
                    <Text fontSize="md">{item.event_location}</Text>
                  </Flex>

                  <Spacer h={"100%"} />

                  <Link href={SearchEventById(String(item.id))}>
                    <Button
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
                  </Link>
                </Box>
              </Card>
            </Box>
          ))}
        </Flex>
      </Box>
    </>
  );
};

export default EventCards;
