import { Ticket } from "@/gql/generated";
import { useColorMode } from "@chakra-ui/react";
import DataTable, { TableColumn } from "react-data-table-component";

interface CourtecyTicketsDatatableProps {
  data: Ticket[];
  loader: boolean;
}

const CourtecyTicketsDatatable = (props: CourtecyTicketsDatatableProps) => {
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
      name: "Fecha de creación",
      selector: (row) => row.createdAt,
      sortable: true,
    },
    {
      name: "Tipo de ticket",
      selector: (row) => row.ticket_type?.name,
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => (row.is_used ? "Usado" : "No usado"),
      sortable: true,
    },
    {
      name: "Nota",
      selector: (row) => row.note,
      sortable: true,
    },
  ];

  return (
    <DataTable
      {...props}
      columns={columns}
      theme={colorMode === "light" ? "light" : "dark"}
      title={`Tickets de cortesía`}
      progressComponent={<div>Cargando tickets de cortesía...</div>}
      pointerOnHover
      persistTableHead
      highlightOnHover
      pagination
      subHeader
      noDataComponent={<div>Aún no hay tickets de cortesía</div>}
      onRowClicked={(e) => console.log(e)}
    />
  );
};

export default CourtecyTicketsDatatable;
