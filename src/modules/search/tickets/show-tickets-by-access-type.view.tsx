import { useEffect, useState } from "react";
import {
  AccessType,
  useShowTicketsByAccessTypeLazyQuery,
} from "@/gql/generated";
import { Box, Heading, Text } from "@chakra-ui/react";

interface AvailableEventTicketsProps {
  eventId: string;
  accessTypeId: string;
}

const ShowavailableTicketsByAccessTypesView = ({
  eventId,
  accessTypeId,
}: AvailableEventTicketsProps) => {
  const [accessType, setAccessType] = useState<AccessType>();

  const [GET_TICKETS_BY_ACCESS_TYPE, { loading, error }] =
    useShowTicketsByAccessTypeLazyQuery({
      onCompleted(data) {
        setAccessType(data.accessType as AccessType);
      },
    });

  useEffect(() => {
    if (accessTypeId) {
      GET_TICKETS_BY_ACCESS_TYPE({
        variables: {
          accessTypeId: Number(accessTypeId),
        },
      });
    }
  }, [GET_TICKETS_BY_ACCESS_TYPE, accessTypeId]);

  return (
    <Box>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Heading>Tickets de </Heading>
        <Text ml={4} mr={4} fontSize={"4xl"}>
          {accessType?.name}
        </Text>
        <Heading>para:</Heading>
        <Text ml={4} fontSize={"4xl"}>
          {accessType?.event.name}
        </Text>
      </Box>
    </Box>
  );
};

export default ShowavailableTicketsByAccessTypesView;
