import LandingLayout from "@/layouts/landing-layout.component";
import EventsByCategoryView from "@/modules/search/events";

const EventsByCategoryRoute = () => {
  return (
    <>
      <LandingLayout>
        <EventsByCategoryView />
      </LandingLayout>
    </>
  );
};

export default EventsByCategoryRoute;
