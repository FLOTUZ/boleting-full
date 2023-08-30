import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import { Role, useRolesListLazyQuery } from "@/gql/generated";
import { CreateRolePath } from "@/routes";
import { Box, Button, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ShowRolesDatatable from "../components/show-roles.datatable";

const ShowRolesView = () => {
  const router = useRouter();
  const [roleList, setRoleList] = useState<Role[]>([]);

  const [getRoles, { loading, error }] = useRolesListLazyQuery({
    onCompleted(data) {
      setRoleList(data.roles as Role[]);
    },
  });

  useEffect(() => {
    getRoles();
  }, [getRoles]);

  if (loading) {
    return <ProgressLoaderComponent />;
  }

  if (error) {
    return (
      <ul>
        {error.graphQLErrors.map((error, index) => {
          return <li key={index}>{error.message}</li>;
        })}
      </ul>
    );
  }

  return (
    <IntroAnimationComponent data={roleList}>
      <Box m={4}>
        <HStack mb={4}>
          <Link href={CreateRolePath}>
            <Button>Nuevo rol</Button>
          </Link>
        </HStack>
      </Box>
      <Box m={4}>
        <ShowRolesDatatable data={roleList} loader={loading} />
      </Box>
    </IntroAnimationComponent>
  );
};

export default ShowRolesView;
