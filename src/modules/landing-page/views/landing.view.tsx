import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import EventsSection from "../components/events-section.component";
import LandingLayout from "../../../layouts/landing-layout.component";
import MainEvent from "../components/main-event.component";
import YourEvent from "../components/your-event.component";

const LandingViewComponent = () => {
  return (
    <IntroAnimationComponent data={true}>
      <LandingLayout>
        <MainEvent />
        <EventsSection />
        <YourEvent />
      </LandingLayout>
    </IntroAnimationComponent>
  );
};

export default LandingViewComponent;
