import { Event, useShowEventQuery } from "@/gql/generated";
import { Box, Button, SimpleGrid, Text, Image } from "@chakra-ui/react";
import { AiTwotoneEdit } from "react-icons/ai";
import { useEffect, useState } from "react";
import EditEventForm from "../components/edit-event-form";
import Link from "next/link";
import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";

const ShowEventView = ({ id }: { id: number }) => {
  const [editEnabled, setEditEnabled] = useState<boolean>(false);
  const [event, setEvent] = useState<Event>();
  const { data, loading: loadingEvent } = useShowEventQuery({
    variables: { eventId: id },
  });

  useEffect(() => {
    if (data) {
      setEvent(data.event as Event);
    }
  }, [data]);

  if (loadingEvent) {
    return <ProgressLoaderComponent />;
  }

  return (
    <IntroAnimationComponent data={data}>
      <Box m={4}>
        <Button onClick={() => setEditEnabled(!editEnabled)}>
          <AiTwotoneEdit /> Editar
        </Button>
        {editEnabled && <EditEventForm event={event!} />}

        {!editEnabled ? (
          <>
            <SimpleGrid mt={4} gap={1}>
              {event?.event_banner_url && (
                <Image
                  src={event?.event_banner_url}
                  alt={event?.description || ""}
                  rounded="lg"
                  w={"100%"}
                  h={"200"}
                  mb={4}
                  objectFit={"cover"}
                />
              )}

              <Text as={"b"} fontSize={"lg"}>
                Nombre del evento
              </Text>
              <Text as={"p"} fontSize={"lg"}>
                {event?.name}
              </Text>

              <Text as={"b"} fontSize={"lg"}>
                Descripción
              </Text>
              <Text as={"p"} fontSize={"lg"}>
                {event?.description}
              </Text>
              <Text as={"b"} fontSize={"lg"}>
                Lugar
              </Text>
              {event?.event_location_url != null && (
                <Text as={"p"} fontSize={"lg"}>
                  {event?.event_location}
                  <Link href={event?.event_location_url} target="_blank">
                    {"🗺"}
                    Ver en mapa
                  </Link>
                </Text>
              )}

              <Text as={"b"} fontSize={"lg"}>
                Creado por
              </Text>
              <Text as={"p"} fontSize={"lg"}>
                {event?.createdBy?.name}
              </Text>
            </SimpleGrid>
          </>
        ) : null}
      </Box>
    </IntroAnimationComponent>
  );
};

export default ShowEventView;
