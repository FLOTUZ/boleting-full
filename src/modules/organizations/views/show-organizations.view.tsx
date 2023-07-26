import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import { Organization, useShowOrganizationsQuery } from "@/gql/generated";
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import ShowOrganizationsDatatable from "../components/show-organizations-datatable.component";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";

const ShowOrganizationsView = () => {
  const [organizationsList, setOrganizationsList] = useState<Organization[]>(
    []
  );
  const { data, error, loading, refetch } = useShowOrganizationsQuery();

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

  if (loading) {
    return <ProgressLoaderComponent />;
  }

  return (
    <IntroAnimationComponent data={data}>
      <Box m={4}>
        <ShowOrganizationsDatatable
          data={organizationsList}
          progressPending={loading}
          refetch={refetch}
        />
      </Box>
    </IntroAnimationComponent>
  );
};

export default ShowOrganizationsView;
