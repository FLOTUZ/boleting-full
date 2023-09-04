import moment from "moment";
import { User } from "@/gql/generated";
import { ShowUserPath } from "@/routes";
import { useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import DataTable, { TableColumn } from "react-data-table-component";

interface UsersByRoledatatableProps {
  data: User[];
  progressPending: boolean;
}

const UsersByRoleDatatable = (props: UsersByRoledatatableProps) => {
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
      name: "Apellido",
      selector: (row) => row.last_name!,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email!,
      sortable: true,
    },
    {
      name: "Roles",
      selector: (row) => row.roles!.map((role) => role.name).join(", "),
      sortable: true,
    },
    {
      name: "Creación",
      selector: (row) => moment(row.createdAt).format("DD/MM/YYYY HH:mm"),
      sortable: true,
    },
    {
      name: "Ultima actualización",
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
      noHeader
      progressComponent={<div>Cargando usuarios...</div>}
      pointerOnHover
      persistTableHead
      highlightOnHover
      subHeader
      pagination
      noDataComponent={<div>No existen usuarios </div>}
      onRowClicked={(user) => router.push(ShowUserPath(String(user.id)))}
    />
  );
};

export default UsersByRoleDatatable;
