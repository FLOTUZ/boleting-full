import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import {
  CreateEventInput,
  Event,
  EventCategory,
  EventSubCategory,
  useCreateEventMutation,
  useEventCategoriesQuery,
} from "@/gql/generated";
import { CreateEventValidator } from "@/validations";
import {
  Spacer,
  Button,
  FormLabel,
  HStack,
  Input,
  Box,
  Textarea,
  SimpleGrid,
  Switch,
  Text,
  useToast,
  Checkbox,
} from "@chakra-ui/react";
import { Field, FieldArray, FormikProvider, useFormik } from "formik";
import { useState } from "react";

const CreateEventView = () => {
  const toast = useToast();
  const [eventCategories, setEventCategories] = useState<EventCategory[]>([]);
  const [eventSubCategories, setEventSubCategories] = useState<
    EventSubCategory[]
  >([]);

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const { loading: loadingEventCategoriesList } = useEventCategoriesQuery({
    onError(error) {
      console.log(error);
    },
    onCompleted(data) {
      setEventCategories(data.eventCategories as EventCategory[]);
    },
  });

  const [createEvent, { loading }] = useCreateEventMutation();
  const form = useFormik({
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
      sub_categories: eventSubCategories.map(
        (subCategory) => subCategory.id!
      ) as number[],
    },
    validationSchema: CreateEventValidator,
    async onSubmit(values: CreateEventInput) {
      values.start_date = new Date(values.start_date).toISOString();
      values.end_date = new Date(values.end_date).toISOString();

      console.log(values);
      // await createEvent({
      //   variables: {
      //     input: {
      //       ...values,
      //     },
      //   },
      //   onCompleted() {
      //     toast({
      //       title: "Evento guardado",
      //       description: "El evento se guardó con exito",
      //       status: "success",
      //       duration: 8000,
      //     });
      //   },
      //   onError(error) {
      //     toast({
      //       title: "Error",
      //       description: error.message,
      //       status: "error",
      //       duration: 8000,
      //     });
      //   },
      // });
    },
  });

  if (loadingEventCategoriesList) {
    return <ProgressLoaderComponent />;
  }

  return (
    <IntroAnimationComponent data={eventCategories}>
      <Box m={4} p={4}>
        <FormikProvider value={form}>
          <form onSubmit={form.handleSubmit}>
            <Box>
              <FormLabel htmlFor="name">Nombre:</FormLabel>
              <Input
                name="name"
                variant={"filled"}
                placeholder="Ej: EDC Mexico 2024"
                onChange={form.handleChange}
                value={form.values.name}
              />
              {form.errors.name && form.touched.name && (
                <Text color={"red"}>{form.errors.name}</Text>
              )}

              <FormLabel htmlFor="description">Detalles del evento:</FormLabel>
              <Textarea
                name="description"
                variant={"filled"}
                placeholder="Ej: Musica electronica, 3 dias de festival, etc."
                onChange={form.handleChange}
                value={form.values.description!}
              />
              {form.errors.description && form.touched.description && (
                <Text color={"red"}>{form.errors.description}</Text>
              )}

              <FormLabel htmlFor="event_categories">Categorias:</FormLabel>

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
                      }
                    }}
                  >
                    {category.name}
                  </Checkbox>
                ))}
              </Box>

              <FormLabel htmlFor="event_sub_categories">
                Sub categorias:
              </FormLabel>

              {eventSubCategories.length == 0 ? (
                <Box p={2} bgColor={"brand.semiTransparentContainer"}>
                  <Text>
                    Para ver las subcategorias, selecciona una categoria
                  </Text>
                </Box>
              ) : (
                <Box p={4}>
                  {eventSubCategories.map((subCategory, index) => (
                    <Checkbox
                      key={index}
                      value={subCategory.id!}
                      isChecked={form.values.sub_categories!.includes(
                        subCategory.id!
                      )}
                      onChange={(e) => {
                        if (e.target.checked) {
                          form.setFieldValue("sub_categories", [
                            ...form.values.sub_categories!,
                            subCategory.id!,
                          ]);
                        } else {
                          form.setFieldValue(
                            "sub_categories",
                            form.values.sub_categories!.filter(
                              (subCategoryId) =>
                                subCategoryId !== subCategory.id!
                            )
                          );
                        }
                      }}
                    >
                      {subCategory.name}
                    </Checkbox>
                  ))}
                </Box>
              )}

              {form.errors.sub_categories && form.touched.sub_categories && (
                <Text color={"red"}>{form.errors.sub_categories}</Text>
              )}

              <FormLabel htmlFor="event_location">Ubicacion evento:</FormLabel>
              <Input
                name="event_location"
                variant={"filled"}
                placeholder="Ej: Autodromo Hermanos Rodriguez"
                onChange={form.handleChange}
                value={form.values.event_location}
              />

              {form.errors.event_location && form.touched.event_location && (
                <Text color={"red"}>{form.errors.event_location}</Text>
              )}

              <FormLabel htmlFor="event_location_url">
                Event location URL:
              </FormLabel>
              <Input
                name="event_location_url"
                variant={"filled"}
                placeholder="Ej: https://www.google.com/maps/..."
                onChange={form.handleChange}
                value={form.values.event_location_url}
              />

              {form.errors.event_location_url &&
                form.touched.event_location_url && (
                  <Text color={"red"}>{form.errors.event_location_url}</Text>
                )}

              <SimpleGrid columns={[1, 2, 3]} spacing={4} w={"100%"}>
                <Box w={"100%"}>
                  <FormLabel htmlFor="date">Fecha de inicio:</FormLabel>
                  <Input
                    name="start_date"
                    type="date"
                    variant={"filled"}
                    onChange={form.handleChange}
                  />
                  {form.errors.start_date && form.touched.start_date && (
                    <Text color={"red"}>
                      {form.errors.start_date.toString()}
                    </Text>
                  )}

                  <Box w={"100%"}>
                    <FormLabel htmlFor="end_date">Fecha de cierre:</FormLabel>
                    <Input
                      name="end_date"
                      type="date"
                      variant={"filled"}
                      onChange={form.handleChange}
                    />
                    {form.errors.end_date && form.touched.end_date && (
                      <Text color={"red"}>
                        {form.errors.end_date.toString()}
                      </Text>
                    )}
                  </Box>
                </Box>

                <Box w={"100%"}>
                  <FormLabel htmlFor="start_time">Hora de inicio:</FormLabel>
                  <Input
                    name="start_time"
                    type="time"
                    variant={"filled"}
                    onChange={form.handleChange}
                    value={form.values.start_time}
                  />

                  {form.errors.start_time && form.touched.start_time && (
                    <Text color={"red"}>{form.errors.start_time}</Text>
                  )}
                </Box>

                <Box w={"100%"}>
                  <FormLabel htmlFor="end_time">
                    Hora de finalizacion:
                  </FormLabel>
                  <Input
                    name="end_time"
                    type="time"
                    variant={"filled"}
                    onChange={form.handleChange}
                    value={form.values.end_time}
                  />

                  {form.errors.end_time && form.touched.end_time && (
                    <Text color={"red"}>{form.errors.end_time}</Text>
                  )}
                </Box>
              </SimpleGrid>

              <FormLabel htmlFor="re_entry">Admitir reentrada:</FormLabel>
              <Switch
                size={"lg"}
                name="re_entry"
                variant={"filled"}
                onChange={() => form.setFieldValue("re_entry", true)}
              />

              {form.errors.re_entry && form.touched.re_entry && (
                <Text color={"red"}>{form.errors.re_entry.toString()}</Text>
              )}

              <FormLabel htmlFor="event_logo_url">Logo del evento:</FormLabel>
              <Input
                name="event_logo_url"
                type="file"
                accept="image/gif, image/jpeg, image/png"
                variant={"filled"}
                maxLength={255}
                onChange={form.handleChange}
                value={form.values.event_logo_url!}
              />
              {form.errors.event_logo_url && form.touched.event_logo_url && (
                <Text color={"red"}>{form.errors.event_logo_url}</Text>
              )}

              <FormLabel htmlFor="event_banner_url">
                Banner del evento:
              </FormLabel>
              <Input
                name="event_banner_url"
                type="file"
                accept="image/gif, image/jpeg, image/png"
                variant={"filled"}
                maxLength={255}
                onChange={form.handleChange}
                value={form.values.event_banner_url!}
              />
              {form.errors.event_banner_url &&
                form.touched.event_banner_url && (
                  <Text color={"red"}>{form.errors.event_banner_url}</Text>
                )}
            </Box>

            <HStack mt={4}>
              <Spacer />
              <Button type="submit" isLoading={loading}>
                Enviar
              </Button>
            </HStack>
          </form>
        </FormikProvider>
      </Box>
    </IntroAnimationComponent>
  );
};

export default CreateEventView;
