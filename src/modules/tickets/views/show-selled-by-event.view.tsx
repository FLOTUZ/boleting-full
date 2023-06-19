import { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";

import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";

import SelledTicketsByEventDatatable from "../components/selled-tickets-by-event.datatable";

import { Event, Ticket, useShowSelledByEventQuery } from "@/gql/generated";
import { Box, Card, Heading, Image, Text } from "@chakra-ui/react";

const ShowSelledByEventView = ({ eventId }: { eventId: number }) => {
  const [event, setEvent] = useState<Event | null>(null);
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
          <Text as={"b"}>Descripcion</Text>
          <Text>{event?.description}</Text>
          <Text as={"b"}>Entradas vendidas:</Text>
        </Card>

        <SelledTicketsByEventDatatable
          columns={columns}
          progressPending={selledByEventLoader}
          data={selledTickets}
          refetch={refetchSelledByEvent}
        />
      </Box>
    </IntroAnimationComponent>
  );
};

export default ShowSelledByEventView;
