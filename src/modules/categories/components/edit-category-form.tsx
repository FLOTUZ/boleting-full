import { useFormik } from "formik";
import {
  Box,
  Checkbox,
  FormLabel,
  Input,
  Text,
  Textarea,
  Button,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const EditCategoryForm = () => {
  const subCategories = [
    {
      id: 1,
      is_active: true,
      name: "Conciertos",
    },
    {
      id: 2,
      is_active: false,
      name: "Festivales",
    },
  ];

  const [selected, setSelected] = useState<number[]>([]);

  const handleChange = (value: number, isChecked: boolean) => {
    if (isChecked) {
      setSelected([...selected, value]);
    } else {
      setSelected(selected.filter((item) => item !== value));
    }
  };

  const form = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: "",
      description: "",
      substates: selected,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <form onSubmit={form.handleSubmit}>
      <FormLabel htmlFor="name">Nombre de la categoría:</FormLabel>
      <Input
        name="name"
        type="text"
        onChange={form.handleChange}
        defaultValue={"newJeans"}
      />
      {form.errors.name && form.touched.name && (
        <Text color="red">{form.errors.name}</Text>
      )}

      <FormLabel htmlFor="description">Descripción de la categoría:</FormLabel>
      <Textarea
        name="description"
        onChange={form.handleChange}
        defaultValue={"Concierto de K-pop"}
      />
      {form.errors.description && form.touched.description && (
        <Text color="red">{form.errors.description}</Text>
      )}

      <FormLabel htmlFor="substates">Sub Categorías:</FormLabel>
      <Box p={4}>
        {subCategories.map((subCategory, index) => (
          <Checkbox
            key={index}
            ps={2}
            value={subCategory.id!}
            isChecked={selected.includes(subCategory.id!)}
            onChange={(event) =>
              handleChange(parseInt(event.target.value), event.target.checked)
            }
          >
            {subCategory.name}
          </Checkbox>
        ))}
      </Box>
      {form.errors.substates && form.touched.substates && (
        <Text color="red">{form.errors.substates}</Text>
      )}

      <HStack mt={4} mb={6}>
        <Spacer />
        <Button type="submit" onClick={form.submitForm}>
          Actualizar
        </Button>
      </HStack>
    </form>
  );
};

export default EditCategoryForm;
