import Link from "next/link";
import { useEffect, useState } from "react";

import IntroAnimationComponent from "@/components/animations/intro-animation.component";

import {
  AccessType,
  Event,
  useShowEventAccessTypesByEventLazyQuery,
} from "@/gql/generated";

import { SearchTicketsByEvent } from "@/routes";
import { Box, Card, Heading, Spacer, Text } from "@chakra-ui/react";

import { BsArrowRightCircleFill } from "react-icons/bs";

interface AvailableEventTicketsProps {
  eventId: string;
}

const ShowEventAccessTypes = ({ eventId }: AvailableEventTicketsProps) => {
  const [accessTypesList, setAccessTypesList] = useState<AccessType[]>([]);
  const [event, setEvent] = useState<Event>();
  const [GET_ACCESS_TYPES, { loading, error }] =
    useShowEventAccessTypesByEventLazyQuery({
      onCompleted(data) {
        setAccessTypesList(data.accessTypesByEventId as AccessType[]);
        setEvent(data.event as Event);
      },
    });

  useEffect(() => {
    if (eventId) {
      GET_ACCESS_TYPES({
        variables: {
          eventId: Number(eventId),
        },
      });
    }
  }, [GET_ACCESS_TYPES, eventId]);

  if (error) {
    return <div>Error: {error.graphQLErrors.map((e) => e.message)}</div>;
  }

  return (
    <IntroAnimationComponent data={loading}>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Heading mr={4}>Boletos para: </Heading>

        <Text fontSize="3xl">{event?.name}</Text>
      </Box>
      <Box>
        <Box mt={8}>
          {accessTypesList.length == 0 ? (
            <p> Sin accesos disponibles </p>
          ) : (
            accessTypesList.map((accessType) => {
              return (
                <Link
                  key={accessType.id}
                  href={SearchTicketsByEvent(eventId, String(accessType.id))}
                >
                  <Card
                    key={accessType.id}
                    p={4}
                    _hover={{
                      cursor: "pointer",
                      bg: "gray.100",
                      color: "black",
                    }}
                    _dark={{
                      _hover: {
                        bg: "gray.700",
                        color: "white",
                      },
                    }}
                    display={"flex"}
                    flexDirection={"row"}
                    alignItems={"center"}
                  >
                    <Box>
                      <Heading>{accessType.name}</Heading>
                      <Text>{accessType.description ?? "Sin descripción"}</Text>
                    </Box>
                    <Spacer />
                    <BsArrowRightCircleFill size={30} />
                  </Card>
                </Link>
              );
            })
          )}
        </Box>
      </Box>
    </IntroAnimationComponent>
  );
};

export default ShowEventAccessTypes;
