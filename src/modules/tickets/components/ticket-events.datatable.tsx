import { Event } from "@/gql/generated";
import { CreateEventPath } from "@/routes";
import { Button, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import DataTable, { TableColumn } from "react-data-table-component";
import { CgAddR } from "react-icons/cg";

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
  const { colorMode } = useColorMode();
  const router = useRouter();
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
      onRowClicked={(e) => console.log(e)}
    />
  );
};

export default TicketEventsDatatable;
