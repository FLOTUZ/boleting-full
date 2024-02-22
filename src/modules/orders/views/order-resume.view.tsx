import Link from "next/link";

import LandingLayout from "@/layouts/landing-layout.component";
import IntroAnimationComponent from "@/components/animations/intro-animation.component";

import { ShowOrderPath } from "@/routes";
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Heading,
  Img,
  SimpleGrid,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCreateOpenVenuePaymentLinkLazyQuery } from "@/gql/generated";

const OrderResumeView = () => {
  const [isMobile] = useMediaQuery("(max-width: 767px)");
  const router = useRouter();
  const { eventId, accessTypeId, buyedTicketsCount } = router.query;

  const [CHECK_OPEN_VENUE, { data, loading, error }] =
    useCreateOpenVenuePaymentLinkLazyQuery({
      variables: {
        data: {
          eventId: Number(eventId),
          access_typeId: Number(accessTypeId),
          buyed_access_count: Number(buyedTicketsCount),
        },
      },
      onCompleted: (data) => {
        router.push(data.createOpenVenueOrder);
      },
    });

  return (
    <>
      <IntroAnimationComponent data={true}>
        <Heading p={2} display={"flex"} justifyContent={"center"}>
          Create order
        </Heading>
        <Box
          h={"auto-fit"}
          w={isMobile ? "100vw" : "40vw"}
          bg={"gray.100"}
          _dark={{ bg: "gray.700" }}
          borderRadius={5}
        >
          <Box
            w="100%"
            h={isMobile ? "200px" : "300px"}
            borderRadius={5}
            overflow="hidden"
          >
            <Img
              src="/assets/evento_principal_prov.jpg"
              alt="Imagen del evento"
              objectPosition={"center"}
              objectFit="cover"
              w="100%"
              h={"100%"}
              pl={2}
              pt={2}
              pr={2}
              pb={2}
            />
          </Box>

          {/* About the event */}
          <Box
            fontSize={isMobile ? "md" : "2xl"}
            borderBottomWidth={"2px"}
            borderBottomStyle={"dashed"}
            borderBottomColor={"white"}
            borderRadius={"4px 4px 0px 0px"}
          >
            <Box p={2}>
              <Link href={ShowOrderPath("test")}>
                <Box>
                  <Text fontWeight={"semibold"}>Evento:</Text>
                  {/* <Text>{eventId}</Text> */}
                  <Text fontWeight={"light"}>Tomorrowland</Text>
                </Box>

                <SimpleGrid mt={2} columns={2}>
                  <Box>
                    <Text
                      fontWeight={"semibold"}
                      color="gray"
                      fontSize={isMobile ? 16 : 18}
                    >
                      Fecha:
                    </Text>
                    <Text fontWeight={"light"}>15/07/2021</Text>
                  </Box>
                  <Box>
                    <Text
                      fontWeight={"semibold"}
                      color="gray"
                      fontSize={isMobile ? 16 : 18}
                    >
                      Hora:
                    </Text>
                    <Text fontWeight={"light"}>23:00</Text>
                  </Box>
                </SimpleGrid>

                <SimpleGrid mt={2} columns={2}>
                  <Box>
                    <Text
                      fontWeight={"semibold"}
                      color="gray"
                      fontSize={isMobile ? 16 : 18}
                    >
                      Tipo de acceso:
                    </Text>
                    {/* <Text>{accessTypeId}</Text> */}
                    <Text fontWeight={"light"}>VIP</Text>
                  </Box>
                  <Box>
                    <Text
                      fontWeight={"semibold"}
                      color="gray"
                      fontSize={isMobile ? 16 : 18}
                    >
                      Boletos comprados:
                    </Text>
                    {/* <Text>{buyedTicketsCount}</Text> */}
                    <Text fontWeight={"light"}>2</Text>
                  </Box>
                </SimpleGrid>
              </Link>
            </Box>
          </Box>
        </Box>
        <Button
          w={"full"}
          fontSize={isMobile ? "md" : "2xl"}
          isLoading={loading}
          onClick={() => CHECK_OPEN_VENUE()}
          bg={"gray.100"}
          _dark={{ bg: "gray.700" }}
          display={"flex"}
          justifyContent={"center"}
        >
          Orden de prueba
        </Button>
      </IntroAnimationComponent>
    </>
  );
};

export default OrderResumeView;
