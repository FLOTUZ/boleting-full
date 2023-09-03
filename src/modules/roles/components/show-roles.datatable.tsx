import React from "react";
import { useRouter } from "next/router";
import DataTable, { TableColumn } from "react-data-table-component";

import { PaginationResponse, Role } from "@/gql/generated";
import { ShowRolePath } from "@/routes";

import { Box, SimpleGrid, useColorMode, Heading } from "@chakra-ui/react";
import AbilityBadge from "./ability-badge";

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
      expandableRowsComponent={({ data: role }) =>
        role.abilities?.length == 0 ? (
          <Box m={4}>Sin permisos</Box>
        ) : (
          <SimpleGrid columns={[1, 2, 3]} spacing={4} m={4}>
            {role.abilities?.map((ability) => {
              return <AbilityBadge key={ability.id} ability={ability} />;
            })}
          </SimpleGrid>
        )
      }
      noDataComponent={<div>No hay datos</div>}
    />
  );
};

export default ShowRolesDatatable;
