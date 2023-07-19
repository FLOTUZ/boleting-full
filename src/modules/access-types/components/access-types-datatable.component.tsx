import { AccessType } from "@/gql/generated";
import { ShowAccessTypePath } from "@/routes";
import { useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import DataTable, { TableColumn } from "react-data-table-component";

interface AccessTypeDatatableProps {
  data: AccessType[];
}

const AccessTypeDatatable = ({ data }: AccessTypeDatatableProps) => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const { id } = router.query;
  const columns: TableColumn<AccessType>[] = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Descripción",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Admite reentrada",
      selector: (row) => (row.enter_and_exit_option ? "Si" : "No"),
      sortable: true,
    },
    {
      name: "Fecha de creación",
      selector: (row) => new Date(row.createdAt).toLocaleString(),
      sortable: true,
    },
    {
      name: "Ultima actualización",
      selector: (row) => new Date(row.updatedAt).toLocaleString(),
      sortable: true,
    },
  ];

  return (
    <DataTable
      theme={colorMode === "light" ? "light" : "dark"}
      title="Tipos de acceso"
      progressComponent={<div>Cargando tipos de acceso...</div>}
      selectableRows
      pointerOnHover
      persistTableHead
      highlightOnHover
      subHeader
      noDataComponent={<div>No se han configurado tipos de acceso</div>}
      onRowClicked={(accessType) =>
        router.push(ShowAccessTypePath(Number(id), accessType.id))
      }
      columns={columns}
      data={data}
    />
  );
};

export default AccessTypeDatatable;
