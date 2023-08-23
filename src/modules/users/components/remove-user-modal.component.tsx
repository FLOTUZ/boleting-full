import { useRouter } from "next/router";
import { useRemoveUserMutation } from "@/gql/generated";

import { RiDeleteBin4Fill } from "react-icons/ri";

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

interface RemoveUserModalComponentProps {
  userId: number;
}
const RemoveUserModalComponent = ({
  userId,
}: RemoveUserModalComponentProps) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [removeUser, { loading }] = useRemoveUserMutation({
    variables: { deleteUserId: userId },
    onCompleted() {
      onClose();
      router.back();
    },
  });
  return (
    <>
      <Button ml={4} colorScheme="red" onClick={onOpen}>
        Eliminar <RiDeleteBin4Fill size={20} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Seguro que deseas eliminar?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>El usuario sera eliminado permanentemente</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="ghost"
              isLoading={loading}
              onClick={() => removeUser()}
            >
              Si, eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RemoveUserModalComponent;
