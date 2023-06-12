import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import { useFormik } from "formik";
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

const addOrganization = () => {
  const formOrganization = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <DesktopLayoutComponent title={"Añadir Organizacion"}>
      <Box p={6} rounded="md">
        <form onSubmit={formOrganization.handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl isRequired>
              <FormLabel htmlFor="name">Nombre de la organización:</FormLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Nombre"
                variant="filled"
                value={formOrganization.values.name}
                onChange={formOrganization.handleChange}
              ></Input>
            </FormControl>
            <Button type="submit" w="full">
              Añadir organización
            </Button>
          </VStack>
        </form>
      </Box>
    </DesktopLayoutComponent>
  );
}

export default addOrganization;
