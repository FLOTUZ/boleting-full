import Link from "next/link";

import { useEffect, useState } from "react";

import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";

import SelledTicketsByEventDatatable from "../components/selled-tickets-by-event.datatable";

import {
  Event,
  Ticket,
  usePublishEventMutation,
  useShowEventLazyQuery,
} from "@/gql/generated";
import {
  Badge,
  Box,
  Button,
  Card,
  Heading,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  AccessTypesPath,
  EditEventPath,
  ShowEventStaffIdPath,
  ShowCourtecyTicketsPath,
} from "@/routes";
import { IoTicketSharp } from "react-icons/io5";
import { PiUsersFourFill } from "react-icons/pi";
import { FaGift } from "react-icons/fa";
import { VscBroadcast } from "react-icons/vsc";
import { useRouter } from "next/router";

const ShowEventView = () => {
  const router = useRouter();
  const toast = useToast();
  const { id: eventId } = router.query;

  const [dataEvent, setDataEvent] = useState<Event>();
  const [selledTickets, setSelledTickets] = useState<Ticket[]>([]);

  const [PUBLISH_EVENT] = usePublishEventMutation({
    variables: { eventId: Number(eventId) },
    onCompleted() {
      refetch();
      toast({
        title: dataEvent?.is_published
          ? "Evento publicado"
          : "Evento despublicado",
        description: dataEvent?.is_published
          ? "El evento fue publicado"
          : "El evento fue despublicado",
        status: dataEvent?.is_published ? "success" : "info",
        duration: 8000,
        isClosable: true,
      });
    },
    onError(error) {
      toast({
        title: "Error al publicar evento",
        description: error.message,
        status: "error",
        duration: 8000,
        isClosable: true,
      });
    },
  });

  const [GET_EVENT, { loading: selledByEventLoader, refetch }] =
    useShowEventLazyQuery({
      fetchPolicy: "no-cache",
      variables: { eventId: Number(eventId) },
      onCompleted(data) {
        setDataEvent(data.event as Event);
        setSelledTickets(data.selled_tickets_by_event as Ticket[]);
      },
      onError(error) {
        console.log(error);
      },
    });

  useEffect(() => {
    if (eventId) {
      GET_EVENT();
    }
  }, [GET_EVENT, eventId]);

  if (selledByEventLoader) {
    return <ProgressLoaderComponent />;
  }

  return (
    <IntroAnimationComponent data>
      <Box p={4}>
        <Link passHref href={EditEventPath(dataEvent?.id as number)}>
          <Button mb={4}> Editar evento </Button>
        </Link>
        <Link passHref href={ShowEventStaffIdPath(dataEvent?.id as number)}>
          <Button mb={4} ml={4}>
            Staff
            <Box pl={2}>
              <PiUsersFourFill />
            </Box>
          </Button>
        </Link>

        <Link href={AccessTypesPath(dataEvent?.id as number)}>
          <Button mb={4} ml={4}>
            Tipos de acceso
            <Box pl={2}>
              <IoTicketSharp />
            </Box>
          </Button>
        </Link>

        <Link passHref href={ShowCourtecyTicketsPath(String(dataEvent?.id))}>
          <Button mb={4} ml={4}>
            Cortesías
            <Box pl={2}>
              <FaGift />
            </Box>
          </Button>
        </Link>

        <Button
          mb={4}
          ml={4}
          colorScheme={dataEvent?.is_published ? "red" : "green"}
          onClick={() => PUBLISH_EVENT()}
        >
          {dataEvent?.is_published ? "Despublicar" : "Publicar"}
          <Box pl={2}>
            <VscBroadcast />
          </Box>
        </Button>

        <Card mb={4} p={4}>
          <Box>
            {dataEvent?.event_logo?.url && (
              <Image
                src={dataEvent?.event_logo?.url}
                alt={dataEvent?.name!}
                height={100}
              />
            )}
          </Box>

          <Heading>{dataEvent?.name}</Heading>
          {dataEvent?.event_location_url != null && (
            <Text as={"p"} fontSize={"lg"}>
              {dataEvent?.event_location}

              <Link
                passHref
                href={dataEvent?.event_location_url}
                target="_blank"
              >
                <Badge ml={2} p={1}>
                  Ver en mapa
                </Badge>
              </Link>
            </Text>
          )}

          <Text as={"b"}>Descripcion</Text>
          <Text>{dataEvent?.description}</Text>

          <Text as={"b"}>Fecha</Text>
          <Text as={"p"} fontSize={"lg"}>
            {new Date(dataEvent?.start_date).toLocaleDateString("es-MX", {
              day: "numeric",
              month: "long",
            }) || "Sin fecha inicial"}{" "}
            -{dataEvent?.end_date || "Sin fecha final"}
          </Text>

          <Text as={"b"}>Creado por</Text>
          <Text as={"p"} fontSize={"lg"}>
            {dataEvent?.createdBy?.name}
          </Text>
        </Card>

        <SelledTicketsByEventDatatable
          progressPending={selledByEventLoader}
          data={selledTickets}
          refetch={refetch}
        />
      </Box>
    </IntroAnimationComponent>
  );
};

export default ShowEventView;
