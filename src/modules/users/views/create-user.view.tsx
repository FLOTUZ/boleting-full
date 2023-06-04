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
} from "@chakra-ui/react";
import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import { UsersPath } from "@/routes";
import { useRouter } from "next/router";

const CreateUserView = () => {
  const router = useRouter();
  const [roleList, setRoleList] = useState<Role[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);

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
      // router.replace(UsersPath);
      toast({
        title: `Usuario ${data.createUser?.name} creado`,
        position: "bottom-right",
        description: "El usuario se ha creado correctamente",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
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
      console.error(error);
    },
  });

  const formCreate = useFormik({
    initialValues: {
      name: "",
      last_name: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(selectedRoles);
      await createUser({
        variables: {
          data: {
            name: values.name,
            last_name: values.last_name,
            email: values.email,
            password: values.password,
            roles: selectedRoles,
          },
        },
      });
    },
  });

  return (
    <DesktopLayoutComponent title={"Create user"}>
      <Box p={6} rounded="md">
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
              <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={2}>
                {roleList.map((role) => (
                  <Box key={role.id}>
                    <Checkbox
                      value={role.id}
                      size={"lg"}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRoles([...selectedRoles, role.id]);
                        } else {
                          setSelectedRoles(
                            selectedRoles.filter((id) => id !== role.id)
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

            <Button type="submit" w="full" isLoading={createUserLoading}>
              Create User
            </Button>
          </VStack>
        </form>
      </Box>
    </DesktopLayoutComponent>
  );
};

export default CreateUserView;
