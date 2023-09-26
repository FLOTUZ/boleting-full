import { EventCategory } from "@/gql/generated";
import { ShowCategoryPath } from "@/routes";
import { useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import DataTable, { TableColumn } from "react-data-table-component";

interface ShowCategoriesDatatableProps {
  data: EventCategory[];
  progressPending: boolean;
}

const ShowCategoriesDatatable = (props: ShowCategoriesDatatableProps) => {
  const router = useRouter();
  const { colorMode } = useColorMode();

  const columns: TableColumn<EventCategory>[] = [
    {
      name: "ID",
      selector: (row) => row.id!,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.name!,
      sortable: true,
    },
    {
      name: "Descripción",
      selector: (row) => row.description || "Sin descripción",
      sortable: true,
    },
    {
      name: "Subcategorías",
      selector: (row) => row.event_sub_categories_count!,
      sortable: true,
      center: true,
    },
    {
      name: "Eventos",
      selector: (row) => row.events_count!,
      sortable: true,
      center: true,
    },
    {
      name: "Creado",
      selector: (row) => new Date(row.createdAt).toLocaleString(),
      sortable: true,
    },
    {
      name: "Actualizado",
      selector: (row) => new Date(row.updatedAt).toLocaleString(),
      sortable: true,
    },
  ];

  return (
    <DataTable
      {...props}
      columns={columns}
      theme={colorMode === "light" ? "light" : "dark"}
      title={`Categorias`}
      progressComponent={<div>Cargando Categorias...</div>}
      pointerOnHover
      persistTableHead
      highlightOnHover
      subHeader
      pagination
      noDataComponent={<div>No existen categorias </div>}
      onRowClicked={(category) =>
        router.push(ShowCategoryPath(String(category.id)))
      }
    />
  );
};

export default ShowCategoriesDatatable;
