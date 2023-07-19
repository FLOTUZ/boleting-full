import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import { AccessType, useShowAccessTypeLazyQuery } from "@/gql/generated";
import { Text, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ShowAccessTypeView = () => {
  const router = useRouter();
  const { accessTypeId } = router.query;

  const [accessType, setAccessType] = useState<AccessType>();

  const [showAccessType, { data, loading }] = useShowAccessTypeLazyQuery({
    onCompleted(data) {
      setAccessType(data.accessType as AccessType);
    },
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    if (accessTypeId != null) {
      showAccessType({
        variables: {
          accessTypeId: Number(accessTypeId),
        },
      });
    }
  }, [accessTypeId, showAccessType]);

  if (loading) {
    return <ProgressLoaderComponent />;
  }

  return (
    <IntroAnimationComponent data={data}>
      <Box m={4}>Access Type view</Box>
      <Text>{JSON.stringify(accessType)}</Text>
    </IntroAnimationComponent>
  );
};

export default ShowAccessTypeView;
