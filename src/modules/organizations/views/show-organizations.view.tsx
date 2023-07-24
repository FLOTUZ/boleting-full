import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import { Organization, useShowOrganizationsQuery } from "@/gql/generated";
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

const ShowOrganizationsView = () => {
  const [organizationsList, setOrganizationsList] = useState<Organization[]>(
    []
  );
  const { data, error } = useShowOrganizationsQuery();

  useEffect(() => {
    if (data) {
      setOrganizationsList(data.organizations as Organization[]);
    }
  }, [data]);

  if (error) {
    return (
      <Box m={4}>
        {error.graphQLErrors.map((error, index) => (
          <pre key={index}>{error.message}</pre>
        ))}
      </Box>
    );
  }

  return (
    <IntroAnimationComponent data={data}>
      <Box m={4}>
        <pre>{JSON.stringify(organizationsList, null, 2)}</pre>
      </Box>
    </IntroAnimationComponent>
  );
};

export default ShowOrganizationsView;
