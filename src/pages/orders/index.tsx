import Link from "next/link";
import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import LandingLayout from "@/layouts/landing-layout.component";
import { LoginClientPath, ShowOrderPath } from "@/routes";
import { Order, useCurrentClientOrdersLazyQuery } from "@/gql/generated";
import { Button, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import { useRouter } from "next/router";
import AutenticationClientComponent from "@/layouts/autentication-client.component";

const OrdersRoute = () => {
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [GET_ORDERS, { data, loading, error }] =
    useCurrentClientOrdersLazyQuery({
      fetchPolicy: "network-only",
      onCompleted(data) {
        setOrdersList(data.currentClientOrders as Order[]);
      },
    });

  useEffect(() => {
    GET_ORDERS();
  }, [GET_ORDERS]);

  if (loading) {
    return <ProgressLoaderComponent />;
  }

  return (
    <LandingLayout>
      <IntroAnimationComponent data={loading}>
        <AutenticationClientComponent>
          <Heading>Ordenes</Heading>
          {ordersList.map((order, index) => (
            <Link href={ShowOrderPath(String(order.id))} key={index}>
              <Button w={"full"} placeContent={"start"} variant="ghost">
                Order: {order.id} - {order.event?.name}
              </Button>
            </Link>
          ))}
        </AutenticationClientComponent>
      </IntroAnimationComponent>
    </LandingLayout>
  );
};

export default OrdersRoute;
