import { Event } from "@/gql/generated";
import { ShowEventPath } from "@/routes";
import { useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import DataTable, { TableColumn } from "react-data-table-component";

interface TicketEventsDatatableProps {
  columns: TableColumn<Event>[];
  data: Event[];
  loader: boolean;
}

const TicketEventsDatatable = ({
  loader,
  columns,
  data,
}: TicketEventsDatatableProps) => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  return (
    <DataTable
      title="Eventos"
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
      onRowClicked={(event) => router.push(ShowEventPath(String(event.id)))}
    />
  );
};

export default TicketEventsDatatable;
