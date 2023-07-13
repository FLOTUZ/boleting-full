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

const CreateSubategoryView = () => {
  const formCreateSubcategory = useFormik({
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
      <form onSubmit={formCreateSubcategory.handleSubmit}>
        <Box>
          {/*TODO: Here we need to find the name and description that was given when it was created*/}
          <FormLabel htmlFor="name">Nombre de la categoria:</FormLabel>
          <Input
            required
            name="name"
            variant={"filled"}
            maxLength={50}
            isRequired={true}
            placeholder="Musica Electronica"
            onChange={formCreateSubcategory.handleChange}
            value={formCreateSubcategory.values.name}
          />

          <FormLabel htmlFor="description">Detalles de la categoria:</FormLabel>
          <Textarea
            name="description"
            variant={"filled"}
            maxLength={255}
            placeholder="Descripcion"
            onChange={formCreateSubcategory.handleChange}
            value={formCreateSubcategory.values.description!}
          />

          <FormLabel htmlFor="name">Nombre de la subcategoria:</FormLabel>
          <Input
            required
            name="name"
            variant={"filled"}
            maxLength={50}
            isRequired={true}
            placeholder="Musica Electronica"
            onChange={formCreateSubcategory.handleChange}
            value={formCreateSubcategory.values.name}
          />

          <FormLabel htmlFor="description">
            Detalles de la subcategoria:
          </FormLabel>
          <Textarea
            name="description"
            variant={"filled"}
            maxLength={255}
            placeholder="Descripcion"
            onChange={formCreateSubcategory.handleChange}
            value={formCreateSubcategory.values.description!}
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

export default CreateSubategoryView;
