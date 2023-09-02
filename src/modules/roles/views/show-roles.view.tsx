import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import ShowRolesDatatable from "../components/show-roles.datatable";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Role, useRolesListLazyQuery } from "@/gql/generated";
import { CreateRolePath } from "@/routes";

import { Box, Button, HStack } from "@chakra-ui/react";
import { TbReload } from "react-icons/tb";

const ShowRolesView = () => {
  const [roleList, setRoleList] = useState<Role[]>([]);

  const [getRoles, { loading, error, refetch }] = useRolesListLazyQuery({
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
      <HStack m={4}>
        <Button onClick={() => refetch()}>
          <TbReload />
        </Button>
        <HStack mb={4}>
          <Link href={CreateRolePath}>
            <Button>Nuevo rol</Button>
          </Link>
        </HStack>
      </HStack>
      <Box m={4}>
        <ShowRolesDatatable data={roleList} loader={loading} />
      </Box>
    </IntroAnimationComponent>
  );
};

export default ShowRolesView;
