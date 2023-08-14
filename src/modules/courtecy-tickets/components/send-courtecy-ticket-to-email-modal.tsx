import { SendCourtesyTicketToEmailValidator } from "@/validations";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormLabel,
  Textarea,
  Input,
  ModalFooter,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { BsMailbox2 } from "react-icons/bs";
import { IoSend } from "react-icons/io5";

const SendCourtecyTicketToEmailModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const form = useFormik({
    validationSchema: SendCourtesyTicketToEmailValidator,
    initialValues: {
      note: "",
      email: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <Button onClick={onOpen}>
        <BsMailbox2 size={20} />
        <Box ml={2}> Enviar por correo</Box>
      </Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enviar cortesía por correo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box m={4}>
              <FormLabel mt={4} htmlFor="email">
                Email
              </FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="mail@ejemplo.com"
                value={form.values.email}
                onChange={form.handleChange}
              />

              {form.errors.email && form.touched.email && (
                <Text color="red">{form.errors.email}</Text>
              )}

              <FormLabel htmlFor="note">Nota (Opcional)</FormLabel>
              <Textarea
                name="note"
                placeholder="Escribe una nota"
                value={form.values.note}
                onChange={form.handleChange}
              />

              {form.errors.note && form.touched.note && (
                <Text color="red">{form.errors.note}</Text>
              )}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              colorScheme="green"
              isLoading={form.isSubmitting}
              onClick={() => form.submitForm()}
            >
              <Box mr={2}>Enviar</Box>
              <IoSend size={20} />
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SendCourtecyTicketToEmailModal;
