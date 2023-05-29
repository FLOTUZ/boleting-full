import {
  RoleEntity,
  useCreateUserMutation,
  useRolesListQuery,
} from "@/gql/generated";
import { useState } from "react";
import { useFormik } from "formik";
import DesktopLayoutComponent from "@/components/layouts/desktop-layout-component/desktop-layout.component";
import {
  Flex,
  Box,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,  
  useToast,
  Select,
} from "@chakra-ui/react";

const CreateUserView = () => {
  const [roleList, setRoleList] = useState<RoleEntity[]>([]);
  const toast = useToast();
  const { loading: roleListLoading } = useRolesListQuery({
    onCompleted(data) {
      setRoleList(data.roles as RoleEntity[]);
    },
    onError(error) {
      console.log(error.message);
    },
  });
  const [createUser, { loading: createUserLoading }] = useCreateUserMutation({
    onCompleted(data) {
      toast({
        title: `Usuario ${data.createUser.name} creado`,
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
      roleId: 0,
    },
    onSubmit: async (values) => {
      console.log(JSON.stringify(values));
      await createUser({
        variables: {
          name: values.name,
          last_name: values.last_name,
          email: values.email,
          password: values.password,
          roleId: Number(values.roleId),
        },
      });
    },
  });

  return (
    <DesktopLayoutComponent title={"Create user"}>
      <Flex align="center" justify="center">
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
                <FormLabel htmlFor="roleId">
                  Selecciona tu rol
                  <Select
                    id="roleId"
                    isRequired
                    placeholder="Selecciona tu rol"
                    variant="filled"
                    onChange={formCreate.handleChange}
                    value={formCreate.values.roleId}
                  >
                    {roleList.map((rol, index) => {
                      return (
                        <option value={rol.id} key={index}>
                          {rol.name}
                        </option>
                      );
                    })}
                  </Select>
                </FormLabel>
              </FormControl>

              <Button type="submit" w="full" isLoading={createUserLoading}>
                Create User
              </Button>
            </VStack>
          </form>
        </Box>
      </Flex>
    </DesktopLayoutComponent>
  );
};

export default CreateUserView;
