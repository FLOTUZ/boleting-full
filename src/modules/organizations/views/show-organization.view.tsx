import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import { Organization, useShowOrganizationLazyQuery } from "@/gql/generated";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import ShowOrganizationEventsDatatable from "../components/organization-events-datatable.component";

const ShowOrganizationView = () => {
  const router = useRouter();
  const { id: organizationId } = router.query;

  const [organization, setOrganization] = useState<Organization>();

  const [getOrganization, { data, loading, error, refetch }] =
    useShowOrganizationLazyQuery({});

  useEffect(() => {
    if (organizationId) {
      getOrganization({
        variables: {
          organizationId: Number(organizationId),
        },
      });
    }
  }, [getOrganization, organizationId]);

  useEffect(() => {
    if (data) {
      setOrganization(data.organization as Organization);
    }
  }, [data]);

  return (
    <IntroAnimationComponent data={data}>
      <Box m={4}>
        <Heading size="sm" mt={4}>
          Organización
        </Heading>
        <Text>{organization?.name}</Text>

        <Heading size="sm" mt={4}>
          Creado desde
        </Heading>
        <Text>{new Date(organization?.createdAt).toLocaleDateString()}</Text>

        <Box mt={8}>
          <ShowOrganizationEventsDatatable
            data={organization?.events!}
            progressPending={loading}
            refetch={refetch}
          />
        </Box>
      </Box>
    </IntroAnimationComponent>
  );
};

export default ShowOrganizationView;
