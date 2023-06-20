import EventsDatatable from "../components/events-datatable";
import { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { Event, useShowEventsQuery } from "@/gql/generated";

import { useToggle } from "@/hooks/useToggle";
import { Box, Button, HStack, SimpleGrid, Text, Image } from "@chakra-ui/react";

import { FaList } from "react-icons/fa";
import { HiSquares2X2 } from "react-icons/hi2";
import { TbReload } from "react-icons/tb";
import { ShowEventPath } from "@/routes";
import { useRouter } from "next/router";
import Link from "next/link";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import IntroAnimationComponent from "@/components/animations/intro-animation.component";

const ShowEventsView = () => {
  const router = useRouter();
  const [toogle, setToggle] = useToggle(true);
  const [columns, setcolumns] = useState<TableColumn<Event>[]>([]);
  const [eventList, setEventList] = useState<Event[]>([]);

  const {
    data,
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
        sortable: true,
      },
      {
        name: "Inicia",
        selector: (row) => new Date(row.start_date).toLocaleDateString(),
        sortable: true,
      },
      {
        name: "Descripción",
        selector: (row) => row.description!,
        sortable: true,
      },
    ];

    setcolumns(columns);
    setEventList(data?.events as Event[]);
  }, [data, eventList]);

  if (eventsLoader) {
    return <ProgressLoaderComponent />;
  }

  return (
    <IntroAnimationComponent data={eventList}>
      <Box p={4}>
        <HStack spacing={4}>
          <Button onClick={() => refetchEvents()}>
            <TbReload />
          </Button>
          <Button onClick={() => setToggle()}>
            {toogle ? <HiSquares2X2 /> : <FaList />}
          </Button>
        </HStack>
        <Box mt={8}>
          {toogle ? (
            <EventsDatatable
              columns={columns}
              data={eventList}
              loader={eventsLoader}
            />
          ) : (
            <SimpleGrid columns={5} spacing={4}>
              {eventList != null &&
                eventList.map((event: Event) => (
                  <Link key={event.id} href={ShowEventPath(String(event.id))}>
                    <Box
                      p={4}
                      boxShadow="sm"
                      rounded="md"
                      transition="all .2s ease-in-out"
                      transform="scale(1)"
                      height={250}
                      _hover={{
                        pointer: "cursor",
                        boxShadow: "0 0 0 1px #e2e8f0",
                        transition: "all .2s ease-in-out",
                        transform: "scale(1.05)",
                      }}
                    >
                      <HStack>
                        {event.event_logo_url && (
                          <Image
                            height={50}
                            src={event.event_logo_url}
                            alt={event.description!}
                            rounded="md"
                            mb={4}
                          />
                        )}
                        <Text as={"b"} color={"GrayText"} fontSize={"sm"}>
                          {new Date(event.start_date).toLocaleDateString(
                            "es-MX",
                            {
                              day: "numeric",
                              month: "long",
                            }
                          )}
                        </Text>
                      </HStack>
                      <Box fontWeight="bold">{event.name}</Box>
                      <Box h="100px" overflow="hidden" textOverflow="ellipsis">
                        <Text noOfLines={3}>{event.description}</Text>
                      </Box>
                    </Box>
                  </Link>
                ))}
            </SimpleGrid>
          )}
        </Box>
      </Box>
    </IntroAnimationComponent>
  );
};

export default ShowEventsView;
