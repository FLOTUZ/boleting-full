import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";

import { useRouter } from "next/router";
import { useShowRole } from "../hooks/use-show-role.hook";

import {
  Box,
  Button,
  Center,
  Checkbox,
  FormLabel,
  Input,
  SimpleGrid,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import AbilityBadge from "../components/ability-badge";
import {
  Ability,
  useEditRoleMutation,
  useShowAbilitiesLazyQuery,
} from "@/gql/generated";
import { useEffect, useState } from "react";

const EditRoleView = () => {
  const router = useRouter();
  const toast = useToast();

  const [abilitiesList, setAbilitiesList] = useState<Ability[]>([]);
  const { role, loading, error } = useShowRole();

  const [getHabilities] = useShowAbilitiesLazyQuery({
    onCompleted(data) {
      setAbilitiesList(data.abilitys as Ability[]);
    },
  });

  const [updateRole] = useEditRoleMutation({
    onCompleted(data) {
      toast({
        title: "Rol actualizado",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.back();
    },
    onError(error) {
      toast({
        title: "Error",
        description: error.graphQLErrors
          .map((error) => error.message)
          .join(", "),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: role?.name,
      description: role?.description,
      abilities: role?.abilities?.map((ability) => ability.id),
    },
    onSubmit: (data) => {
      updateRole({
        variables: {
          updateRoleId: role!.id,
          data,
        },
      });
    },
  });

  useEffect(() => {
    getHabilities();
  }, [getHabilities]);

  if (loading) {
    return <ProgressLoaderComponent />;
  }

  if (error) {
    return (
      <ul>
        {error.graphQLErrors.map(({ message }, index) => {
          return <li key={index}>{message}</li>;
        })}
      </ul>
    );
  }

  return (
    <IntroAnimationComponent data={true}>
      <Center m={4}>
        <form onSubmit={form.handleSubmit}>
          <FormLabel htmlFor="name">Nombre:</FormLabel>
          <Input
            id="name"
            name="name"
            type="text"
            defaultValue={form.values.name}
            onChange={form.handleChange}
          />
          {form.errors.name && form.touched.name && (
            <Box color="red">{form.errors.name}</Box>
          )}

          <FormLabel htmlFor="description">Descripción:</FormLabel>
          <Textarea
            id="description"
            name="description"
            defaultValue={form.values.description as string}
            onChange={form.handleChange}
          />

          {form.errors.description && form.touched.description && (
            <Box color="red">{form.errors.description}</Box>
          )}

          <FormLabel htmlFor="abilities" mt={4}>
            Permisos:
          </FormLabel>
          <SimpleGrid columns={[1, 2, 3]} spacing={4} m={4}>
            {abilitiesList.map((ability) => {
              return (
                <Checkbox
                  key={ability.id}
                  name={"abilities"}
                  isChecked={form.values.abilities?.includes(ability.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      form.setFieldValue("abilities", [
                        ...form.values.abilities!,
                        ability.id,
                      ]);
                    } else {
                      form.setFieldValue(
                        "abilities",
                        form.values.abilities?.filter((id) => id !== ability.id)
                      );
                    }
                  }}
                >
                  <AbilityBadge ability={ability} />
                </Checkbox>
              );
            })}
          </SimpleGrid>

          {form.errors.abilities && form.touched.abilities && (
            <Box color="red">{form.errors.abilities}</Box>
          )}

          <Button type="submit" w={"100%"}>
            Guardar
          </Button>
        </form>
      </Center>
    </IntroAnimationComponent>
  );
};

export default EditRoleView;
