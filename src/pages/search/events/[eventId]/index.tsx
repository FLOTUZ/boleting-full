import LandingLayout from "@/layouts/landing-layout.component";
import SearchEventView from "@/modules/search/views/events/search-event.view";

const ShowEventRoute = () => {
  return (
    <>
      <LandingLayout />
      <SearchEventView />
    </>
  );
};

export default ShowEventRoute;
