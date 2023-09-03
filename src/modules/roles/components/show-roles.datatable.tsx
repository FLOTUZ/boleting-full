import React from "react";
import { useRouter } from "next/router";
import DataTable, { TableColumn } from "react-data-table-component";

import { PaginationResponse, Role } from "@/gql/generated";
import { ShowRolePath } from "@/routes";

import {
  Box,
  Text,
  SimpleGrid,
  useColorMode,
  Badge,
  Heading,
} from "@chakra-ui/react";

interface ShowRolesDatatableProps {
  setTake: (take: number) => void;
  setSkip: (skip: number) => void;
  paginator: PaginationResponse;
  count: number;
  data: Role[];
  loader: boolean;
}

const ShowRolesDatatable = ({
  loader,
  paginator,
  setTake,
  setSkip,
  count,
  data,
}: ShowRolesDatatableProps) => {
  const router = useRouter();
  const { colorMode } = useColorMode();

  const columns: TableColumn<Role>[] = [
    {
      name: "ID",
      sortable: true,
      selector: (row) => row.id!,
    },
    {
      name: "Nombre",
      sortable: true,
      selector: (row) => row.name!,
    },
    {
      name: "Descripción",
      sortable: true,
      selector: (row) =>
        row.description ? row.description : "Sin descripción",
    },
  ];
  return (
    <DataTable
      title="Roles"
      responsive
      noHeader
      theme={colorMode === "light" ? "light" : "dark"}
      pointerOnHover
      persistTableHead
      highlightOnHover
      pagination
      columns={columns}
      data={data}
      progressPending={loader}
      paginationServer={true}
      paginationTotalRows={count}
      paginationPerPage={paginator.take}
      onChangeRowsPerPage={(e) => {
        setTake(e);
      }}
      onChangePage={(page) => {
        const skip = page * paginator.take - paginator.take;
        setSkip(skip);
      }}
      progressComponent={
        <Box m={100}>
          <Heading size={"md"}>Cargando...</Heading>
        </Box>
      }
      onRowClicked={(event) => router.push(ShowRolePath(String(event.id)))}
      expandableRows
      expandableRowsComponent={(row) => <PermmisionsWithBadges {...row.data} />}
      noDataComponent={<div>No hay datos</div>}
    />
  );
};

const PermmisionsWithBadges = (role: Role) => {
  return role.abilities?.length == 0 ? (
    <Box m={4}>Sin permisos</Box>
  ) : (
    <SimpleGrid columns={[1, 2, 3]} spacing={4} m={4}>
      {role.abilities?.map((ability) => {
        const colors: any = [
          { name: "create", color: "green" },
          { name: "read", color: "blue" },
          { name: "update", color: "yellow" },
          { name: "delete", color: "red" },
        ];
        const action = ability.name.split(":")[0];

        const badgeColor = colors.find(
          (color: any) => color.name === action
        )?.color;

        return (
          <Box key={ability.id} alignItems={"center"} display={"flex"}>
            <Badge colorScheme={badgeColor} mr={2}>
              {ability.name.split(":")[0]}
            </Badge>
            <Text>{ability.name.split(":")[1]}</Text>
          </Box>
        );
      })}
    </SimpleGrid>
  );
};

export default ShowRolesDatatable;
