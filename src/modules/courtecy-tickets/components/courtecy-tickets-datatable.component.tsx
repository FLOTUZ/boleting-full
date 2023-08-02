import { Ticket } from "@/gql/generated";
import { useColorMode } from "@chakra-ui/react";
import moment from "moment";
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
      name: "Nota",
      selector: (row) => row.note,
      sortable: true,
    },
    {
      name: "Tipo de acceso",
      selector: (row) => row.access_type?.name,
      sortable: true,
    },
    {
      name: "Tipo de dueño",
      selector: (row) => row.ticket_type?.name,
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => (row.is_used ? "Usado" : "No usado"),
      sortable: true,
    },
    {
      name: "Precio",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Cargo por servicio",
      selector: (row) => row.service_charge,
      sortable: true,
    },
    {
      name: "Fecha de creación",
      selector: (row) => moment(row.createdAt).format("DD/MM/YYYY HH:mm:ss"),
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
