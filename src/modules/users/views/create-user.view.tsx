import {
  Role,
  useCreateUserMutation,
  useRolesListQuery,
} from "@/gql/generated";
import { useState } from "react";
import { useFormik } from "formik";

import {
  Box,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Checkbox,
  SimpleGrid,
  Container,
} from "@chakra-ui/react";
import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import { UsersPath } from "@/routes";
import { useRouter } from "next/router";

const CreateUserView = () => {
  const router = useRouter();
  const [roleList, setRoleList] = useState<Role[]>([]);

  const toast = useToast();
  const { loading: roleListLoading } = useRolesListQuery({
    onCompleted(data) {
      setRoleList(data.roles as Role[]);
    },
    onError(error) {
      console.log(error.message);
    },
  });

  const [createUser, { loading: createUserLoading }] = useCreateUserMutation({
    onCompleted(data) {
      toast({
        title: `Usuario ${data.createUser?.name} creado`,
        position: "bottom-right",
        description: "El usuario se ha creado correctamente",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      router.back();
    },
    onError(error) {
      toast({
        title: "Error al crear usuario",
        position: "bottom-right",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const formCreate = useFormik({
    initialValues: {
      name: "",
      last_name: "",
      email: "",
      password: "",
      roles: [],
    },
    onSubmit: async (values) => {
      await createUser({
        variables: {
          data: { ...values },
        },
      });
    },
  });

  return (
    <Container p={6} rounded="md">
      <form onSubmit={formCreate.handleSubmit}>
        <VStack spacing={4} align="flex-start">
          <FormControl isRequired>
            <FormLabel htmlFor="name">Nombre</FormLabel>
            <Input
              id="name"
              name="name"
              type="text"
              variant="filled"
              onChange={formCreate.handleChange}
              value={formCreate.values.name}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="last_name">Apellido</FormLabel>
            <Input
              id="last_name"
              name="last_name"
              type="text"
              variant="filled"
              onChange={formCreate.handleChange}
              value={formCreate.values.last_name}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="email">Correo Electronico</FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              variant="filled"
              onChange={formCreate.handleChange}
              value={formCreate.values.email}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Contraseña</FormLabel>
            <Input
              id="password"
              name="password"
              type="password"
              variant="filled"
              onChange={formCreate.handleChange}
              value={formCreate.values.password}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="roles">Roles</FormLabel>
            <SimpleGrid columns={[1, 2]} spacing={2}>
              {roleList.map((role) => (
                <Box key={role.id}>
                  <Checkbox
                    value={role.id}
                    size={"lg"}
                    onChange={(e) => {
                      if (e.target.checked) {
                        formCreate.setFieldValue("roles", [
                          ...formCreate.values.roles,
                          role.id,
                        ]);
                      } else {
                        formCreate.setFieldValue(
                          "roles",
                          formCreate.values.roles.filter((id) => id !== role.id)
                        );
                      }
                    }}
                  >
                    {role.name}
                  </Checkbox>
                </Box>
              ))}
            </SimpleGrid>
          </FormControl>

          <Button
            type="submit"
            w="full"
            colorScheme="blue"
            isLoading={createUserLoading}
          >
            Crear
          </Button>
          <Button type="submit" w="full" onClick={() => router.back()}>
            Cancelar
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default CreateUserView;
