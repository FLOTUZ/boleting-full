import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import LandingLayout from "@/layouts/landing-layout.component";
import ShowavailableTicketsByAccessTypesView from "@/modules/search/tickets/show-tickets-by-access-type.view";
import { useRouter } from "next/router";

const ShowTicketsByAccessTypesRoute = () => {
  const router = useRouter();
  const { eventId, accessTypeId } = router.query;

  return (
    <LandingLayout>
      <IntroAnimationComponent data={eventId != null}>
        <ShowavailableTicketsByAccessTypesView
          eventId={eventId as string}
          accessTypeId={accessTypeId as string}
        />
      </IntroAnimationComponent>
    </LandingLayout>
  );
};

export default ShowTicketsByAccessTypesRoute;
