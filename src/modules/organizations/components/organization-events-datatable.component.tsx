import { Event } from "@/gql/generated";
import { ShowEventPath, ShowOrganizationPath } from "@/routes";
import { useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import DataTable, { TableColumn } from "react-data-table-component";

interface ShowOrganizationEventsDatatableProps {
  data: Event[];
  progressPending: boolean;
  refetch: () => void;
}

const ShowOrganizationEventsDatatable = (
  props: ShowOrganizationEventsDatatableProps
) => {
  const router = useRouter();
  const { colorMode } = useColorMode();

  const columns: TableColumn<Event>[] = [
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
      name: "Descripción",
      selector: (row) => row.description!,
      sortable: true,
    },
    {
      name: "Lugar",
      selector: (row) => row.event_location!,
      sortable: true,
    },
    {
      name: "Fecha",
      selector: (row) => new Date(row.start_date!).toLocaleDateString(),
      sortable: true,
    },
  ];
  return (
    <DataTable
      {...props}
      columns={columns}
      theme={colorMode === "light" ? "light" : "dark"}
      title={`Eventos`}
      progressComponent={<div>Cargando entradas...</div>}
      pointerOnHover
      persistTableHead
      highlightOnHover
      subHeader
      noDataComponent={<div>No existen eventos en la organizacion </div>}
      onRowClicked={(event) => router.push(ShowEventPath(String(event.id)))}
    />
  );
};

export default ShowOrganizationEventsDatatable;
