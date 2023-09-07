import EventsSection from "./components-landing-page/eventsSection.component";
import HeaderLandingComponent from "./components-landing-page/header.component";
import MainEvent from "./components-landing-page/mainEvent.component";
import YourEvent from "./components-landing-page/sendYourEvent.component";

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
