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
import { useRouter } from "next/router";

const ShowEventStaffView = () => {
  const router = useRouter();
  const { id } = router.query;
  const [eventStaff, setEventStaff] = useState<User[]>([]);

  const [getStaff, { data, loading }] = useShowEventStaffLazyQuery({
    variables: {
      // i dont know why but ts is not recognizing eventId as a number
      // so i have to use ts-ignore
      // @ts-ignore
      eventId: Number(id),
    },
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
    getStaff();
  }, [getStaff]);

  if (!id) return null;

  return (
    <IntroAnimationComponent data={eventStaff}>
      <Box p={4}>
        <Link passHref href={CreateEventStaffPath(Number(id))}>
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
