import { useFormik } from "formik";
import {
  Checkbox,
  FormLabel,
  Input,
  Text,
  Textarea,
  Button,
  HStack,
  Spacer,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  EventCategory,
  EventSubCategory,
  useEditEventCategoryLazyQuery,
  useModifyEventCategoryMutation,
} from "@/gql/generated";
import { useRouter } from "next/router";
import { UpdateEventCategoryValidator } from "@/validations";

const EditCategoryForm = () => {
  const toast = useToast();
  const router = useRouter();
  const { categoryId } = router.query;

  const [eventCategory, setEventCategory] = useState<EventCategory>();
  const [subCategories, setSubCategories] = useState<EventSubCategory[]>([]);

  const [GET_CATEGORY, { loading: categoryLoading, error: categoryError }] =
    useEditEventCategoryLazyQuery({
      variables: {
        eventCategoryId: Number(categoryId),
      },
      onCompleted: (data) => {
        setEventCategory(data.eventCategory as EventCategory);
        setSubCategories(data.eventSubCategories as EventSubCategory[]);
      },
    });

  const [UPDATE_CATEGORY, { loading: updateLoading, error: updateError }] =
    useModifyEventCategoryMutation({});

  const form = useFormik({
    enableReinitialize: true,
    validationSchema: UpdateEventCategoryValidator,
    initialValues: {
      name: eventCategory?.name,
      description: eventCategory?.description || "",
      sub_categories: eventCategory?.sub_categories?.map(
        (subCategory) => subCategory.id
      ),
    },
    onSubmit: (values) => {
      UPDATE_CATEGORY({
        variables: {
          updateEventCategoryId: Number(categoryId),
          data: { ...values },
        },
        onCompleted(data) {
          router.back();
          toast({
            title: "Categoría actualizada",
            description: "La categoría ha sido actualizada exitosamente.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        },
      });
    },
  });

  useEffect(() => {
    GET_CATEGORY();
  }, [GET_CATEGORY]);

  return (
    <form onSubmit={form.handleSubmit}>
      <FormLabel htmlFor="name">Nombre de la categoría:</FormLabel>
      <Input
        name="name"
        type="text"
        onChange={form.handleChange}
        defaultValue={form.values.name}
        placeholder="Nombre"
      />

      {form.errors.name && form.touched.name && (
        <Text color="red">{form.errors.name}</Text>
      )}

      <FormLabel htmlFor="description">Descripción de la categoría:</FormLabel>
      <Textarea
        name="description"
        onChange={form.handleChange}
        defaultValue={form.values.description}
        placeholder="Descripción"
      />

      {form.errors.description && form.touched.description && (
        <Text color="red">{form.errors.description}</Text>
      )}

      <FormLabel htmlFor="substates">Sub Categorías:</FormLabel>
      <SimpleGrid p={4} columns={[2, 4]}>
        {subCategories?.map((subCategory, index) => (
          <Checkbox
            key={index}
            ps={2}
            value={subCategory.id!}
            isChecked={form.values.sub_categories?.includes(subCategory.id!)}
            onChange={({ target }) => {
              form.values.sub_categories?.includes(subCategory.id!)
                ? form.setFieldValue(
                    "sub_categories",
                    form.values.sub_categories?.filter(
                      (subCategoryId) => subCategoryId !== subCategory.id!
                    )
                  )
                : form.setFieldValue(
                    "sub_categories",
                    form.values.sub_categories?.concat(subCategory.id!)
                  );
            }}
          >
            {subCategory.name}
          </Checkbox>
        ))}
      </SimpleGrid>

      {form.values.sub_categories && form.touched.sub_categories && (
        <Text color="red">{form.errors.sub_categories}</Text>
      )}

      <HStack mt={4} mb={6}>
        <Spacer />
        <Button type="submit">Actualizar</Button>
      </HStack>
    </form>
  );
};

export default EditCategoryForm;
