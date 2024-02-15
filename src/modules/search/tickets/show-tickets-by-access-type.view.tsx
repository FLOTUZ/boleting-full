import { useEffect, useState } from "react";
import {
  AccessType,
  useShowTicketsByAccessTypeLazyQuery,
} from "@/gql/generated";
import { Box, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import SelectPaymentMethod from "@/modules/orders/views/select-payment-method.view";

interface AvailableEventTicketsProps {
  eventId: string;
  accessTypeId: string;
}

const ShowavailableTicketsByAccessTypesView = ({
  accessTypeId,
}: AvailableEventTicketsProps) => {
  const [accessType, setAccessType] = useState<AccessType>();
  const [isMobile] = useMediaQuery("(max-width: 767px)");

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
    <>
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        justifyContent={isMobile ? "start" : "center"}
      >
        <Heading mr={2}>Tickets de </Heading>
        <Text mx={isMobile ? 0 : 2} fontSize={"3xl"} fontWeight="thin">
          {accessType?.name}
        </Text>
        <Heading ml={2} mr={2}>
          para
        </Heading>
        <Text fontSize={"3xl"} fontWeight="thin">
          {accessType?.event.name}
        </Text>
      </Box>
      <SelectPaymentMethod />
    </>
  );
};

export default ShowavailableTicketsByAccessTypesView;
