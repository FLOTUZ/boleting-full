import { useFormik } from "formik";
import {
  Spacer,
  Button,
  FormLabel,
  HStack,
  Input,
  Box,
  Textarea,
} from "@chakra-ui/react";

const CreateCategoryView = () => {
  const formCreateCategory = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Box m={4} p={4}>
      <form onSubmit={formCreateCategory.handleSubmit}>
        <Box>
          <FormLabel htmlFor="name">Nombre:</FormLabel>
          <Input
            required
            name="name"
            variant={"filled"}
            maxLength={50}
            isRequired={true}
            placeholder="Musica Electronica"
            onChange={formCreateCategory.handleChange}
            value={formCreateCategory.values.name}
          />

          <FormLabel htmlFor="description">Detalles de la categoria:</FormLabel>
          <Textarea
            name="description"
            variant={"filled"}
            maxLength={255}
            placeholder="Descripcion"
            onChange={formCreateCategory.handleChange}
            value={formCreateCategory.values.description!}
          />
        </Box>

        <HStack mt={4}>
          <Spacer />
          <Button type="submit">Enviar</Button>
        </HStack>
      </form>
    </Box>
  );
};

export default CreateCategoryView;
