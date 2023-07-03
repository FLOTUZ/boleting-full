import DataTable, { TableColumn } from "react-data-table-component";
import {
  User,
  useUnassignManyStaffMutation,
  useUnassignStaffMutation,
} from "@/gql/generated";
import { useRouter } from "next/router";
import {
  Avatar,
  Box,
  Button,
  Center,
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
  useToast,
} from "@chakra-ui/react";

import { IoPersonRemove } from "react-icons/io5";
import { useMemo, useState } from "react";

interface EventStaffDatatableProps {
  columns: TableColumn<User>[];
  data: User[];
  loader: boolean;
  refetch?: () => void;
}

const EventStaffDatatable = ({
  columns,
  data,
  loader,
  refetch,
}: EventStaffDatatableProps) => {
  const { colorMode } = useColorMode();
  const toast = useToast();

  const router = useRouter();
  const { id: eventId } = router.query;

  const [selectedRows, setSelectedRows] = useState<User[]>([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [unassignStaffMutation, { loading: unassingStaffLoader }] =
    useUnassignStaffMutation({
      onCompleted() {
        toast({
          title: "Staff desasignado",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        refetch && refetch();
      },
      onError(errors) {
        toast({
          title: "Error al desasignar staff",
          description: JSON.stringify(errors),
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    });

  const [unassignManyStaff, { loading: unassignManyStaffLoader }] =
    useUnassignManyStaffMutation({
      variables: {
        // @ts-ignore
        eventId: Number(eventId),
        // @ts-ignore
        userIds: selectedRows.map((row) => row.id),
      },
      onCompleted() {
        toast({
          title: "Staff desasignado",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        refetch && refetch();
        setToggleCleared(!toggleCleared);
        setSelectedRows([]);
        onClose();
      },
      onError(errors) {
        toast({
          title: "Error al desasignar staff",
          description: JSON.stringify(errors),
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setToggleCleared(!toggleCleared);
        setSelectedRows([]);
        onClose();
      },
    });

  const contextActions = useMemo(() => {
    return (
      <Button colorScheme="red" onClick={onOpen}>
        <IoPersonRemove /> Desasignar
      </Button>
    );
  }, [onOpen]);

  return (
    <Box>
      <DataTable
        title="Staff de tu evento"
        columns={columns}
        data={data}
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
        onSelectedRowsChange={(state) => setSelectedRows(state.selectedRows)}
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
              <Tooltip label="Quitar del evento">
                <Button
                  colorScheme="red"
                  isLoading={unassingStaffLoader}
                  onClick={() =>
                    unassignStaffMutation({
                      variables: {
                        // @ts-ignore
                        eventId: parseInt(eventId as string),
                        // @ts-ignore
                        userId: row.data.id,
                      },
                    })
                  }
                >
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
              isLoading={unassignManyStaffLoader}
              onClick={() => unassignManyStaff()}
            >
              Aceptar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EventStaffDatatable;
