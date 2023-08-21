import {
  Box,
  Button,
  FormLabel,
  Input,
  Switch,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useShowAccessType } from "../hooks/use-show-access-type.hook";
import { useRouter } from "next/router";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import { useEditAccessTypeMutation } from "@/gql/generated";
import { UpdateAccessTypeValidator } from "@/validations";

const EditAccessTypeView = () => {
  const toast = useToast();
  const router = useRouter();
  const { id: eventId, accessTypeId } = router.query;

  const { accessType, loading } = useShowAccessType({ accessTypeId, eventId });

  const [editAccessType, { loading: loadingAccessType }] =
    useEditAccessTypeMutation({
      onCompleted: () => {
        router.back();
        toast({
          title: "Tipo de acceso editado",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    });

  const form = useFormik({
    enableReinitialize: true,
    validationSchema: UpdateAccessTypeValidator,
    initialValues: {
      name: accessType?.name,
      description: accessType?.description ?? "",
      price: accessType?.price ?? 0,
      enter_and_exit_option: accessType?.enter_and_exit_option ?? false,
    },
    onSubmit: async (values) => {
      await editAccessType({
        variables: {
          updateAccessTypeId: Number(accessTypeId),
          data: { ...values },
        },
      });
    },
  });

  if (loading) {
    return <ProgressLoaderComponent />;
  }
  return (
    <form onSubmit={form.handleSubmit}>
      <Box m={4}>
        <FormLabel htmlFor="name">Nombre del tipo de acceso</FormLabel>
        <Input
          name="name"
          placeholder="Nombre"
          onChange={form.handleChange}
          value={form.values.name}
        />

        {form.errors.name && form.touched.name ? (
          <Box color="red">{form.errors.name}</Box>
        ) : null}

        <FormLabel htmlFor="description" mt={4}>
          Descripción
        </FormLabel>
        <Textarea
          name="description"
          placeholder="Descripción"
          value={form.values.description}
          onChange={form.handleChange}
        />

        {form.errors.description && form.touched.description ? (
          <Box color="red">{form.errors.description}</Box>
        ) : null}

        <FormLabel htmlFor="price" mt={4}>
          Precio
        </FormLabel>
        <Input
          name="price"
          type="number"
          placeholder="Precio"
          step={0.01}
          value={Number(form.values.price)}
          onChange={form.handleChange}
        />

        <FormLabel htmlFor="re_entry" mt={4}>
          Se permite reentrada
        </FormLabel>
        <Switch
          name="re_entry"
          onChange={form.handleChange}
          isChecked={form.values.enter_and_exit_option}
        />
        {form.errors.enter_and_exit_option &&
        form.touched.enter_and_exit_option ? (
          <Box color="red">{form.errors.enter_and_exit_option}</Box>
        ) : null}

        <Box mt={4}>
          <Button colorScheme="red">Cancelar</Button>
          <Button type="submit" ml={2} isLoading={loadingAccessType}>
            Guardar
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default EditAccessTypeView;
