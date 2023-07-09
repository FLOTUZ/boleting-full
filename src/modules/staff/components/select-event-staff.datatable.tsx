import { User, useAssignManyStaffMutation } from "@/gql/generated";
import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { IoPersonAdd } from "react-icons/io5";

interface SelectStaffForEventProps {
  data: User[];
  loader: boolean;
  refetch: () => void;
}

const SelectEventStaffDatatable = ({
  data,
  loader,
  refetch,
}: SelectStaffForEventProps) => {
  const router = useRouter();
  const toast = useToast();
  const { id } = router.query;

  const [selectedRows, setselectedRows] = useState<User[]>([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const [
    assignManyStaf,
    { data: dataAssignmanyStaff, loading: loadingAssignManyStaff },
  ] = useAssignManyStaffMutation({
    variables: {
      eventId: Number(id),
      userIds: selectedRows.map((row) => row.id),
    },
    onCompleted() {
      toast({
        title: "Staff asignado",
        description: "El staff ha sido asignado correctamente",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setselectedRows([]);
      setToggleCleared(!toggleCleared);
      onClose();
      refetch();
      router.back();
    },
    onError(error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setselectedRows([]);
      setToggleCleared(!toggleCleared);
      onClose();
    },
  });

  const contextActions = useMemo(() => {
    return (
      <Button key="select-button" onClick={onOpen} colorScheme="green">
        <IoPersonAdd /> Asignar staff
      </Button>
    );
  }, [onOpen]);

  return (
    <>
      <DataTable
        title="Usuarios de tu organización"
        columns={columns}
        data={data}
        theme={colorMode === "light" ? "light" : "dark"}
        progressPending={loader}
        progressComponent={<div>Loading...</div>}
        clearSelectedRows={toggleCleared}
        selectableRows
        pointerOnHover
        persistTableHead
        highlightOnHover
        pagination
        subHeader
        subHeaderComponent={null}
        noDataComponent={<div>No existen usuarios disponibles</div>}
        contextActions={contextActions}
        onSelectedRowsChange={(state) => setselectedRows(state.selectedRows)}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirma tu asignación</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Confirma que deseas asignar a los siguientes usuarios:
            <Center>
              <ul>
                {selectedRows.map((row) => (
                  <li key={row.id}>
                    {row.name} {row.last_name}
                  </li>
                ))}
              </ul>
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme="green"
              isLoading={loadingAssignManyStaff}
              onClick={() => assignManyStaf()}
            >
              Aceptar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SelectEventStaffDatatable;
