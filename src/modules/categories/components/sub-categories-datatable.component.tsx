import { useRouter } from "next/router";
import DataTable, { TableColumn } from "react-data-table-component";

import { EventSubCategory } from "@/gql/generated";

import { useColorMode } from "@chakra-ui/react";

interface ShowCategoriesDatatableProps {
  data: EventSubCategory[];
  progressPending: boolean;
}

const SubCategoriesByCategoryIdDatatableComponent = (
  props: ShowCategoriesDatatableProps
) => {
  const router = useRouter();
  const { colorMode } = useColorMode();

  const columns: TableColumn<EventSubCategory>[] = [
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
      title={`Subcategorias`}
      progressComponent={<div>Cargando subcategorias...</div>}
      pointerOnHover
      persistTableHead
      highlightOnHover
      subHeader
      pagination
      noDataComponent={<div>No existen subcategorias </div>}
      onRowClicked={(subcategory) => {
        alert(JSON.stringify(subcategory));
      }}
    />
  );
};

export default SubCategoriesByCategoryIdDatatableComponent;
