import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import EventsSection from "../components/events-section.component";
import HeaderLandingComponent from "../../../layouts/header-landing.component";
import MainEvent from "../components/main-event.component";
import YourEvent from "../components/your-event.component";

const LandingViewComponent = () => {
  return (
    <IntroAnimationComponent data={true}>
      <HeaderLandingComponent />
      <MainEvent />
      <EventsSection />
      <YourEvent />
    </IntroAnimationComponent>
  );
};

export default LandingViewComponent;
