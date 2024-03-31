import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormLabel,
  HStack,
  Input,
  Switch,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { CreateAccessTypeValidatorForm } from "@/validations";
import { useRouter } from "next/router";
import {
  CreateAccessTypeInput,
  useCreateAccessTypeMutation,
} from "@/gql/generated";

const CreateAccessTypeView = () => {
  const router = useRouter();
  const toast = useToast();
  const { id: eventId } = router.query;

  const [createAccessType, { loading }] = useCreateAccessTypeMutation({
    onCompleted: (data) => {
      toast({
        title: "Tipo de acceso creado",
        description: `El tipo de acceso ${data.createAccessType.name} se creó correctamente`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.back();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Ocurrió un error al crear el tipo de acceso",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const form = useFormik({
    validationSchema: CreateAccessTypeValidatorForm,
    enableReinitialize: true,
    initialValues: {
      name: "",
      description: "",
      price: 0,
      available_tickets_count: 0,
      enter_and_exit_option: false,
      eventId: Number(eventId),
    },
    onSubmit: async (values: CreateAccessTypeInput) => {
      await createAccessType({
        variables: {
          data: {
            ...values,
          },
        },
      });
    },
  });

  return (
    <IntroAnimationComponent data={true}>
      <Box m={4}>
        <form onSubmit={form.handleSubmit}>
          <FormLabel htmlFor="name">Nombre</FormLabel>
          <Input
            name="name"
            type="text"
            placeholder="Nombre del tipo de acceso"
            onChange={form.handleChange}
            value={form.values.name}
          />
          {form.errors.name && form.touched.name && (
            <Text color={"red"}>{form.errors.name}</Text>
          )}

          <FormLabel htmlFor="description" mt={4}>
            Descripción
          </FormLabel>
          <Textarea
            name="description"
            placeholder="Agrega una descripción"
            onChange={form.handleChange}
            value={form.values.description || ""}
          />

          {form.errors.description && form.touched.description && (
            <Text color={"red"}>{form.errors.description}</Text>
          )}

          <FormLabel htmlFor="price" mt={4}>
            Precio
          </FormLabel>
          <Input
            name="price"
            type="number"
            step="0.01"
            onChange={form.handleChange}
            value={form.values.price}
          />
          {form.errors.price && form.touched.price && (
            <Text color={"red"}>{String(form.errors.price)}</Text>
          )}

          <FormLabel htmlFor="available_tickets_count" mt={4}>
            Cantidad de tickets disponibles
          </FormLabel>

          <Input
            name="available_tickets_count"
            type="number"
            onChange={form.handleChange}
            value={form.values.available_tickets_count || 0}
          />

          <FormLabel htmlFor="enter_and_exit_option" mt={4}>
            Admite entrada y salida
          </FormLabel>
          <Switch
            name="enter_and_exit_option"
            size={"lg"}
            onChange={form.handleChange}
            isChecked={form.values.enter_and_exit_option || false}
            checked={form.values.enter_and_exit_option || false}
          />

          {form.errors.enter_and_exit_option &&
            form.touched.enter_and_exit_option && (
              <Text color={"red"}>{form.errors.enter_and_exit_option}</Text>
            )}

          <HStack w={"100%"} mt={4}>
            <Button type="submit" colorScheme="teal" isLoading={loading}>
              Crear
            </Button>

            <Button colorScheme={"red"} onClick={() => router.back()}>
              Cancelar
            </Button>
          </HStack>
        </form>
      </Box>
    </IntroAnimationComponent>
  );
};

export default CreateAccessTypeView;
