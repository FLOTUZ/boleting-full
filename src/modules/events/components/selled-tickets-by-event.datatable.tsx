import { Ticket } from "@/gql/generated";
import { Button, useColorMode } from "@chakra-ui/react";
import DataTable, { TableColumn } from "react-data-table-component";
import { TbReload } from "react-icons/tb";

interface TicketsDatatable {
  columns: TableColumn<Ticket>[];
  data: Ticket[];
  progressPending: boolean;
  refetch: () => void;
}

const SelledTicketsByEventDatatable = (props: TicketsDatatable) => {
  const { colorMode } = useColorMode();

  return (
    <DataTable
      {...props}
      theme={colorMode === "light" ? "light" : "dark"}
      title="Tickets vendidos"
      progressComponent={<div>Cargando entradas...</div>}
      selectableRows
      pointerOnHover
      persistTableHead
      highlightOnHover
      pagination
      subHeader
      subHeaderComponent={
        <Button onClick={() => props.refetch()}>
          <TbReload />
        </Button>
      }
      noDataComponent={<div>Aún no hay tickets vendidos</div>}
      onRowClicked={(e) => console.log(e)}
    />
  );
};

export default SelledTicketsByEventDatatable;
