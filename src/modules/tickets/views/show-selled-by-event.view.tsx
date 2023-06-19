import { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { Event, Ticket, useShowSelledByEventQuery } from "@/gql/generated";
import SelledTicketsByEventDatatable from "../components/selled-tickets-by-event.datatable";
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
    if (selledByEventLoader) return;

    if (data) {
      setEvent(data.event as Event);
      setSelledTickets(data.selled_tickets_by_event as Ticket[]);
    }
  }, [selledByEventLoader, data]);

  if (selledByEventLoader) return <p>Loading...</p>;

  return (
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
        <p>{event?.description}</p>
        <Text as={"b"}>Entradas vendidas:</Text>
      </Card>

      <SelledTicketsByEventDatatable
        columns={columns}
        progressPending={selledByEventLoader}
        data={selledTickets}
        refetch={refetchSelledByEvent}
      />
    </Box>
  );
};

export default ShowSelledByEventView;
