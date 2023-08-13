import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import CourtecyTicketsDatatable from "../components/courtecy-tickets-datatable.component";

import { CreateCourtecyTicketPath } from "@/routes";
import { Ticket, useShowCourtesyTicketsLazyQuery } from "@/gql/generated";

import { TbReload } from "react-icons/tb";
import { Box, Button, HStack } from "@chakra-ui/react";

const ShowCourtecyTicketsView = () => {
  const router = useRouter();
  const { id: eventId } = router.query;

  const [courtesiesList, setCourtesiesList] = useState<Ticket[]>([]);
  const [fetchCourtesies, { data, loading, error, refetch }] =
    useShowCourtesyTicketsLazyQuery({
      fetchPolicy: "cache-and-network",
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
    <IntroAnimationComponent data={data}>
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
    </IntroAnimationComponent>
  );
};

export default ShowCourtecyTicketsView;
