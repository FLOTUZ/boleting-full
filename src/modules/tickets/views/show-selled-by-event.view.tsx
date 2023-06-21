import { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";

import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";

import SelledTicketsByEventDatatable from "../components/selled-tickets-by-event.datatable";

import { Event, Ticket, useShowSelledByEventQuery } from "@/gql/generated";
import { Box, Button, Card, Heading, Image, Text } from "@chakra-ui/react";
import { useToggle } from "@/hooks";
import EditEventForm from "../components/edit-event-form";
import Link from "next/link";

const ShowSelledByEventView = ({ eventId }: { eventId: number }) => {
  const [toggle, setToggle] = useToggle(false);

  const [event, setEvent] = useState<Event>();
  const [selledTickets, setSelledTickets] = useState<Ticket[]>([]);

  const {
    data,
    loading: selledByEventLoader,
    refetch: refetchSelledByEvent,
  } = useShowSelledByEventQuery({
    variables: {
      eventId,
    },
    fetchPolicy: "network-only",
  });

  const columns: TableColumn<Ticket>[] = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Serial",
      selector: (row) => row.serial_number,
      sortable: true,
    },
    {
      name: "Precio",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Fecha de venta",
      selector: (row) => row.createdAt,
      sortable: true,
    },
    {
      name: "Usado",
      selector: (row) => (row.is_used ? "Si" : "No"),
    },
  ];

  useEffect(() => {
    if (data) {
      setEvent(data.event as Event);
      setSelledTickets(data.selled_tickets_by_event as Ticket[]);
    }
  }, [selledByEventLoader, data]);

  if (selledByEventLoader) {
    return <ProgressLoaderComponent />;
  }

  return (
    <IntroAnimationComponent data>
      <Box p={4}>
        <Button mb={4} onClick={() => setToggle()}>
          Editar
        </Button>
        {toggle == false ? (
          <EditEventForm event={event!} />
        ) : (
          <>
            <Card mb={4} p={4}>
              <Box>
                {event?.event_logo_url && (
                  <Image
                    src={event?.event_logo_url}
                    alt={event?.name!}
                    height={100}
                  />
                )}
              </Box>

              <Heading>{event?.name}</Heading>
              <Text as={"b"}>{event?.event_location}</Text>

              <Text as={"b"}>Descripcion</Text>
              <Text>{event?.description}</Text>

              <Text as={"b"}>Fecha</Text>
              <Text as={"p"} fontSize={"lg"}>
                {new Date(event?.start_date).toLocaleDateString("es-MX", {
                  day: "numeric",
                  month: "long",
                }) || "Sin fecha inicial"}{" "}
                -{event?.end_date || "Sin fecha final"}
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

              <Text as={"b"}>Creado por</Text>
              <Text as={"p"} fontSize={"lg"}>
                {event?.createdBy?.name}
              </Text>
            </Card>

            <SelledTicketsByEventDatatable
              columns={columns}
              progressPending={selledByEventLoader}
              data={selledTickets}
              refetch={refetchSelledByEvent}
            />
          </>
        )}
      </Box>
    </IntroAnimationComponent>
  );
};

export default ShowSelledByEventView;
