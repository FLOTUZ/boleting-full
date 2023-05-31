import EventsDatatable from "../components/events-datatable";

import { Event, useShowEventsQuery } from "@/gql/generated";
import { Box, Button, HStack, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";

import { FaList } from "react-icons/fa";
import { HiSquares2X2 } from "react-icons/hi2";
import { TbReload } from "react-icons/tb";

const ShowEventsView = () => {
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
        <Button>
          <FaList />
        </Button>
        <Button>
          <HiSquares2X2 />
        </Button>
      </HStack>
      <Box mt={8}>
        <Skeleton isLoaded={!eventsLoader}>
          <EventsDatatable
            columns={columns}
            data={data}
            loader={eventsLoader}
          />
        </Skeleton>
      </Box>
    </Box>
  );
};

export default ShowEventsView;
