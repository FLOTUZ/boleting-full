import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import LandingLayout from "@/layouts/landing-layout.component";
import { ShowOrderPath } from "@/routes";
import { Button, Heading } from "@chakra-ui/react";
import Link from "next/link";

const OrdersRoute = () => {
  return (
    <LandingLayout>
      <IntroAnimationComponent data={true}>
        <Heading>My Orders</Heading>

        <Link href={ShowOrderPath("test")}>
          <Button w={"full"} placeContent={"start"} variant="ghost">
            Orden de prueba
          </Button>
        </Link>
      </IntroAnimationComponent>
    </LandingLayout>
  );
};

export default OrdersRoute;
