import { Event } from "@/gql/generated";
import { UpdateEventSchema } from "@/validations";
import { useFormik } from "formik";
import { FormLabel, Input, Text } from "@chakra-ui/react";

interface EditEventForm {
  event: Event;
}
const EditEventForm = ({ event }: EditEventForm) => {
  const formEvent = useFormik({
    validationSchema: UpdateEventSchema,
    enableReinitialize: true,
    initialValues: {
      name: event?.name,
      description: event?.description,
      start_date: event?.start_date,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <form onSubmit={formEvent.handleSubmit}>
      <FormLabel htmlFor="name">Nombre del evento:</FormLabel>

      <Input
        name="name"
        placeholder="Nombre"
        value={formEvent.values.name!}
        onChange={formEvent.handleChange}
      />
      {formEvent.errors.name && formEvent.touched.name ? (
        <Text>{formEvent.errors.name}</Text>
      ) : null}
    </form>
  );
};

export default EditEventForm;
