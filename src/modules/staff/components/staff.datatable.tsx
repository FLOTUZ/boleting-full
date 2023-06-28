import { User } from "@/gql/generated";
import { ShowEventStaffPath } from "@/routes";
import { useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import DataTable, { TableColumn } from "react-data-table-component";

interface EventStaffDatatableProps {
  data: User[];
  loader: boolean;
}

const EventStaffDatatable = ({ data, loader }: EventStaffDatatableProps) => {
  const router = useRouter();
  const { id, staffId } = router.query;

  const { colorMode } = useColorMode();
  const columns: TableColumn<User>[] = [
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
      name: "Rol",
      selector: (row) => {
        const role = row.roles?.map((role) => role.name).join(", ");
        return role ? role : "Sin rol";
      },
    },
  ];
  return (
    <DataTable
      title="Staff de tu evento"
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
      onRowClicked={(user) =>
        router.push(ShowEventStaffPath(Number(id), Number(staffId)))
      }
    />
  );
};

export default EventStaffDatatable;
