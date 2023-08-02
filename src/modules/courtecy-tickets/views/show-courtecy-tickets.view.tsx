import CourtecyTicketsDatatable from "../components/courtecy-tickets-datatable.component";

import Link from "next/link";
import { useRouter } from "next/router";

import { CreateCourtecyTicketPath } from "@/routes";
import { Box, Button, HStack } from "@chakra-ui/react";
import { Ticket, useShowCourtesyTicketsLazyQuery } from "@/gql/generated";
import { useEffect, useState } from "react";
import { TbReload } from "react-icons/tb";

const ShowCourtecyTicketsView = () => {
  const router = useRouter();
  const { id: eventId } = router.query;

  const [courtesiesList, setCourtesiesList] = useState<Ticket[]>([]);
  const [fetchCourtesies, { loading, error, refetch }] =
    useShowCourtesyTicketsLazyQuery({
      fetchPolicy: "network-only",
      variables: {
        eventId: Number(eventId),
      },
      onCompleted(data) {
        setCourtesiesList(data.courtecy_tickets as Ticket[]);
      },
    });

  useEffect(() => {
    if (eventId) {
      fetchCourtesies();
    }
  }, [eventId, fetchCourtesies]);

  if (error) {
    return <div>{error.graphQLErrors.map((error) => error.message)}</div>;
  }

  return (
    <Box m={4}>
      <HStack mb={4}>
        <Button onClick={() => refetch()}>
          <TbReload />
        </Button>

        <Link href={CreateCourtecyTicketPath(String(eventId))}>
          <Button>Nueva cortesía</Button>
        </Link>
      </HStack>

      <CourtecyTicketsDatatable data={courtesiesList} loader={loading} />
    </Box>
  );
};

export default ShowCourtecyTicketsView;
