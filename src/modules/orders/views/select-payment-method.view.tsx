import CashComponent from "../components/cash.component";
import ExpandedPanelComponent from "../components/expanded-panel";
import moment from "moment";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";
import {
  Box,
  Flex,
  GridItem,
  SimpleGrid,
  Text,
  Divider,
  Button,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";

import { AiOutlineCreditCard } from "react-icons/ai";
import { BsCashCoin } from "react-icons/bs";
import { CreateOrderPath } from "@/routes";
import {
  AccessType,
  Event,
  useSelectPaymentMethodLazyQuery,
} from "@/gql/generated";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";

const SelectPaymentMethod = () => {
  const router = useRouter();
  const bg = useColorModeValue("#edf2f7", "gray.700");

  const { eventId, accessTypeId } = router.query;

  const [ticketQuantity, setTicketQuantity] = useState<number>(1);
  const [accessType, setAccessType] = useState<AccessType>();
  const [event, setEvent] = useState<Event>();

  const [GET_ACCESS_TYPE, { loading, data }] = useSelectPaymentMethodLazyQuery({
    variables: {
      accessTypeId: Number(accessTypeId),
      eventId: Number(eventId),
    },
    onCompleted(data) {
      setAccessType(data.accessType as AccessType);
      setEvent(data.event as Event);
    },
  });

  useEffect(() => {
    if (accessTypeId) {
      GET_ACCESS_TYPE();
    }
  }, [accessTypeId, GET_ACCESS_TYPE]);

  if (loading) {
    return <ProgressLoaderComponent />;
  }

  return (
    <>
      <Box borderTop={"1px solid #808080"}>
        <SimpleGrid
          templateColumns={{
            base: "1fr",
            md: "repeat(3, 1fr)",
          }}
        >
          {/* Payment */}
          <GridItem colSpan={2}>
            <Flex h={"100%"} placeContent={"center"}>
              <Flex direction={"column"} w={"80%"} alignSelf={"center"}>
                <Heading
                  m={"16px 0"}
                  size="lg"
                  fontWeight={"semibold"}
                  alignSelf={"center"}
                >
                  Opciones de pago
                </Heading>

                <Link
                  href={CreateOrderPath(
                    String(eventId),
                    String(accessTypeId),
                    Number(ticketQuantity)
                  )}
                >
                  <Flex
                    py={4}
                    px={2}
                    borderColor={"gray.200"}
                    borderWidth={1}
                    borderRadius={5}
                    alignSelf={"center"}
                    _hover={{ shadow: "md" }}
                    _dark={{ _hover: { bg: "gray.700" } }}
                  >
                    <Box mx={4}>
                      <AiOutlineCreditCard size={20} />
                    </Box>

                    <Text>Tarjeta de credito o debito.</Text>
                  </Flex>
                </Link>

                <ExpandedPanelComponent
                  icon={BsCashCoin}
                  title={"Pago en efectivo"}
                >
                  <CashComponent isVisible={false} />
                </ExpandedPanelComponent>
              </Flex>
            </Flex>
          </GridItem>

          {/* Product Detail */}
          <GridItem display={{ base: "none", md: "block" }}>
            <Flex direction="column" bg={"gray.100"} _dark={{ bg: "gray.700" }}>
              <Box h={250} alignSelf={"center"}>
                <Image
                  src={
                    event?.event_banner_url ||
                    "/assets/foto_provisional_eventos.jpg"
                  }
                  alt="Imagen del evento"
                  height={0}
                  width={480}
                  objectPosition="center"
                  style={{
                    borderRadius: "5px",
                  }}
                />
              </Box>
              <Flex
                h="calc(100% -200px)"
                p="16px 24px"
                direction="column"
                justifyContent={"space-between"}
              >
                <Text pb="4" size="2xl" fontWeight={"bold"}>
                  Resumen de la orden
                </Text>
                <Flex justifyContent="space-between" pb={4}>
                  <Text size="lg">
                    {ticketQuantity} x {accessType?.name}
                  </Text>
                  <Text size="lg">{accessType?.price} c/u</Text>
                </Flex>
                <Flex justifyContent="space-between" pb={4}>
                  <Flex flexDirection={"row"}>
                    <Text color="gray">
                      {event &&
                        moment(new Date(event?.start_date))
                          .locale("es")
                          .format("LLL")}
                    </Text>
                    <Text ml={4} color="gray">
                      {event?.start_time}
                    </Text>
                  </Flex>
                  <Text color="gray" fontWeight="semibold">
                    {event?.event_location}
                  </Text>
                </Flex>

                <Divider mt={2} />
                <Flex justifyContent="space-between" mt={4}>
                  <Text>Cantidad: </Text>
                  <Text>
                    <Button
                      colorScheme="blackAlpha"
                      _dark={{ color: "white" }}
                      mr={4}
                      onClick={() =>
                        ticketQuantity > 1 &&
                        setTicketQuantity(ticketQuantity - 1)
                      }
                    >
                      <CgMathMinus />
                    </Button>

                    {ticketQuantity}

                    <Button
                      colorScheme="blackAlpha"
                      _dark={{ color: "white" }}
                      ml={4}
                      onClick={() =>
                        ticketQuantity < 10 &&
                        setTicketQuantity(ticketQuantity + 1)
                      }
                    >
                      <CgMathPlus />
                    </Button>
                  </Text>
                </Flex>
                <Flex mt={4} justifyContent={"space-between"}>
                  <Text fontWeight={"bold"}>Total: </Text>
                  <Text fontWeight={"bold"}>
                    ${accessType?.price * ticketQuantity} MXN
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </GridItem>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default SelectPaymentMethod;
