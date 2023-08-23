import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";

import {
  Box,
  FormLabel,
  Input,
  Button,
  useToast,
  Select,
  Checkbox,
} from "@chakra-ui/react";
import { useShowUser } from "../hooks/use-show-user.hook";
import { useFormik } from "formik";
import {
  Role,
  useEditUserMutation,
  useRolesListLazyQuery,
  useRolesListQuery,
} from "@/gql/generated";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditUserView = () => {
  const toast = useToast();
  const router = useRouter();
  const { userId } = router.query;

  const { user, error, loading } = useShowUser(userId as string);

  const [rolesList, setRolesList] = useState<Role[]>([]);

  const { loading: rolesLoader } = useRolesListQuery({
    onCompleted: (data) => {
      setRolesList(data.roles as Role[]);
    },
  });

  const [editUser, { loading: editLoading }] = useEditUserMutation({
    onCompleted: () => {
      toast({
        title: "Usuario actualizado correctamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.back();
    },
    onError: (error) => {
      toast({
        title: "Error al actualizar el usuario",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user?.name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      roles: user?.roles?.map((role) => role.id) || [],
    },
    onSubmit: async (values) => {
      await editUser({
        variables: {
          updateUserId: user!.id,
          data: {
            ...values,
          },
        },
      });
    },
  });

  if (error) {
    return (
      <Box m={4}>
        {error.graphQLErrors.map((error, index) => (
          <pre key={index}>{error.message}</pre>
        ))}
      </Box>
    );
  }

  if (loading) {
    return <ProgressLoaderComponent />;
  }

  return (
    <IntroAnimationComponent data={user}>
      <form onSubmit={form.handleSubmit}>
        <Box m={4}>
          <FormLabel mt={2} htmlFor="name">
            Nombre
          </FormLabel>
          <Input
            type="text"
            name="name"
            placeholder="Nombre"
            defaultValue={form.values.name}
            onChange={form.handleChange}
          />

          {form.errors.name && form.touched.name ? (
            <Box color="red">{form.errors.name}</Box>
          ) : null}

          <FormLabel mt={2} htmlFor="last_name">
            Apellido
          </FormLabel>
          <Input
            type="text"
            name="last_name"
            placeholder="Apellido"
            defaultValue={form.values.last_name}
            onChange={form.handleChange}
          />

          {form.errors.last_name && form.touched.last_name ? (
            <Box color="red">{form.errors.last_name}</Box>
          ) : null}

          <FormLabel mt={2} htmlFor="email">
            Email
          </FormLabel>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={form.values.email}
            onChange={form.handleChange}
          />

          {form.errors.email && form.touched.email ? (
            <Box color="red">{form.errors.email}</Box>
          ) : null}
        </Box>

        <Box m={4}>
          <FormLabel mt={2} htmlFor="roles">
            Roles
          </FormLabel>

          {rolesList.map((role) => (
            <Checkbox
              key={role.id}
              value={role.id}
              mr={4}
              isChecked={form.values.roles.includes(role.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  form.setFieldValue("roles", [...form.values.roles, role.id]);
                } else {
                  form.setFieldValue(
                    "roles",
                    form.values.roles.filter((id) => id !== role.id)
                  );
                }
              }}
            >
              {role.name}
            </Checkbox>
          ))}
        </Box>

        <Box m={4} display="flex" justifyContent="flex-end">
          <Button type="submit" isLoading={editLoading}>
            Guardar
          </Button>
          <Button ml={4} colorScheme="red" onClick={() => router.back()}>
            Cancelar
          </Button>
        </Box>
      </form>
    </IntroAnimationComponent>
  );
};

export default EditUserView;
