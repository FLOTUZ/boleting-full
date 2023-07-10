import { AccessType } from "@/gql/generated";
import { useColorMode } from "@chakra-ui/react";
import DataTable, { TableColumn } from "react-data-table-component";

interface AccessTypeDatatableProps {
  data: AccessType[];
}

const AccessTypeDatatable = ({ data }: AccessTypeDatatableProps) => {
  const { colorMode } = useColorMode();
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
      title="Tipos de ticket"
      progressComponent={<div>Cargando tipos de ticket...</div>}
      selectableRows
      pointerOnHover
      persistTableHead
      highlightOnHover
      subHeader
      noDataComponent={<div>No se han configurado tipos de ticket</div>}
      onRowClicked={(e) => console.log(e)}
      columns={columns}
      data={data}
    />
  );
};

export default AccessTypeDatatable;
