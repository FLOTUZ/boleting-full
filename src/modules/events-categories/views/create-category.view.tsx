import { useFormik } from "formik";
import {
  Box,
  FormLabel,
  Input,
  Textarea,
  HStack,
  Spacer,
  Button,
} from "@chakra-ui/react";

const CreateCategoryView = () => {
  const eventCategory = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <>
      <Box m={4} p={4} rounded="md">
        <form onSubmit={eventCategory.handleSubmit}>
          <Box>
            <FormLabel htmlFor="name">Nombre:</FormLabel>
            <Input
              required
              id="name"
              name="name"
              variant={"filled"}
              maxLength={50}
              isRequired={true}
              placeholder="Nombre"
              onChange={eventCategory.handleChange}
              value={eventCategory.values.name}
            />

            <FormLabel htmlFor="description">
              Detalles de la categoria:
            </FormLabel>
            <Textarea
              name="description"
              variant={"filled"}
              maxLength={255}
              placeholder="Descripcion"
              onChange={eventCategory.handleChange}
              value={eventCategory.values.description}
            />
          </Box>

          <HStack mt={4}>
            <Spacer />
            <Button type="submit">Enviar</Button>
            <Button colorScheme="red">Reset</Button>
          </HStack>
        </form>
      </Box>
    </>
  );
};

export default CreateCategoryView;
