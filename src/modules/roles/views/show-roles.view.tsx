import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import ShowRolesDatatable from "../components/show-roles.datatable";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  PaginationResponse,
  Role,
  useRolesListLazyQuery,
} from "@/gql/generated";
import { CreateRolePath } from "@/routes";

import { Box, Button, HStack } from "@chakra-ui/react";
import { TbReload } from "react-icons/tb";
import { usePaginator } from "@/hooks";

const ShowRolesView = () => {
  const [roleList, setRoleList] = useState<Role[]>([]);

  const { setPaginator, setCount, ...paginator } = usePaginator({
    take: 10,
    skip: 0,
  });
  const [getRoles, { loading, error, refetch }] = useRolesListLazyQuery({
    variables: {
      pagination: { take: paginator.take, skip: paginator.skip },
    },
    onCompleted(data) {
      setRoleList(data.roles?.data as Role[]);
      setCount(data.roles?.count as number);
      setPaginator(data.roles?.pagination as PaginationResponse);
    },
  });

  useEffect(() => {
    getRoles();
  }, [getRoles]);

  useEffect(() => {
    refetch({
      pagination: { take: paginator.take, skip: paginator.skip },
    });
  }, [paginator.skip, paginator.take, refetch]);

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
    <>
      {loading && <ProgressLoaderComponent />}
      <HStack m={4}>
        <Button onClick={() => refetch()}>
          <TbReload />
        </Button>

        <Link href={CreateRolePath}>
          <Button>Nuevo rol</Button>
        </Link>
      </HStack>

      <Box m={4}>
        <ShowRolesDatatable
          loader={loading}
          paginator={paginator}
          data={roleList}
          {...paginator}
        />
      </Box>
    </>
  );
};

export default ShowRolesView;
