import { User } from "@/gql/generated";
import { Button, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

interface SelectStaffForEventProps {
  data: User[];
  loader: boolean;
}

const SelectEventStaffDatatable = ({
  data,
  loader,
}: SelectStaffForEventProps) => {
  const router = useRouter();
  const { id, staffId } = router.query;
  const [selectedRows, setselectedRows] = useState<User[]>([]);

  const { colorMode } = useColorMode();
  const columns: TableColumn<User>[] = [
    {
      name: "Nombre",
      selector: (row) => row.name!,
      sortable: true,
    },
    {
      name: "Apellido",
      selector: (row) => row.last_name!,
      sortable: true,
    },
    {
      name: "Rol",
      selector: (row) => {
        const role = row.roles?.map((role) => role.name).join(", ");
        return role ? role : "Sin rol";
      },
    },
  ];

  const handleRowSelected = useCallback(
    (state: {
      allSelected: boolean;
      selectedCount: number;
      selectedRows: User[];
    }) => {
      setselectedRows(state.selectedRows);
    },
    []
  );

  const contextActions = useMemo(() => {
    const getSelectedRows = () => {
      console.log(selectedRows);
    };

    return (
      <Button key="select-button" onClick={getSelectedRows} colorScheme="green">
        Seleccionar
      </Button>
    );
  }, [selectedRows]);
  return (
    <DataTable
      title="Staff de tu organización"
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
      contextActions={contextActions}
      onSelectedRowsChange={(e) => handleRowSelected(e)}
    />
  );
};

export default SelectEventStaffDatatable;
