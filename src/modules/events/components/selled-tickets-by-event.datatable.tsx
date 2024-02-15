import { Ticket } from "@/gql/generated";
import { Button, useColorMode } from "@chakra-ui/react";
import DataTable, { TableColumn } from "react-data-table-component";
import { IoReload } from "react-icons/io5";
interface TicketsDatatable {
  data: Ticket[];
  progressPending: boolean;
  refetch: () => void;
}

const SelledTicketsByEventDatatable = (props: TicketsDatatable) => {
  const { colorMode } = useColorMode();

  const columns: TableColumn<Ticket>[] = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Serial",
      selector: (row) => row.serial_number,
      sortable: true,
    },
    {
      name: "Fecha de venta",
      selector: (row) => row.createdAt,
      sortable: true,
    },
    {
      name: "Usado",
      selector: (row) => (row.is_used ? "Si" : "No"),
    },
  ];

  return (
    <DataTable
      {...props}
      columns={columns}
      theme={colorMode === "light" ? "light" : "dark"}
      title={`Tickets vendidos`}
      progressComponent={<div>Cargando entradas...</div>}
      selectableRows
      pointerOnHover
      persistTableHead
      highlightOnHover
      pagination
      subHeader
      subHeaderComponent={
        <Button onClick={() => props.refetch()}>
          <IoReload />
        </Button>
      }
      noDataComponent={<div>Aún no hay tickets vendidos</div>}
      onRowClicked={(e) => console.log(e)}
    />
  );
};

export default SelledTicketsByEventDatatable;
