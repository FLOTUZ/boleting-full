import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import {
  User,
  useShowEventStaffLazyQuery,
  useShowEventStaffQuery,
} from "@/gql/generated";
import { Box, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import EventStaffDatatable from "./components/staff.datatable";
import Link from "next/link";
import { CreateEventStaffPath } from "@/routes";

interface ShowStaffViewProps {
  eventId: number;
}
const ShowEventStaffView = ({ eventId }: ShowStaffViewProps) => {
  const [eventStaff, setEventStaff] = useState<User[]>([]);

  const [getStaff, { data, loading }] = useShowEventStaffLazyQuery({
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    if (data?.event?.staff) {
      setEventStaff(data.event.staff as User[]);
    }
  }, [data]);

  useEffect(() => {
    getStaff({
      variables: {
        // i dont know why but ts is not recognizing eventId as a number
        // so i have to use ts-ignore
        // @ts-ignore
        eventId,
      },
    });
  }, [eventId, getStaff]);

  return (
    <IntroAnimationComponent data={data}>
      <Box p={4}>
        <Link passHref href={CreateEventStaffPath(eventId)}>
          <Button>Agregar staff</Button>
        </Link>
        <Box mt={4}>
          <EventStaffDatatable data={eventStaff} loader={loading} />
        </Box>
      </Box>
    </IntroAnimationComponent>
  );
};

export default ShowEventStaffView;
