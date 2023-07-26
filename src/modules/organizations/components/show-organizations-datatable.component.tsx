import { Organization, Ticket } from "@/gql/generated";
import { ShowOrganizationPath } from "@/routes";
import { Button, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import DataTable, { TableColumn } from "react-data-table-component";
import { IoReload } from "react-icons/io5";

interface ShowOrganizationsDatatableProps {
  data: Organization[];
  progressPending: boolean;
  refetch: () => void;
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
      subHeaderComponent={
        <Button onClick={() => props.refetch()}>
          <IoReload />
        </Button>
      }
      noDataComponent={<div>No existen organizaciones </div>}
      onRowClicked={(organization) =>
        router.push(ShowOrganizationPath(String(organization.id)))
      }
    />
  );
};

export default ShowOrganizationsDatatable;
