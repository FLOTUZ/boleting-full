import {
  Avatar,
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Event, useSearchEventLazyQuery } from "@/gql/generated";
import { useEffect, useState } from "react";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import { ShowAccessTypesByEvent } from "@/routes";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa";

//The user find their events after to shearch
const SearchEventView = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const router = useRouter();
  const { eventId } = router.query;

  const [event, setEvent] = useState<Event | null>();

  const [GET_EVENT, { loading, error }] = useSearchEventLazyQuery({
    onCompleted(data) {
      setEvent(data.event as Event);
    },
  });

  useEffect(() => {
    if (eventId) {
      GET_EVENT({
        variables: {
          eventId: Number(eventId),
        },
      });
    }
  }, [GET_EVENT, eventId]);

  if (loading) {
    return <ProgressLoaderComponent />;
  }

  if (error) {
    return <div>Error: {error.graphQLErrors.map((e) => e.message)}</div>;
  }

  return (
    <IntroAnimationComponent data={event != null}>
      <Box>
        <Image
          w={"100vw"}
          h={{ base: "50vh", lg: "60vh", xl: "40vh" }}
          objectFit={"cover"}
          borderBottomRadius={"1rem"}
          src={event?.event_banner_url ?? ""}
          zIndex={0}
        />
      </Box>

      <Grid gridTemplateColumns={isMobile ? "1fr" : "1fr 1fr"}>
        {/*General Information */}
        <GridItem>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={isMobile ? "center" : "start"}
            fontSize={{ base: "sm", lg: "md", xl: "xl" }}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              m={8}
              w={"fit-content"}
            >
              {/*Name and date*/}
              <Box>
                <Text color={"gray.500"} fontWeight={"semibold"}>
                  {new Date(event?.start_date).toDateString()}
                </Text>
                <Heading>{event?.name}</Heading>
              </Box>

              {/*Organization name*/}
              <Box
                mt={4}
                p={2}
                w={"fit-content"}
                border={"1px"}
                borderColor={"gray.200"}
                borderRadius={"lg"}
              >
                <Box display={"flex"} alignItems={"center"}>
                  <Avatar
                    mr={8}
                    name={event?.organization.name ?? "O"}
                    src={""}
                  />
                  <Text _dark={{ color: "white" }} mr={2} fontWeight={"light"}>
                    Por:
                  </Text>
                  <Text _dark={{ color: "white" }} fontWeight={"medium"}>
                    {event?.organization.name}
                  </Text>
                </Box>
              </Box>

              {/*Date and hour*/}
              <Box mt={8}>
                <Heading size={"md"} mb={2}>
                  Fecha y hora
                </Heading>
                <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"}>
                  <FaCalendarCheck fontSize={isMobile ? 20 : 24} />
                  <Text ml={2}>Comienza el</Text>
                  <Text ml={2}>
                    {new Date(event?.start_date).toLocaleDateString() + ","}
                  </Text>
                  <Text ml={2}> {event?.start_time}</Text>
                </Box>
              </Box>

              {/* Place */}
              <Box mt={8}>
                <Heading size={"md"} mb={2}>
                  Ubicación
                </Heading>
                <Box display={"flex"} flexDirection={"row"}>
                  <FaLocationDot fontSize={isMobile ? 20 : 24} />
                  <Text
                    ml={2}
                    as={"b"}
                    color={"gray.600"}
                    _dark={{ color: "gray.400" }}
                  >
                    {event?.event_location.split(",")[0]}
                  </Text>
                  <Text ml={2} color={"gray.500"} _dark={{ color: "gray.400" }}>
                    {event?.event_location}
                  </Text>
                </Box>
              </Box>

              {/* About the event */}
              <Box mb={isMobile ? 130 : 0} mt={8}>
                <Heading size={"md"}>Acerca del evento</Heading>
                <Text>{event?.description}</Text>
              </Box>
            </Box>
          </Box>
        </GridItem>

        <GridItem>
          {/* Tickets */}
          <Box
            display={"flex"}
            flexDirection={"column"}
            mt={4}
            w={isMobile ? "100%" : "40%"}
            p={2}
            bgColor={"gray.100"}
            _dark={{ bgColor: "gray.700" }}
            position={isMobile ? "fixed" : "absolute"}
            bottom={isMobile ? 0 : ""}
            zIndex={isMobile ? 10 : 0}
            marginTop={isMobile ? "" : "60px"}
            marginLeft={isMobile ? "" : "20px"}
            borderRadius={isMobile ? "" : "1em"}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Text
                fontSize={"lg"}
                mr={2}
                color={"gray.600"}
                _dark={{ color: "gray.400" }}
              >
                Desde
              </Text>
              {event?.price_from ? (
                <Text fontSize={"lg"}>${event?.price_from}</Text>
              ) : (
                <Text>Sin precio especificado</Text>
              )}
            </Box>
            <Link href={ShowAccessTypesByEvent(String(event?.id))}>
              <Button mt={4} w={"full"} colorScheme={"green"}>
                Buscar boletos
              </Button>
            </Link>
          </Box>
        </GridItem>
      </Grid>
    </IntroAnimationComponent>
  );
};

export default SearchEventView;
