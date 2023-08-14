import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import { EditCourtecyTicketPath } from "@/routes";
import { Ticket, useShowCourtesyTicketLazyQuery } from "@/gql/generated";

import SendCourtecyTicketToEmailModal from "../components/send-courtecy-ticket-to-email-modal";

import { Box, Button, HStack, Text } from "@chakra-ui/react";

const ShowCourtecyTicketView = () => {
  const router = useRouter();
  const { id: eventId, courtesyId } = router.query;

  const [ticket, setTicket] = useState<Ticket>();

  const [getTicket, { data, error, loading }] = useShowCourtesyTicketLazyQuery({
    onCompleted(data) {
      setTicket(data.ticket as Ticket);
    },
  });

  useEffect(() => {
    if (courtesyId) {
      getTicket({ variables: { ticketId: Number(courtesyId) } });
    }
  }, [courtesyId, getTicket]);

  if (loading) {
    return <ProgressLoaderComponent />;
  }

  if (error) {
    return <div>{error.graphQLErrors.map((error) => error.message)}</div>;
  }

  return (
    <IntroAnimationComponent data={data}>
      <Box m={4}>
        <HStack mb={4}>
          <Link
            href={EditCourtecyTicketPath(String(eventId), String(courtesyId))}
          >
            <Button>Editar cortesía</Button>
          </Link>
          <SendCourtecyTicketToEmailModal />
        </HStack>

        <Text as={"b"}>Nota</Text>
        <Box mb={4}>{ticket?.note}</Box>

        <Text as={"b"}>Usado</Text>
        <Box mb={4}>{ticket?.is_used ? "Si" : "No"}</Box>

        <Text as={"b"}>Precio</Text>
        <Box mb={4}>{ticket?.price}</Box>

        <Text as={"b"}>Cargo por servicio</Text>
        <Box mb={4}>{ticket?.service_charge}</Box>

        <Text as={"b"}>Evento</Text>
        <HStack mb={4}>
          <Text>{ticket?.event.name}</Text>
        </HStack>

        <Text as={"b"}>Tipo de acceso</Text>
        <Box mb={4}>{ticket?.access_type?.name}</Box>

        <Text as={"b"}>Tipo de dueño</Text>
        <Box mb={4}>{ticket?.ticket_type?.name}</Box>

        <Text as={"b"}>Fecha de creación</Text>
        <Box mb={4}>{new Date(ticket?.createdAt).toLocaleString()}</Box>

        <Text as={"b"}>Fecha de actualización</Text>
        <Box mb={4}>{new Date(ticket?.updatedAt).toLocaleString()}</Box>
      </Box>
    </IntroAnimationComponent>
  );
};

export default ShowCourtecyTicketView;
