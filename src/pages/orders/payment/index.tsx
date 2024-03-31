import { useRouter } from "next/router";

import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import LandingLayout from "@/layouts/landing-layout.component";
import PaymentView from "@/modules/orders/views/payment.view";

const CheckoutRoute = () => {
  const router = useRouter();
  const { eventId } = router.query;

  return (
    <LandingLayout>
      <IntroAnimationComponent data={eventId != null}>
        <PaymentView />
      </IntroAnimationComponent>
    </LandingLayout>
  );
};

export default CheckoutRoute;
