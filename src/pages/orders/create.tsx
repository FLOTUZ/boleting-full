import Link from "next/link";

import LandingLayout from "@/layouts/landing-layout.component";
import IntroAnimationComponent from "@/components/animations/intro-animation.component";

import { ShowOrderPath } from "@/routes";
import { Box, Button, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCreateOpenVenuePaymentLinkLazyQuery } from "@/gql/generated";

const CreateOrderRoute = () => {
  const router = useRouter();
  const { eventId, accessTypeId, buyedTicketsCount } = router.query;

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

  return (
    <LandingLayout>
      <IntroAnimationComponent data={true}>
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
      </IntroAnimationComponent>
    </LandingLayout>
  );
};

export default CreateOrderRoute;
