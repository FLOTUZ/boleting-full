import { useFormik } from "formik";
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

const CreateCategoryView = () => {
  const eventCategory = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Box>
      <Box p={6} rounded="md">
        <form onSubmit={eventCategory.handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl isRequired>
              <FormLabel htmlFor="name">Nombre de la categoria:</FormLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Nombre"
                variant="filled"
                value={eventCategory.values.name}
                onChange={eventCategory.handleChange}
              ></Input>
            </FormControl>
            <Button type="submit">Enviar</Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default CreateCategoryView;
