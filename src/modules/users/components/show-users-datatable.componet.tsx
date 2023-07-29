import moment from "moment";
import { User } from "@/gql/generated";
import { ShowUserPath } from "@/routes";
import { useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import DataTable, { TableColumn } from "react-data-table-component";

interface ShowUsersDatatableProps {
  data: User[];
  progressPending: boolean;
}

const ShowUsersDatatable = (props: ShowUsersDatatableProps) => {
  const router = useRouter();
  const { colorMode } = useColorMode();

  const columns: TableColumn<User>[] = [
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
      selector: (row) => moment(row.createdAt).format("DD/MM/YYYY HH:mm"),
      sortable: true,
    },
    {
      name: "Actualización",
      selector: (row) =>
        row.updatedAt
          ? moment(row.updatedAt).format("DD/MM/YYYY HH:mm")
          : "No se ha actualizado",
      sortable: true,
    },
  ];

  return (
    <DataTable
      {...props}
      columns={columns}
      theme={colorMode === "light" ? "light" : "dark"}
      title={`Usuarios`}
      progressComponent={<div>Cargando usuarios...</div>}
      pointerOnHover
      persistTableHead
      highlightOnHover
      subHeader
      noDataComponent={<div>No existen usuarios </div>}
      onRowClicked={(user) => router.push(ShowUserPath(String(user.id)))}
    />
  );
};

export default ShowUsersDatatable;
