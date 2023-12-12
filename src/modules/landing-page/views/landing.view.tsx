import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import EventsSection from "../components/events-section.component";
import LandingLayout from "../../../layouts/landing-layout.component";
import MainEvent from "../components/main-event.component";
import YourEvent from "../components/your-event.component";
import { Event, EventCategory, useLandingViewLazyQuery } from "@/gql/generated";
import { useEffect, useState } from "react";

const LandingViewComponent = () => {
  const [popularEvents, setPopularEvents] = useState<Event[]>([]);
  const [eventCategories, setEventCategories] = useState<EventCategory[]>([]);

  const [GET_LANDING_VIEW, { data, loading, error }] = useLandingViewLazyQuery({
    onCompleted(data) {
      setEventCategories(data.eventCategories as EventCategory[]);
      setPopularEvents(data.popular_events as Event[]);
    },
  });

  useEffect(() => {
    GET_LANDING_VIEW();
  }, [GET_LANDING_VIEW]);

  return (
    <IntroAnimationComponent data={loading}>
      <LandingLayout>
        <MainEvent event={popularEvents[0]} />
        <EventsSection categories={eventCategories} events={popularEvents} />
        <YourEvent />
      </LandingLayout>
    </IntroAnimationComponent>
  );
};

export default LandingViewComponent;
