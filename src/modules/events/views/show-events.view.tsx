import Link from "next/link";
import TicketEventCard from "../components/event-card";
import TicketEventsDatatable from "../components/ticket-events.datatable";

import { Event, useShowEventTicketsQuery } from "@/gql/generated";
import { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";

import { Box, Button, HStack, SimpleGrid, Spacer } from "@chakra-ui/react";
import { TbReload } from "react-icons/tb";
import { HiSquares2X2 } from "react-icons/hi2";
import { FaList } from "react-icons/fa";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import { CreateEventPath } from "@/routes";

const ShowEventsView = () => {
  const [toggle, setToggle] = useState(true);
  const [columns, setcolumns] = useState<TableColumn<Event>[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  const {
    data: eventsList,
    loading: eventsLoader,
    refetch: refetchEvents,
  } = useShowEventTicketsQuery({
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    const columns: TableColumn<Event>[] = [
      {
        name: "Nombre",
        selector: (row) => row.name!,
      },
      {
        name: "Inicia",
        selector: (row) => new Date(row.start_date).toLocaleDateString(),
      },
      {
        name: "Descripción",
        selector: (row) => row.description!,
      },
    ];

    setcolumns(columns);
    setEvents(eventsList?.events! as Event[]);
  }, [eventsList]);

  if (eventsLoader) {
    return <ProgressLoaderComponent />;
  }

  return (
    <IntroAnimationComponent data>
      <Box p={4}>
        <HStack spacing={4}>
          <Link passHref href={CreateEventPath}>
            <Button colorScheme="green">Crear evento</Button>
          </Link>
          <Button onClick={() => refetchEvents()}>
            <TbReload />
          </Button>
          <Spacer />
          <Button onClick={() => setToggle(!toggle)}>
            {toggle ? <FaList /> : <HiSquares2X2 />}
          </Button>
        </HStack>
        {toggle ? (
          <SimpleGrid columns={[1, 2, 5]} pt={4}>
            {events?.map((event: Event) => (
              <TicketEventCard event={event} key={event.id} />
            ))}
          </SimpleGrid>
        ) : (
          <Box pt={4}>
            <TicketEventsDatatable
              loader={eventsLoader}
              columns={columns}
              data={events}
            />
          </Box>
        )}
      </Box>
    </IntroAnimationComponent>
  );
};

export default ShowEventsView;
