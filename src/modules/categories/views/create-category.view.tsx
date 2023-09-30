import { useFormik } from "formik";
import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import {
  EventSubCategory,
  useCreateEventCategoryMutation,
  useCreateEventCategoryViewLazyQuery,
} from "@/gql/generated";

import {
  Spacer,
  Button,
  FormLabel,
  HStack,
  Input,
  Box,
  Textarea,
  Checkbox,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CreateEventCategoryValidator } from "@/validations";
import { error } from "console";
import { useRouter } from "next/router";
import { CategoriesPath } from "@/routes";

const CreateCategoryView = () => {
  const toast = useToast();
  const router = useRouter();

  const [subCategories, setSubCategories] = useState<EventSubCategory[]>([]);
  const [
    GET_CREATE_CATEGORY,
    { loading: loadingCreateCategory, error: errorShowCreateCategory },
  ] = useCreateEventCategoryViewLazyQuery({
    onCompleted(data) {
      setSubCategories(data.eventSubCategories as EventSubCategory[]);
    },
  });

  const [CREATE_EVENT_CATEGORY, { loading: loadingCreateEventCategory }] =
    useCreateEventCategoryMutation({
      onCompleted(data) {
        router.push(CategoriesPath);
        toast({
          title: "Categoria creada",
          description: `La categoria ${data.createEventCategory?.name} ha sido creada`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError(error) {
        toast({
          title: "Error al crear la categoria",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    });

  const form = useFormik({
    enableReinitialize: true,
    validationSchema: CreateEventCategoryValidator,
    initialValues: {
      name: "",
      description: "",
      event_sub_categories: [] as number[],
    },
    onSubmit: (values) => {
      CREATE_EVENT_CATEGORY({
        variables: {
          data: { ...values },
        },
      });
    },
  });

  useEffect(() => {
    GET_CREATE_CATEGORY();
  }, [GET_CREATE_CATEGORY]);

  if (errorShowCreateCategory) {
    return (
      <>
        {errorShowCreateCategory.graphQLErrors.map(({ message }) => (
          <Text key={message} color="red.500" fontSize="xs">
            {message}
          </Text>
        ))}
      </>
    );
  }

  return (
    <IntroAnimationComponent data={loadingCreateCategory}>
      <Box m={4}>
        <form onSubmit={form.handleSubmit}>
          <FormLabel htmlFor="name">Nombre:</FormLabel>
          <Input
            required
            name="name"
            variant={"filled"}
            maxLength={50}
            isRequired={true}
            placeholder="Musica Electronica"
            onChange={form.handleChange}
            value={form.values.name}
          />
          {form.errors.name && form.touched.name && (
            <Text color="red.500" fontSize="xs">
              {form.errors.name}
            </Text>
          )}

          <FormLabel mt={4} htmlFor="description">
            Detalles de la categoria:
          </FormLabel>
          <Textarea
            name="description"
            variant={"filled"}
            maxLength={255}
            placeholder="Descripcion"
            onChange={form.handleChange}
            value={form.values.description!}
          />
          {form.errors.description && form.touched.description && (
            <Text color="red.500" fontSize="xs">
              {form.errors.description}
            </Text>
          )}

          <FormLabel mt={4} htmlFor="subCategories">
            Subcategorias:
          </FormLabel>
          <SimpleGrid columns={[2, 3, 4]}>
            {subCategories.map((subCategory) => (
              <Checkbox
                key={subCategory.id}
                value={subCategory.id}
                onChange={({ target }) => {
                  if (target.checked) {
                    form.setFieldValue(
                      "event_sub_categories",
                      form.values.event_sub_categories.concat(
                        Number(target.value)
                      )
                    );
                  } else {
                    form.setFieldValue(
                      "event_sub_categories",
                      form.values.event_sub_categories.filter(
                        (id) => id !== Number(target.value)
                      )
                    );
                  }
                }}
              >
                {subCategory.name}
              </Checkbox>
            ))}
          </SimpleGrid>
          {form.errors.event_sub_categories &&
            form.touched.event_sub_categories && (
              <Text color="red.500" fontSize="xs">
                {form.errors.event_sub_categories}
              </Text>
            )}

          <HStack mt={4}>
            <Spacer />
            <Button type="submit" isLoading={loadingCreateEventCategory}>
              Enviar
            </Button>
          </HStack>
        </form>
      </Box>
    </IntroAnimationComponent>
  );
};

export default CreateCategoryView;
