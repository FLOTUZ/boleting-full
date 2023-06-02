import EventsDatatable from "../components/events-datatable";
import { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { Event, useShowEventsQuery } from "@/gql/generated";

import { useToggle } from "@/hooks/useToggle";
import {
  Box,
  Button,
  HStack,
  SimpleGrid,
  Skeleton,
  Image,
} from "@chakra-ui/react";

import { FaList } from "react-icons/fa";
import { HiSquares2X2 } from "react-icons/hi2";
import { TbReload } from "react-icons/tb";

const ShowEventsView = () => {
  const [toogle, setToggle] = useToggle(true);
  const [columns, setcolumns] = useState<TableColumn<Event>[]>([]);
  const [data, setdata] = useState<any>([]);

  const {
    data: eventsList,
    loading: eventsLoader,
    refetch: refetchEvents,
  } = useShowEventsQuery({
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
        name: "Fecha",
        selector: (row) => new Date(row.date).toLocaleDateString(),
      },
      {
        name: "Descripción",
        selector: (row) => row.description!,
      },
    ];

    setcolumns(columns);
    setdata(eventsList?.events!);
  }, [eventsList]);

  return (
    <Box p={4}>
      <HStack spacing={4}>
        <Button onClick={() => refetchEvents()}>
          <TbReload />
        </Button>
        <Button onClick={() => setToggle()}>
          {toogle ? <FaList /> : <HiSquares2X2 />}
        </Button>
      </HStack>
      <Box mt={8}>
        {toogle ? (
          <Skeleton isLoaded={!eventsLoader}>
            <EventsDatatable
              columns={columns}
              data={data}
              loader={eventsLoader}
            />
          </Skeleton>
        ) : (
          <Skeleton isLoaded={!eventsLoader}>
            <SimpleGrid columns={5} spacing={4}>
              {data.map((event: Event) => (
                <Box
                  key={event.id}
                  p={4}
                  boxShadow="sm"
                  rounded="md"
                  transition="all .2s ease-in-out"
                  transform="scale(1)"
                  _hover={{
                    pointer: "cursor",
                    boxShadow: "0 0 0 1px #3182ce",
                    transition: "all .2s ease-in-out",
                    transform: "scale(1.05)",
                  }}
                >
                  {event.event_logo_url && (
                    <Image
                      src={event.event_logo_url}
                      alt={event.description!}
                      rounded="md"
                      mb={4}
                    />
                  )}
                  <Box fontWeight="bold">{event.name}</Box>
                  <Box h="100px" overflow="hidden" textOverflow="ellipsis">
                    {event.description} aaaaaaaaaaaaaaa aaaaaaaaaaaaaaa
                    aaaaaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaaaa
                    aaaaaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaaaa
                    aaaaaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaaaa
                  </Box>
                  <Box>{new Date(event.date).toLocaleDateString()}</Box>
                </Box>
              ))}
            </SimpleGrid>
          </Skeleton>
        )}
      </Box>
    </Box>
  );
};

export default ShowEventsView;
