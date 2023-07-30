import CourtecyTicketsDatatable from "../components/courtecy-tickets-datatable.component";

import Link from "next/link";
import { useRouter } from "next/router";

import { CreateCourtecyTicketPath } from "@/routes";
import { Box, Button } from "@chakra-ui/react";

const ShowCourtecyTicketsView = () => {
  const router = useRouter();
  const { id: eventId } = router.query;
  return (
    <Box m={4}>
      <Link href={CreateCourtecyTicketPath(String(eventId))}>
        <Button mb={4}>Nueva cortesía</Button>
      </Link>

      <CourtecyTicketsDatatable data={[]} loader={true} />
    </Box>
  );
};

export default ShowCourtecyTicketsView;
