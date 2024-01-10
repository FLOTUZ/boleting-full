import { useEffect, useState } from "react";
import { Organization, useSearchOrganizationLazyQuery } from "@/gql/generated";

import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import LandingLayout from "@/layouts/landing-layout.component";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";

const SearchOrganizationsPage = () => {
  const router = useRouter();
  const { organizationId } = router.query;

  const [organization, setOrganization] = useState<Organization | null>();

  const [GET_ORGANIZATION, { loading, error }] = useSearchOrganizationLazyQuery(
    {
      variables: {
        organizationId: Number(organizationId),
      },
      onCompleted(data) {
        setOrganization(data.organization as Organization);
      },
    }
  );

  useEffect(() => {
    if (GET_ORGANIZATION) {
      GET_ORGANIZATION();
    }
  }, [GET_ORGANIZATION]);

  if (error) {
    return <div>Error: {error.graphQLErrors.map((e) => e.message)}</div>;
  }

  return (
    <LandingLayout>
      <IntroAnimationComponent data={loading}>
        <Box>{organization?.name}</Box>

        <Box>
          {organization?.events?.map((event) => (
            <Box key={event.id}>{event.name}</Box>
          ))}
        </Box>
      </IntroAnimationComponent>
    </LandingLayout>
  );
};

export default SearchOrganizationsPage;
