import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import EventsSection from "../components/events-section.component";
import LandingLayout from "../../../layouts/landing-layout.component";
import MainEvent from "../components/main-event.component";
import YourEvent from "../components/your-event.component";
import { Event, EventCategory, useLandingViewQuery } from "@/gql/generated";
import { useState } from "react";

const LandingViewComponent = () => {
  const [popularEvents, setPopularEvents] = useState<Event[]>([]);
  const [eventCategories, setEventCategories] = useState<EventCategory[]>([]);

  const { data, loading, error } = useLandingViewQuery({
    onCompleted(data) {
      setEventCategories(data.eventCategories as EventCategory[]);
      setPopularEvents(data.popular_events as Event[]);
    },
  });

  return (
    <IntroAnimationComponent data={loading}>
      <LandingLayout>
        <MainEvent />
        <EventsSection categories={eventCategories} events={popularEvents} />
        <YourEvent />
      </LandingLayout>
    </IntroAnimationComponent>
  );
};

export default LandingViewComponent;
