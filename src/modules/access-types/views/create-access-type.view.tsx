import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormLabel,
  HStack,
  Input,
  Spacer,
  Switch,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { CreateAccessTypeValidatorForm } from "@/validations";
import { useRouter } from "next/router";

const CreateAccessTypeView = () => {
  const router = useRouter();
  const { id } = router.query;

  const form = useFormik({
    validationSchema: CreateAccessTypeValidatorForm,
    enableReinitialize: true,
    initialValues: {
      name: "",
      description: "",
      price: 0,
      enter_and_exit_option: false,
      eventId: id,
    },
    onSubmit: (values) => {
      console.log(values);
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
          />
          {form.errors.name && form.touched.name && (
            <Text color={"red"}>{form.errors.name}</Text>
          )}

          <FormLabel htmlFor="description">Descripción</FormLabel>
          <Textarea
            name="description"
            placeholder="Agrega una descripción"
            onChange={form.handleChange}
          />

          {form.errors.description && form.touched.description && (
            <Text color={"red"}>{form.errors.description}</Text>
          )}

          <FormLabel htmlFor="price">Precio</FormLabel>
          <Input
            name="price"
            type="number"
            step="0.01"
            onChange={form.handleChange}
          />

          {form.errors.price && form.touched.price && (
            <Text color={"red"}>{form.errors.price}</Text>
          )}

          <FormLabel htmlFor="enter_and_exit_option">
            Admite entrada y salida
          </FormLabel>
          <Switch
            name="enter_and_exit_option"
            size={"lg"}
            onChange={form.handleChange}
            isChecked={form.values.enter_and_exit_option}
          />

          {form.errors.enter_and_exit_option &&
            form.touched.enter_and_exit_option && (
              <Text color={"red"}>{form.errors.enter_and_exit_option}</Text>
            )}

          <HStack w={"100%"}>
            <Spacer />
            <Button type="submit" mt={4} colorScheme="teal">
              Crear
            </Button>
            <Button mt={4} colorScheme={"red"} ml={4}>
              Cancelar
            </Button>
          </HStack>
        </form>
      </Box>
    </IntroAnimationComponent>
  );
};

export default CreateAccessTypeView;
