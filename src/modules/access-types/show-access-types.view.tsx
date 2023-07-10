import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import AccessTypeDatatable from "./components/access-types-datatable.component";
import { AccessType, useAccessTypesByEventLazyQuery } from "@/gql/generated";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

const ShowAccessTypesView = () => {
  const [accessTypes, setAccessTypes] = useState<AccessType[]>([]);
  const router = useRouter();
  const { id } = router.query;

  const [fetchAccessTypes, { data, loading }] = useAccessTypesByEventLazyQuery({
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (id) {
      fetchAccessTypes({
        variables: {
          eventId: parseInt(id as string),
        },
      });
    }
  }, [fetchAccessTypes, id]);

  useEffect(() => {
    if (data) {
      setAccessTypes(data.accessTypesByEventId as AccessType[]);
    }
  }, [data]);

  if (loading) {
    return <ProgressLoaderComponent />;
  }

  return (
    <IntroAnimationComponent data={data}>
      <Box p={4}>
        <AccessTypeDatatable data={accessTypes} />
      </Box>
    </IntroAnimationComponent>
  );
};

export default ShowAccessTypesView;
