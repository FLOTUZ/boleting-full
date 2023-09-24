import EventsSection from "../components/events-section.component";
import HeaderLandingComponent from "../components/header.component";
import MainEvent from "../components/main-event.component";
import YourEvent from "../components/your-event.component";

const LandingViewComponent = () => {
  return (
    <>
      <HeaderLandingComponent />
      <MainEvent />
      <EventsSection />
      <YourEvent />
    </>
  );
};

export default LandingViewComponent;
