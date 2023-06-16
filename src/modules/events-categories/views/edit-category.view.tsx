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

const EditCategoryView = () => {
  const eventCategoryEdit = useFormik({
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
        <form onSubmit={eventCategoryEdit.handleSubmit}>
          <Box>
            <FormLabel htmlFor="name">Subcategoria</FormLabel>
            <Input
              required
              id="name"
              name="name"
              variant={"filled"}
              maxLength={50}
              isRequired={true}
              placeholder="Nombre"
              onChange={eventCategoryEdit.handleChange}
              value={eventCategoryEdit.values.name}
            />

            <FormLabel htmlFor="description">
              Descripcion de la Subcategoria:
            </FormLabel>
            <Textarea
              name="description"
              variant={"filled"}
              maxLength={255}
              placeholder="Descripcion"
              onChange={eventCategoryEdit.handleChange}
              value={eventCategoryEdit.values.description}
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

export default EditCategoryView;
