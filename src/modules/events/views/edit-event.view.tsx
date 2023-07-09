import { Event, useShowEventQuery } from "@/gql/generated";
import EditEventForm from "../components/edit-event-form";
import { useEffect, useState } from "react";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import { Box } from "@chakra-ui/react";

interface EventViewProps {
  eventId: number;
}
const EditEventView = ({ eventId }: EventViewProps) => {
  const [event, setEvent] = useState<Event>();

  const { data, loading } = useShowEventQuery({
    variables: {
      eventId,
    },
  });

  useEffect(() => {
    if (data) {
      setEvent(data.event as Event);
    }
  }, [data]);

  if (loading) {
    return <ProgressLoaderComponent />;
  }

  return (
    <Box p={4}>
      <IntroAnimationComponent data={event}>
        <EditEventForm event={event} />
      </IntroAnimationComponent>
    </Box>
  );
};

export default EditEventView;
