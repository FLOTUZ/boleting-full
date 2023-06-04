import {
  EventCategory,
  EventSubCategory,
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
  Checkbox,
  Skeleton,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

const CreateEventView = () => {
  const toast = useToast();
  const [eventCategories, setEventCategories] = useState<EventCategory[]>([]);
  const [eventSubCategories, setEventSubCategories] = useState<
    EventSubCategory[]
  >([]);

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<number[]>(
    []
  );

  const { loading: loadingEventCategoriesList } = useEventCategoriesQuery({
    onError(error) {
      console.log(error);
    },
    onCompleted(data) {
      setEventCategories(data.eventCategories as EventCategory[]);
    },
  });

  const [createEvent, { loading }] = useCreateEventMutation();
  const formCreateEvent = useFormik({
    initialValues: {
      name: "",
      description: "",
      event_location: "",
      event_location_url: "",
      start_date: "",
      end_date: "",
      start_time: "",
      end_time: "",
      re_entry: false,
      event_logo_url: "",
      event_banner_url: "",
    },
    async onSubmit(values: any) {
      console.log({
        selectedSubCategories,
      });
      await createEvent({
        variables: {
          input: {
            ...values,
            sub_categories: selectedSubCategories,
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
      <Box m={4} p={4}>
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

            <FormLabel htmlFor="event_categories">Categorias:</FormLabel>
            <Skeleton isLoaded={!loadingEventCategoriesList}>
              <Box p={4}>
                {eventCategories.map((category, index) => (
                  <Checkbox
                    key={index}
                    value={category.id!}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCategories([
                          ...selectedCategories,
                          category.id!,
                        ]);

                        // Add sub categories of the category
                        setEventSubCategories([
                          ...eventSubCategories,
                          ...(category.sub_categories! as EventSubCategory[]),
                        ]);
                      } else {
                        setSelectedCategories(
                          selectedCategories.filter(
                            (selectedCategory) =>
                              selectedCategory !== category.id!
                          )
                        );

                        // Remove sub categories of the category
                        setEventSubCategories(
                          eventSubCategories.filter(
                            (subCategory) =>
                              subCategory.parent_event_categoryId !==
                              category.id!
                          )
                        );

                        // Remove selected sub categories of the category
                        setSelectedSubCategories(
                          selectedSubCategories.filter(
                            (selectedSubCategory) =>
                              selectedSubCategory !== category.id!
                          )
                        );
                      }
                    }}
                  >
                    {category.name}
                  </Checkbox>
                ))}
              </Box>
            </Skeleton>

            <FormLabel htmlFor="event_sub_categories">
              Sub categorias:
            </FormLabel>
            <Skeleton isLoaded={!loadingEventCategoriesList}>
              <Box p={4}>
                {eventSubCategories.map((subCategory, index) => (
                  <Checkbox
                    key={index}
                    value={subCategory.id!}
                    isChecked={selectedSubCategories.includes(
                      Number(subCategory.id!)
                    )}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedSubCategories([
                          ...selectedSubCategories,
                          Number(subCategory.id!),
                        ]);
                      } else {
                        setSelectedSubCategories(
                          selectedSubCategories.filter(
                            (selectedSubCategory) =>
                              selectedSubCategory !== Number(subCategory.id!)
                          )
                        );
                      }
                    }}
                  >
                    {subCategory.name}
                  </Checkbox>
                ))}
              </Box>
            </Skeleton>

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
                <FormLabel htmlFor="date">Fecha de inicio:</FormLabel>
                <Input
                  required
                  name="start_date"
                  type="date"
                  variant={"filled"}
                  onChange={(e) => {
                    formCreateEvent.setFieldValue(
                      "start_date",
                      new Date(e.target.value).toISOString()
                    );
                  }}
                />

                <Box w={"100%"}>
                  <FormLabel htmlFor="end_date">Fecha de cierre:</FormLabel>
                  <Input
                    required
                    name="end_date"
                    type="date"
                    variant={"filled"}
                    onChange={(e) => {
                      formCreateEvent.setFieldValue(
                        "end_date",
                        new Date(e.target.value).toISOString()
                      );
                    }}
                  />
                </Box>
              </Box>

              <Box w={"100%"}>
                <FormLabel htmlFor="start_time">Hora de inicio:</FormLabel>
                <Input
                  name="start_time"
                  type="time"
                  variant={"filled"}
                  onChange={formCreateEvent.handleChange}
                  value={formCreateEvent.values.start_time}
                />
              </Box>

              <Box w={"100%"}>
                <FormLabel htmlFor="end_time">Hora de finalizacion:</FormLabel>
                <Input
                  name="end_time"
                  type="time"
                  variant={"filled"}
                  onChange={formCreateEvent.handleChange}
                  value={formCreateEvent.values.end_time}
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
      </Box>
    </>
  );
};

export default CreateEventView;
