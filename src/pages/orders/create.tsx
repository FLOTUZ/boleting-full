import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import LandingLayout from "@/layouts/landing-layout.component";
import { ShowOrderPath } from "@/routes";
import { Box, Button, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

const CreateOrderRoute = () => {
  const router = useRouter();
  const { eventId, accessTypeId } = router.query;

  return (
    <LandingLayout>
      <IntroAnimationComponent data={true}>
        <Heading>Create order</Heading>

        <Link href={ShowOrderPath("test")}>
          <Button w={"full"} placeContent={"start"} variant="ghost">
            Orden de prueba
          </Button>

          <Box>
            Evento: {eventId} - Access type: {accessTypeId}
          </Box>
        </Link>
      </IntroAnimationComponent>
    </LandingLayout>
  );
};

export default CreateOrderRoute;
