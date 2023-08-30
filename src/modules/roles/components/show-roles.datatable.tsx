import { Role } from "@/gql/generated";
import { ShowRolePath } from "@/routes";
import { Box, Container, SimpleGrid, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import DataTable, { TableColumn } from "react-data-table-component";

interface ShowRolesDatatableProps {
  data: Role[];
  loader: boolean;
}

const ShowRolesDatatable = ({ data, loader }: ShowRolesDatatableProps) => {
  const router = useRouter();
  const { colorMode } = useColorMode();

  const columns: TableColumn<Role>[] = [
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
    {},
  ];
  return (
    <DataTable
      title="Roles"
      columns={columns}
      data={data}
      theme={colorMode === "light" ? "light" : "dark"}
      progressPending={loader}
      progressComponent={<div>Loading...</div>}
      selectableRows
      pointerOnHover
      persistTableHead
      highlightOnHover
      pagination
      subHeader
      subHeaderComponent={null}
      noDataComponent={<div>No hay datos</div>}
      onRowClicked={(event) => router.push(ShowRolePath(String(event.id)))}
      expandableRows
      expandableRowsComponent={(row) =>
        row.data.abilities?.length == 0 ? (
          <Box m={4}>Sin permisos</Box>
        ) : (
          <SimpleGrid columns={[1, 2, 3]} spacing={4} m={4}>
            {row.data.abilities?.map((ability) => (
              <Box key={ability.id}>{ability.name}</Box>
            ))}
          </SimpleGrid>
        )
      }
    />
  );
};

export default ShowRolesDatatable;
