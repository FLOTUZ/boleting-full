import {
  CreateAccessTypeInput,
  useCreateCourtesyMutation,
} from "@/gql/generated";
import { CreateCourtesyTicketValidator } from "@/validations";
import {
  Box,
  Button,
  FormLabel,
  Heading,
  Input,
  Select,
  Switch,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";

const CreateCourtecyTicketView = () => {
  const router = useRouter();
  const { id: eventId } = router.query;

  const toast = useToast();

  const [createCourtesy, { data, loading, error }] = useCreateCourtesyMutation({
    onCompleted(data) {
      toast({
        title: "Boleto de cortesía creado",
        description: "El boleto de cortesía ha sido creado exitosamente",
        status: "success",
      });
      router.back();
    },
    onError(error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al crear el boleto de cortesía",
        status: "error",
      });
    },
  });

  const courtesyForm = useFormik({
    enableReinitialize: true,
    validationSchema: CreateCourtesyTicketValidator,
    initialValues: {
      note: "",
      price: 0,
      is_paid: false,
      eventId: Number(eventId),
      access_typeId: undefined,
      owner_typeId: undefined,
    },
    onSubmit: async (values) => {
      await createCourtesy({
        variables: {
          data: { ...values },
        },
      });
    },
  });
  return (
    <Box m={4}>
      <Heading size={"sm"}>
        Aqui podrás crear boletos de cortesía para tus patrocinadores
      </Heading>
      <form onSubmit={courtesyForm.handleSubmit}>
        <FormLabel mt={4} htmlFor="note">
          Nota
        </FormLabel>
        <Textarea
          name="note"
          placeholder={"Nota"}
          value={courtesyForm.values.note}
          onChange={courtesyForm.handleChange}
        />
        {courtesyForm.errors.note && courtesyForm.touched.note && (
          <Text color={"red"}>{courtesyForm.errors.note}</Text>
        )}

        <FormLabel mt={4} htmlFor="price">
          Precio
        </FormLabel>
        <Input
          name="price"
          placeholder={"Precio"}
          value={courtesyForm.values.price}
          onChange={courtesyForm.handleChange}
        />
        {courtesyForm.errors.price && courtesyForm.touched.price && (
          <Text color={"red"}>{courtesyForm.errors.price}</Text>
        )}

        <FormLabel mt={4} htmlFor="access_typeId">
          Tipo de acceso
        </FormLabel>
        <Select
          name="access_typeId"
          placeholder={"Tipo de acceso"}
          value={courtesyForm.values.access_typeId}
          onChange={courtesyForm.handleChange}
        >
          <option value={1}>General</option>
          <option value={2}>VIP</option>
        </Select>
        {courtesyForm.errors.access_typeId &&
          courtesyForm.touched.access_typeId && (
            <Text color={"red"}>{courtesyForm.errors.access_typeId}</Text>
          )}

        <FormLabel mt={4} htmlFor="owner_typeId">
          Tipo de dueño
        </FormLabel>
        <Select
          name="owner_typeId"
          placeholder={"Tipo de dueño"}
          value={courtesyForm.values.owner_typeId}
          onChange={courtesyForm.handleChange}
        >
          <option value={1}>Patrocinador</option>
          <option value={2}>Organizador</option>
        </Select>

        {courtesyForm.errors.owner_typeId &&
          courtesyForm.touched.owner_typeId && (
            <Text color={"red"}>{courtesyForm.errors.owner_typeId}</Text>
          )}

        <FormLabel mt={4} htmlFor="is_paid">
          Marcar como pagado
        </FormLabel>
        <Switch
          name="is_paid"
          placeholder={"Pagado"}
          checked={courtesyForm.values.is_paid}
          onChange={courtesyForm.handleChange}
        />
        {courtesyForm.errors.is_paid && courtesyForm.touched.is_paid && (
          <Text color={"red"}>{courtesyForm.errors.is_paid}</Text>
        )}

        <Box mt={4}>
          <Button type="submit" isLoading={loading}>
            Guardar
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateCourtecyTicketView;
