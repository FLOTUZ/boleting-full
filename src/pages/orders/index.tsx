import Link from "next/link";
import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import LandingLayout from "@/layouts/landing-layout.component";
import { ShowOrderPath } from "@/routes";
import { Order, useCurrentClientOrdersLazyQuery } from "@/gql/generated";
import { Button, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const OrdersRoute = () => {
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [GET_ORDERS, { data, loading }] = useCurrentClientOrdersLazyQuery({
    onCompleted(data) {
      setOrdersList(data.currentClientOrders as Order[]);
    },
  });

  useEffect(() => {
    GET_ORDERS();
  }, [GET_ORDERS]);

  return (
    <LandingLayout>
      <IntroAnimationComponent data={loading}>
        <>
          <Heading>Ordenes</Heading>
          {ordersList.map((order, index) => (
            <Link href={ShowOrderPath(String(order.id))} key={index}>
              <Button w={"full"} placeContent={"start"} variant="ghost">
                {order.event?.name}
              </Button>
            </Link>
          ))}
        </>
      </IntroAnimationComponent>
    </LandingLayout>
  );
};

export default OrdersRoute;
