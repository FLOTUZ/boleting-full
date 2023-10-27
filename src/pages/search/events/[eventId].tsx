import Image from "next/image";

import LandingLayout from "@/layouts/landing-layout.component";

import {
  Avatar,
  Box,
  Button,
  Center,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Event, useSearchEventLazyQuery } from "@/gql/generated";
import { useEffect, useState } from "react";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import IntroAnimationComponent from "@/components/animations/intro-animation.component";

const ShowEventRoute = () => {
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
    <LandingLayout>
      <IntroAnimationComponent data={event != null}>
        <Box>
          <Text>{new Date(event?.start_date).toDateString()}</Text>
          <Heading>{event?.name}</Heading>
          <Box
            p={2}
            mt={4}
            w={"fit-content"}
            bgColor={"gray.100"}
            _dark={{ bgColor: "gray.700" }}
            borderRadius={"lg"}
          >
            <SimpleGrid columns={[1, 3]} gap={1}>
              {/* TODO: Add organization avatar */}
              <Avatar name={event?.organization.name ?? "O"} src={""} />
              <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
                <Text _dark={{ color: "white" }} as={"b"} mr={2}>
                  Por:
                </Text>
                <Text _dark={{ color: "white" }}>
                  {event?.organization.name}
                </Text>
              </Box>
            </SimpleGrid>
          </Box>
        </Box>

        <Box
          mt={4}
          w={"50%"}
          minW={"fit-content"}
          maxW={"fit-content"}
          h={"fit-content"}
          p={2}
          border={"1px"}
          borderColor={"gray.200"}
          borderRadius={"lg"}
        >
          <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <Text
              as={"b"}
              mr={2}
              color={"gray.600"}
              _dark={{ color: "gray.400" }}
            >
              Desde
            </Text>
            {event?.price_from ? (
              <Heading size={"md"}>${event?.price_from}</Heading>
            ) : (
              <Text>Sin precio especificado</Text>
            )}
          </Box>

          <Button mt={4} w={"full"} colorScheme={"green"}>
            Buscar boletos
          </Button>
        </Box>

        <Heading size={"md"} mt={8}>
          Ubicación
        </Heading>
        <Box alignItems={"center"}>
          <Text as={"b"} color={"gray.600"} _dark={{ color: "gray.400" }}>
            {event?.event_location.split(",")[0]}
          </Text>
          <Text color={"gray.500"} _dark={{ color: "gray.400" }}>
            {event?.event_location}
          </Text>
        </Box>
        <Heading size={"md"} mt={4}>
          Acerca del evento
        </Heading>
        <Box>{event?.description}</Box>
      </IntroAnimationComponent>
    </LandingLayout>
  );
};

export default ShowEventRoute;
