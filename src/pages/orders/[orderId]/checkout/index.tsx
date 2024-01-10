import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import PaymentForm from "@/components/forms/payment-form";
import LandingLayout from "@/layouts/landing-layout.component";
import { Box, Center, Heading } from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutRoute() {
  const router = useRouter();
  const { orderId } = router.query;
  return (
    <LandingLayout>
      <IntroAnimationComponent data={true}>
        <Heading>Order {orderId}</Heading>
        <Box>
          <Elements stripe={stripePromise}>
            <PaymentForm />
          </Elements>
        </Box>
      </IntroAnimationComponent>
    </LandingLayout>
  );
}
