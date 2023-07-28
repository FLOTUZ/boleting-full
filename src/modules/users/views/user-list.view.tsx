import { useEffect, useState } from "react";

import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import ShowUsersDatatable from "../components/show-users-datatable.componet";

import { User, useShowUsersLazyQuery } from "@/gql/generated";
import { Box, Button, HStack } from "@chakra-ui/react";
import { IoReload } from "react-icons/io5";

const UserListView = () => {
  const [users, setusers] = useState<User[]>([]);

  const [fetchUsers, { data, loading, error, refetch }] = useShowUsersLazyQuery(
    {
      fetchPolicy: "network-only",
      onCompleted(data) {
        setusers(data.users as User[]);
      },
    }
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) {
    return <ProgressLoaderComponent />;
  }

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
        <HStack mb={4}>
          <Button onClick={() => refetch()}>
            <IoReload />
          </Button>
        </HStack>
        <ShowUsersDatatable data={users} progressPending={loading} />
      </Box>
    </IntroAnimationComponent>
  );
};

export default UserListView;
