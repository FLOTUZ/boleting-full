import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import {
  Ability,
  useCreateRoleMutation,
  useShowAbilitiesLazyQuery,
} from "@/gql/generated";
import {
  Box,
  Button,
  Center,
  Checkbox,
  FormLabel,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AbilityBadge from "../components/ability-badge";

const CreateRoleView = () => {
  const router = useRouter();
  const toast = useToast();
  const [abilitiesList, setAbilitiesList] = useState<Ability[]>([]);

  const [getAbilities, { loading, error }] = useShowAbilitiesLazyQuery({
    onCompleted: (data) => {
      setAbilitiesList(data.abilitys as Ability[]);
    },
  });

  const [createRole, { loading: createRoleLoading, error: createRoleError }] =
    useCreateRoleMutation({
      onCompleted: (data) => {
        toast({
          title: "Rol creado",
          description: "El rol se ha creado correctamente",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        router.back();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.graphQLErrors.map((e) => e.message).join(", "),
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      },
    });

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      description: "",
      abilities: [] as number[],
    },
    onSubmit: async (data) => {
      data.abilities = data.abilities.map((ability) => Number(ability));
      createRole({ variables: { data } });
    },
  });

  useEffect(() => {
    getAbilities();
  }, [getAbilities]);

  if (loading) {
    return <ProgressLoaderComponent />;
  }

  if (error) {
    return (
      <Box>
        {error.graphQLErrors.map(({ message }, i) => (
          <span key={i}>{message}</span>
        ))}
      </Box>
    );
  }

  return (
    <IntroAnimationComponent data={true}>
      <Center m={4}>
        <form onSubmit={form.handleSubmit}>
          <FormLabel htmlFor="name">Nombre:</FormLabel>
          <Input
            name="name"
            placeholder="Nombre"
            onChange={form.handleChange}
          />

          {form.errors.name && form.touched.name ? (
            <Text>{form.errors.name}</Text>
          ) : null}

          <FormLabel htmlFor="description">Descripción:</FormLabel>
          <Textarea
            name="description"
            placeholder="Descripción"
            onChange={form.handleChange}
          />

          {form.errors.description && form.touched.description ? (
            <Text>{form.errors.description}</Text>
          ) : null}

          <FormLabel htmlFor="abilities">Habilidades:</FormLabel>
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
            {abilitiesList.map((ability) => (
              <Checkbox
                key={ability.id}
                name="abilities"
                value={ability.id}
                onChange={(e) => {
                  form.handleChange(e);
                }}
              >
                <AbilityBadge ability={ability} />
              </Checkbox>
            ))}
          </SimpleGrid>

          <Button type="submit" w={"100%"} mt={4} isLoading={createRoleLoading}>
            Crear
          </Button>
        </form>
      </Center>
    </IntroAnimationComponent>
  );
};

export default CreateRoleView;
