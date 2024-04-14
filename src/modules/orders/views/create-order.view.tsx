import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SuccessPaymentPath } from "@/routes";
import { Heading, Button, useToast, Card, Text } from "@chakra-ui/react";

import {
  AccessType,
  Event,
  useCreateFreeOrderMutation,
  useCreateOpenVenuePaymentLinkLazyQuery,
  useOrderResumeLazyQuery,
} from "@/gql/generated";

import FreeOrder from "../components/free-order";

const CreateOrderView = () => {
  const router = useRouter();
  const toast = useToast();

  const { eventId, accessTypeId, buyedTicketsCount } = router.query;

  const [event, setEvent] = useState<Event | null>(null);
  const [accessType, setAccessType] = useState<AccessType | null>(null);

  const [GET_ORDER_DETAILS] = useOrderResumeLazyQuery({
    variables: {
      eventId: Number(eventId),
      accessTypeId: Number(accessTypeId),
    },
    onCompleted(data) {
      setEvent(data.event as Event);
      setAccessType(data.accessType as AccessType);
    },
  });

  const [CHECK_OPEN_VENUE, { loading }] =
    useCreateOpenVenuePaymentLinkLazyQuery({
      variables: {
        data: {
          eventId: Number(eventId),
          access_typeId: Number(accessTypeId),
          buyed_access_count: Number(buyedTicketsCount),
        },
      },
      onCompleted: (data) => {
        router.push(data.createOpenVenueOrder);
      },
    });

  const [CREATE_FREE_ORDER] = useCreateFreeOrderMutation({
    variables: {
      data: {
        eventId: Number(eventId),
        access_typeId: Number(accessTypeId),
        buyed_access_count: Number(buyedTicketsCount),
      },
    },
    onCompleted: (data) => {
      router.push(SuccessPaymentPath(String(data.createFreeOrder?.id!)));
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  useEffect(() => {
    if (accessTypeId) {
      GET_ORDER_DETAILS();
    }
  }, [GET_ORDER_DETAILS, accessTypeId]);

  if (loading) {
    return <ProgressLoaderComponent />;
  }

  if (Number(accessType?.price) === 0) {
    return (
      <FreeOrder
        accessType={accessType!}
        onSubmit={() => CREATE_FREE_ORDER()}
      />
    );
  }

  return (
    <Card p={8}>
      <Heading>Resumen de orden</Heading>

      <Text>Evento: {event?.name}</Text>
      <Text>
        {buyedTicketsCount}x {accessType?.name}
      </Text>

      <Text>
        Total: {Number(accessType?.price) * Number(buyedTicketsCount)}
      </Text>

      <Button
        w={"full"}
        h={"4rem"}
        mt={8}
        placeContent={"center"}
        colorScheme="green"
        isLoading={loading}
        _hover={{ bg: "blue.500" }}
        _dark={{ _hover: { color: "white" } }}
        onClick={() => CHECK_OPEN_VENUE()}
      >
        Proceder al pago
      </Button>
    </Card>
  );
};

export default CreateOrderView;
