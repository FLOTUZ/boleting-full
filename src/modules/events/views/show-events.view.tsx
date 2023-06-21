import TicketEventCard from "../components/event-card";
import TicketEventsDatatable from "../components/ticket-events.datatable";

import { useRouter } from "next/router";
import { Event, useShowEventTicketsQuery } from "@/gql/generated";
import { useEffect, useState } from "react";
import { useToggle } from "@/hooks";
import { TableColumn } from "react-data-table-component";

import { Box, Button, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import { TbReload } from "react-icons/tb";
import { HiSquares2X2 } from "react-icons/hi2";
import { FaList } from "react-icons/fa";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import { CreateEventPath } from "@/routes";

const ShowEventsView = () => {
  const router = useRouter();
  const [toggle, setToggle] = useToggle(true);
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
          <Button onClick={() => refetchEvents()}>
            <TbReload />
          </Button>
          <Button onClick={() => setToggle()}>
            {toggle ? <HiSquares2X2 /> : <FaList />}
          </Button>
          <Button
            colorScheme="green"
            onClick={() => router.push(CreateEventPath)}
          >
            Crear evento
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
