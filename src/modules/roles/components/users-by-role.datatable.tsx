import moment from "moment";
import { User, useRemoveUsersFromRoleMutation } from "@/gql/generated";
import { ShowUserPath } from "@/routes";
import {
  Box,
  Button,
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
import DataTable, { TableColumn } from "react-data-table-component";
import { useCallback, useMemo, useState } from "react";

interface UsersByRoledatatableProps {
  data: User[];
  progressPending: boolean;
}

const UsersByRoleDatatable = (props: UsersByRoledatatableProps) => {
  const router = useRouter();
  const toast = useToast();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedRows, setSelectedRows] = useState<User[]>([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  const [REMOVE_ROLES, { loading: removeRolesLoading }] =
    useRemoveUsersFromRoleMutation({
      onCompleted() {
        toast({
          title: "Usuarios removidos",
          description: "Los usuarios fueron removidos con éxito",
          status: "success",
        });
      },
      onError(error) {
        toast({
          title: "Error al remover usuarios",
          description: error.graphQLErrors
            .map((error) => error.message)
            .join(", "),
          status: "error",
        });
      },
    });

  const contextActions = useMemo(() => {
    const handleDelete = async () => {
      setToggleCleared(!toggleCleared);
      await REMOVE_ROLES({
        variables: {
          roleId: Number(router.query.roleId),
          userIds: selectedRows.map((user) => Number(user.id)),
        },
      });
      onClose();
    };

    return (
      <>
        <Button
          key="delete"
          onClick={onOpen}
          colorScheme="yellow"
          isLoading={removeRolesLoading}
        >
          Quitar rol
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              Quitar rol a {selectedRows.length} usuarios
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>
                Los usuarios perderan los permisos que les fueron asignados a
                traves de este rol.
                <Box mt={4}>
                  {selectedRows.map((user) => (
                    <li key={user.id}>
                      {user.name} {user.last_name}
                    </li>
                  ))}
                </Box>
              </p>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Cerrar
              </Button>
              <Button variant="ghost" colorScheme="red" onClick={handleDelete}>
                Quitar rol
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }, [
    REMOVE_ROLES,
    isOpen,
    onClose,
    onOpen,
    removeRolesLoading,
    router.query.roleId,
    selectedRows,
    toggleCleared,
  ]);

  const columns: TableColumn<User>[] = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
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
      name: "Email",
      selector: (row) => row.email!,
      sortable: true,
    },
    {
      name: "Roles",
      selector: (row) => row.roles!.map((role) => role.name).join(", "),
      sortable: true,
    },
    {
      name: "Creación",
      selector: (row) => moment(row.createdAt).format("DD/MM/YYYY HH:mm"),
      sortable: true,
    },
    {
      name: "Ultima actualización",
      selector: (row) =>
        row.updatedAt
          ? moment(row.updatedAt).format("DD/MM/YYYY HH:mm")
          : "No se ha actualizado",
      sortable: true,
    },
  ];

  return (
    <>
      <DataTable
        {...props}
        columns={columns}
        theme={colorMode === "light" ? "light" : "dark"}
        title={`Usuarios`}
        progressComponent={<div>Cargando usuarios...</div>}
        pointerOnHover
        persistTableHead
        highlightOnHover
        subHeader
        pagination
        noDataComponent={<div>No existen usuarios </div>}
        onRowClicked={(user) => router.push(ShowUserPath(String(user.id)))}
        selectableRows
        contextActions={contextActions}
        onSelectedRowsChange={(state) => setSelectedRows(state.selectedRows)}
        clearSelectedRows={toggleCleared}
      />
    </>
  );
};

export default UsersByRoleDatatable;
