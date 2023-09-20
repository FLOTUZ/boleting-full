import EventsSection from "./components-landing-page/events-section.component";
import HeaderLandingComponent from "./components-landing-page/header.component";
import MainEvent from "./components-landing-page/main-event.component";
import YourEvent from "./components-landing-page/your-event.component";

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
