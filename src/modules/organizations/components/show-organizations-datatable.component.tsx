import { Organization } from "@/gql/generated";
import { ShowOrganizationPath } from "@/routes";
import { useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import DataTable, { TableColumn } from "react-data-table-component";

interface ShowOrganizationsDatatableProps {
  data: Organization[];
  progressPending: boolean;
}

const ShowOrganizationsDatatable = (props: ShowOrganizationsDatatableProps) => {
  const router = useRouter();
  const { colorMode } = useColorMode();

  const columns: TableColumn<Organization>[] = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.name!,
      sortable: true,
    },
    {
      name: "Creación",
      selector: (row) => new Date(row.createdAt!).toLocaleString(),
      sortable: true,
    },
    {
      name: "Actualización",
      selector: (row) =>
        row.updatedAt ? row.updatedAt : "No se ha actualizado",
      sortable: true,
    },
  ];
  return (
    <DataTable
      {...props}
      columns={columns}
      theme={colorMode === "light" ? "light" : "dark"}
      title={`Organizaciones`}
      progressComponent={<div>Cargando entradas...</div>}
      pointerOnHover
      persistTableHead
      highlightOnHover
      subHeader
      noDataComponent={<div>No existen organizaciones </div>}
      onRowClicked={(organization) =>
        router.push(ShowOrganizationPath(String(organization.id)))
      }
    />
  );
};

export default ShowOrganizationsDatatable;
