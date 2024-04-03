import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import LandingLayout from "@/layouts/landing-layout.component";
import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import AutenticationClientComponent from "@/layouts/autentication-client.component";

import { Order, useOrderDetailsLazyQuery } from "@/gql/generated";
import { Heading } from "@chakra-ui/react";

const OrderDetailsRoute = () => {
  const router = useRouter();
  const { orderId } = router.query;

  const [order, setOrder] = useState<Order | null>(null);

  const [GET_ORDER_DETAILS, { loading: orderDetailsLoading }] =
    useOrderDetailsLazyQuery({
      variables: {
        orderId: Number(orderId),
      },
      onCompleted(data) {
        setOrder(data.order as Order);
      },
    });

  useEffect(() => {
    if (orderId) {
      GET_ORDER_DETAILS();
    }
  }, [GET_ORDER_DETAILS, orderId]);

  if (orderDetailsLoading) {
    return <ProgressLoaderComponent />;
  }

  return (
    <LandingLayout>
      <IntroAnimationComponent data={orderDetailsLoading}>
        <AutenticationClientComponent>
          <Heading>Order - {order?.id} </Heading>
        </AutenticationClientComponent>
      </IntroAnimationComponent>
    </LandingLayout>
  );
};

export default OrderDetailsRoute;
