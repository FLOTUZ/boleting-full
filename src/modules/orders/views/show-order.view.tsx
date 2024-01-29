import MyCards from "../components/my-cards.component";
import CashComponent from "../components/cash.component";
import ExpandedPanelComponent from "../components/expanded-panel";

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

const ShowOrderView = () => {
  const router = useRouter();
  const bg = useColorModeValue("#edf2f7", "gray.700");

  const { eventId, accessTypeId } = router.query;

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
              <Flex direction={"column"} w={"100%"} alignSelf={"center"}>
                <Heading
                  m={"16px 0"}
                  size="lg"
                  fontWeight={"semibold"}
                  alignSelf={"center"}
                >
                  Opciones de pago
                </Heading>

                <ExpandedPanelComponent
                  icon={AiOutlineCreditCard}
                  title={"Tarjeta de credito o debito"}
                  isDefaultExpanded={false}
                >
                  <MyCards isVisible={false} />
                </ExpandedPanelComponent>

                <ExpandedPanelComponent
                  icon={BsCashCoin}
                  title={"Pago en efectivo"}
                >
                  <CashComponent isVisible={false} />
                </ExpandedPanelComponent>

                <Link
                  href={CreateOrderPath(
                    String(eventId),
                    String(accessTypeId),
                    Number(1)
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
              </Flex>
            </Flex>
          </GridItem>

          {/* Product Detail */}
          <GridItem display={{ base: "none", md: "block" }}>
            <Flex direction="column" bg={bg}>
              <Box h={250} overflow="hidden" alignSelf={"center"}>
                <Image
                  src={"/assets/foto_provisional_eventos.jpg"}
                  alt="Imagen del evento"
                  height={250}
                  width={250}
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
                  <Text size="lg">1 x Dia de muertos 2024</Text>
                  <Text size="lg">$80</Text>
                </Flex>
                <Flex justifyContent="space-between" pb={4}>
                  <Text color="gray">02/nov/2024 8:00pm</Text>
                  <Text color="gray" fontWeight="semibold">
                    Morelia | Presencial
                  </Text>
                </Flex>

                <Divider mt={2} />
                <Flex justifyContent="space-between" mt={4}>
                  <Text>Cantidad: </Text>
                  <Text>
                    <Button colorScheme="facebook" as={CgMathPlus} mr={4} />
                    2
                    <Button colorScheme="facebook" as={CgMathMinus} ml={4} />
                  </Text>
                </Flex>
                <Flex mt={4} justifyContent={"space-between"}>
                  <Text fontWeight={"bold"}>Total: </Text>
                  <Text fontWeight={"bold"}>$160 mxn</Text>
                </Flex>
              </Flex>
            </Flex>
          </GridItem>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default ShowOrderView;
