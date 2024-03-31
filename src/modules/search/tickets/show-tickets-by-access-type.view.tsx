import { useEffect, useState } from "react";
import {
  AccessType,
  useShowTicketsByAccessTypeLazyQuery,
} from "@/gql/generated";
import { Box, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import ProductDetailComponent from "@/modules/orders/components/product-detail.component";
import { useRouter } from "next/router";
import { CreateOrderPath, PaymentPath } from "@/routes";

interface AvailableEventTicketsProps {
  eventId: string;
  accessTypeId: string;
}

const ShowavailableTicketsByAccessTypesView = ({
  eventId,
  accessTypeId,
}: AvailableEventTicketsProps) => {
  const router = useRouter();

  const [accessType, setAccessType] = useState<AccessType>();
  const [isMobile] = useMediaQuery("(max-width: 767px)");

  const [GET_TICKETS_BY_ACCESS_TYPE] = useShowTicketsByAccessTypeLazyQuery({
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
        <Heading mr={2}>Tickets</Heading>
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
      <Box>
        <ProductDetailComponent
          key={0}
          onSubmit={(buyedTikets) => {
            if (Number(accessType?.price) === 0) {
              router.push(
                CreateOrderPath(
                  String(eventId),
                  String(accessTypeId),
                  Number(buyedTikets)
                )
              );
              return;
            }
            router.push(PaymentPath(eventId, accessTypeId, buyedTikets));
          }}
        />
      </Box>
    </>
  );
};

export default ShowavailableTicketsByAccessTypesView;
