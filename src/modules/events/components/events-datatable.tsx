import { Button, useColorMode } from "@chakra-ui/react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Event } from "@/gql/generated";
import { CgAddR } from "react-icons/cg";
import { useRouter } from "next/router";
import { CreateEventPath } from "@/routes";

interface EventsDatatable {
  columns: TableColumn<Event>[];
  data: Event[];
  loader: boolean;
}

const EventsDatatable = ({ columns, data, loader }: EventsDatatable) => {
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
      subHeaderComponent={
        <Button onClick={() => router.push(CreateEventPath)}>
          <CgAddR />
          Crear Evento
        </Button>
      }
      noDataComponent={<div>No hay datos</div>}
      onRowClicked={(e) => console.log(e)}
    />
  );
};

export default EventsDatatable;
