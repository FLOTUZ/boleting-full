import { useEffect, useState } from "react";
import {
  AccessType,
  useShowTicketsByAccessTypeLazyQuery,
} from "@/gql/generated";
import {
  Box,
  Heading,
  SimpleGrid,
  Spacer,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import ShowOrderView from "@/modules/orders/views/show-order.view";

interface AvailableEventTicketsProps {
  eventId: string;
  accessTypeId: string;
}

const ShowavailableTicketsByAccessTypesView = ({
  eventId,
  accessTypeId,
}: AvailableEventTicketsProps) => {
  const [accessType, setAccessType] = useState<AccessType>();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

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
      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        alignItems="start"
      >
        <Heading>Tickets de </Heading>

        <Text mx={isMobile ? 0 : 2} fontSize={"3xl"} fontWeight="thin">
          {accessType?.name}
        </Text>
        <Heading mr={isMobile ? 0 : 2}>para</Heading>
        <Text fontSize={"3xl"} fontWeight="thin">
          {accessType?.event.name}
        </Text>
      </Box>
      <ShowOrderView />
    </Box>
  );
};

export default ShowavailableTicketsByAccessTypesView;