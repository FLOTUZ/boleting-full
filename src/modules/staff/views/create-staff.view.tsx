import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User, useShowAvailableEventStaffQuery } from "@/gql/generated";

import SelectEventStaffDatatable from "../components/select-event-staff.datatable";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import IntroAnimationComponent from "@/components/animations/intro-animation.component";

import { Box, Button, Heading } from "@chakra-ui/react";
import { BiRefresh } from "react-icons/bi";

const CreateStaffView = () => {
  const router = useRouter();
  const { id } = router.query;

  const [staffList, setStaffList] = useState<User[]>([]);
  const { data, loading, refetch } = useShowAvailableEventStaffQuery({
    variables: {
      // @ts-ignore
      eventId: Number(id),
    },
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    if (data?.availableStaff) {
      setStaffList(data.availableStaff as User[]);
    }
  }, [data]);

  if (loading) {
    return <ProgressLoaderComponent />;
  }

  return (
    <IntroAnimationComponent data={staffList}>
      <Box p={4}>
        <Button mb={4} onClick={() => refetch()}>
          <BiRefresh size={20} />
        </Button>

        <SelectEventStaffDatatable
          loader={loading}
          data={staffList}
          refetch={refetch}
        />
      </Box>
    </IntroAnimationComponent>
  );
};

export default CreateStaffView;
