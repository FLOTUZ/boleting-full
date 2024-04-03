import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { ShowOrderPath, SuccessPaymentPath } from "@/routes";

import { Heading, Button, Box, useToast } from "@chakra-ui/react";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";

import {
  AccessType,
  useCreateFreeOrderMutation,
  useCreateOpenVenuePaymentLinkLazyQuery,
  useShowAccessTypeLazyQuery,
} from "@/gql/generated";
import FreeOrder from "../components/free-order";

const CreateOrderView = () => {
  const router = useRouter();
  const toast = useToast();

  const { eventId, accessTypeId, buyedTicketsCount } = router.query;

  const [accessType, setAccessType] = useState<AccessType | null>(null);
  const [GET_ACCESS_TYPE, { loading: loadingAccessType }] =
    useShowAccessTypeLazyQuery({
      variables: {
        accessTypeId: Number(accessTypeId),
      },
      onCompleted(data) {
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
      GET_ACCESS_TYPE();
    }
  }, [GET_ACCESS_TYPE, accessTypeId]);

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
    <Box>
      <Heading>Create order</Heading>

      <Link href={ShowOrderPath("test")}>
        <Box>
          Evento: {eventId} - Access type: {accessTypeId} - Buyed tickets:{" "}
          {buyedTicketsCount}
        </Box>
      </Link>

      <Button
        w={"full"}
        placeContent={"start"}
        variant="ghost"
        isLoading={loading}
        onClick={() => CHECK_OPEN_VENUE()}
      >
        Orden de prueba
      </Button>
    </Box>
  );
};

export default CreateOrderView;
