import DataTable, { TableColumn } from "react-data-table-component";
import { User } from "@/gql/generated";
import { useRouter } from "next/router";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";

import { AiFillEdit } from "react-icons/ai";
import { IoPersonRemove } from "react-icons/io5";
import { useCallback, useEffect, useMemo, useState } from "react";

interface EventStaffDatatableProps {
  data: User[];
  loader: boolean;
}

const EventStaffDatatable = ({ data, loader }: EventStaffDatatableProps) => {
  const { colorMode } = useColorMode();

  const router = useRouter();
  const { id, staffId } = router.query;

  const [staff, setStaff] = useState<User[]>([]);

  const [selectedRows, setSelectedRows] = useState<User[]>([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const contextActions = useMemo(() => {
    return (
      <Button colorScheme="red" onClick={onOpen}>
        <IoPersonRemove /> Desasignar
      </Button>
    );
  }, [onOpen]);

  const handleRowSelected = useCallback(
    (state: {
      allSelected: boolean;
      selectedCount: number;
      selectedRows: User[];
    }) => {
      setSelectedRows(state.selectedRows);
    },
    []
  );

  const handleDelete = () => {
    setStaff((prev) => prev.filter((staff) => !selectedRows.includes(staff)));
    setSelectedRows([]);
    setToggleCleared(!toggleCleared);
    onClose();
  };

  useEffect(() => {
    if (data) {
      setStaff(data);
    }
  }, [data]);

  return (
    <Box>
      <DataTable
        title="Staff de tu evento"
        columns={columns}
        data={staff}
        theme={colorMode === "light" ? "light" : "dark"}
        progressPending={loader}
        progressComponent={<div>Loading...</div>}
        pointerOnHover
        persistTableHead
        highlightOnHover
        pagination
        subHeader
        selectableRows
        contextActions={contextActions}
        onSelectedRowsChange={(state) => handleRowSelected(state)}
        clearSelectedRows={toggleCleared}
        expandableRows
        expandOnRowClicked
        expandableRowsComponent={(row) => (
          <Box m={8}>
            <Avatar name={`${row.data.name} ${row.data.last_name}`} />

            <Text fontWeight="bold" fontSize="lg">
              {row.data.name} {row.data.last_name}
            </Text>
            <Text>
              {row.data?.roles?.map((role) => role.name).join(", ") ||
                "Sin rol"}
            </Text>
            <HStack mt={4}>
              <Tooltip label="Editar">
                <Button onClick={() => console.log(row.data)}>
                  <AiFillEdit />
                </Button>
              </Tooltip>
              <Tooltip label="Quitar del evento">
                <Button colorScheme="red" onClick={() => console.log(row.data)}>
                  <IoPersonRemove />
                </Button>
              </Tooltip>
            </HStack>
          </Box>
        )}
        noDataComponent={<div>No hay datos</div>}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>¿Estas seguro?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Confirma que deseas desasignar a los siguientes usuarios:
            <ul>
              {selectedRows.map((row) => (
                <li key={row.id}>
                  {row.name} {row.last_name}
                </li>
              ))}
            </ul>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="ghost" onClick={handleDelete}>
              Desasignar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EventStaffDatatable;
