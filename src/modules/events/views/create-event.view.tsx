import {
  EventCategory,
  useCreateEventMutation,
  useEventCategoriesQuery,
} from "@/gql/generated";
import {
  Spacer,
  Button,
  FormLabel,
  HStack,
  Input,
  Card,
  Box,
  Textarea,
  SimpleGrid,
  Switch,
  Select,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";

const CreateEventView = () => {
  const toast = useToast();
  const [eventCategories, setEventcategories] = useState<EventCategory[]>([]);

  const { loading: loadingEventCategories } = useEventCategoriesQuery({
    onCompleted(data) {
      setEventcategories(data.eventCategories as EventCategory[]);
    },
  });

  const [createEvent, { loading }] = useCreateEventMutation();
  const formCreateEvent = useFormik({
    initialValues: {
      name: "",
      description: "",
      event_location: "",
      event_location_url: "",
      date: "",
      start_time: "",
      end_time: "",
      re_entry: false,
      event_logo_url: "",
      event_banner_url: "",
      event_categories: [1],
    },
    async onSubmit(values: any) {
      await createEvent({
        variables: {
          input: {
            ...values,
          },
        },
        onCompleted() {
          toast({
            title: "Evento guardado",
            description: "El evento se guardó con exito",
            status: "success",
            duration: 8000,
          });
        },
        onError(error) {
          toast({
            title: "Error",
            description: error.message,
            status: "error",
            duration: 8000,
          });
        },
      });
    },
  });

  return (
    <>
      <Card m={4} p={4}>
        <form onSubmit={formCreateEvent.handleSubmit}>
          <Box>
            <FormLabel htmlFor="name">Nombre:</FormLabel>
            <Input
              required
              name="name"
              variant={"filled"}
              maxLength={50}
              isRequired={true}
              placeholder="Ej: EDC Mexico 2024"
              onChange={formCreateEvent.handleChange}
              value={formCreateEvent.values.name}
            />

            <FormLabel htmlFor="description">Detalles del evento:</FormLabel>
            <Textarea
              name="description"
              variant={"filled"}
              maxLength={255}
              placeholder="Ej: Musica electronica, 3 dias de festival, etc."
              onChange={formCreateEvent.handleChange}
              value={formCreateEvent.values.description!}
            />

            <FormLabel htmlFor="event_location">Ubicacion evento:</FormLabel>
            <Input
              required
              name="event_location"
              variant={"filled"}
              maxLength={255}
              placeholder="Ej: Autodromo Hermanos Rodriguez"
              onChange={formCreateEvent.handleChange}
              value={formCreateEvent.values.event_location}
            />

            <FormLabel htmlFor="event_location_url">
              Event location URL:
            </FormLabel>
            <Input
              required
              name="event_location_url"
              variant={"filled"}
              maxLength={255}
              placeholder="Ej: https://www.google.com/maps/..."
              onChange={formCreateEvent.handleChange}
              value={formCreateEvent.values.event_location_url}
            />

            <SimpleGrid columns={[1, 2, 3]} spacing={4} w={"100%"}>
              <Box w={"100%"}>
                <FormLabel htmlFor="date">Fecha del evento:</FormLabel>
                <Input
                  required
                  name="date"
                  type="date"
                  variant={"filled"}
                  onChange={(e) => {
                    formCreateEvent.setFieldValue(
                      "date",
                      new Date(e.target.value).toISOString()
                    );
                  }}
                />
              </Box>

              <Box w={"100%"}>
                <FormLabel htmlFor="start_time">Hora de inicio:</FormLabel>
                <Input
                  name="start_time"
                  type="time"
                  variant={"filled"}
                  onChange={(e) =>
                    // Format time to iso string
                    formCreateEvent.setFieldValue(
                      "start_time",
                      new Date(e.target.value).toISOString()
                    )
                  }
                />
              </Box>

              <Box w={"100%"}>
                <FormLabel htmlFor="end_time">Hora de finalizacion:</FormLabel>
                <Input
                  name="end_time"
                  type="time"
                  variant={"filled"}
                  onChange={(e) =>
                    formCreateEvent.setFieldValue(
                      "end_time",
                      new Date(e.target.value).toISOString()
                    )
                  }
                />
              </Box>
            </SimpleGrid>

            <FormLabel htmlFor="re_entry">Admitir reentrada:</FormLabel>
            <Switch
              required
              size={"lg"}
              name="re_entry"
              variant={"filled"}
              onChange={() => formCreateEvent.setFieldValue("re_entry", true)}
            />

            <FormLabel htmlFor="event_logo_url">Logo del evento:</FormLabel>
            <Input
              name="event_logo_url"
              type="file"
              accept="image/gif, image/jpeg, image/png"
              variant={"filled"}
              maxLength={255}
              onChange={formCreateEvent.handleChange}
              value={formCreateEvent.values.event_logo_url!}
            />

            <FormLabel htmlFor="event_banner_url">Banner del evento:</FormLabel>
            <Input
              name="event_banner_url"
              type="file"
              accept="image/gif, image/jpeg, image/png"
              variant={"filled"}
              maxLength={255}
              onChange={formCreateEvent.handleChange}
              value={formCreateEvent.values.event_banner_url!}
            />
          </Box>

          <HStack mt={4}>
            <Spacer />
            <Button type="submit" isLoading={loading}>
              Enviar
            </Button>
            <Button colorScheme="red">Reset</Button>
          </HStack>
        </form>
      </Card>
    </>
  );
};

export default CreateEventView;
