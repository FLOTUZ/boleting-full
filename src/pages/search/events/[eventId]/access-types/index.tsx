import LandingLayout from "@/layouts/landing-layout.component";
import ShowEventAccessTypes from "@/modules/search/access-types/show-event-access-types.view";
import { useRouter } from "next/router";

const ShowEventAccessTypesRoute = () => {
  const router = useRouter();
  const { eventId } = router.query;
  return (
    <LandingLayout>
      <ShowEventAccessTypes eventId={eventId as string} />
    </LandingLayout>
  );
};

export default ShowEventAccessTypesRoute;
