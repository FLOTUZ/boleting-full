import moment from "moment";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import {
  Event,
  EventCategory,
  EventSubCategory,
  UpdateEventInput,
  useEventCategoriesQuery,
  useUpdateEventMutation,
} from "@/gql/generated";
import { UpdateEventValidator } from "@/validations";
import { useFormik, FormikProvider } from "formik";
import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  HStack,
  Input,
  Spacer,
  Switch,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ShowEventPath } from "@/routes";

interface EditEventForm {
  event?: Event;
}

const EditEventForm = ({ event }: EditEventForm) => {
  const router = useRouter();
  const toast = useToast();

  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const [subCategories, setSubCategories] = useState<EventSubCategory[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<
    EventSubCategory[]
  >([]);

  const { loading: loadingCategoriesList } = useEventCategoriesQuery({
    onError(error) {
      console.log(error);
    },
    onCompleted(data) {
      setCategories(data.eventCategories as EventCategory[]);
    },
  });

  const [updateEvent, { loading: loadingUpdateEvent }] = useUpdateEventMutation(
    {
      fetchPolicy: "no-cache",
    }
  );

  const form = useFormik({
    validationSchema: UpdateEventValidator,
    enableReinitialize: true,
    initialValues: {
      name: event?.name,
      description: event?.description,
      event_location: event?.event_location,
      event_location_url: event?.event_location_url,
      start_date: moment(event?.start_date).format("YYYY-MM-DD"),
      end_date: moment(event?.end_date).format("YYYY-MM-DD"),
      start_time: event?.start_time,
      end_time: event?.end_time,
      re_entry: event?.re_entry,
      event_logo_url: event?.event_logo_url,
      event_banner_url: event?.event_banner_url,
      sub_categories: selectedSubCategories.map(
        (subCategory) => subCategory.id!
      ),
    },
    onSubmit: async (values: UpdateEventInput) => {
      values.start_date = moment(values.start_date).toISOString();
      values.end_date = moment(values.end_date).toISOString();

      await updateEvent({
        variables: {
          updateEventId: event!.id,
          input: {
            ...values,
          },
        },

        onCompleted(data) {
          toast({
            title: "Evento actualizado",
            description: "El evento se actualizó con exito",
            status: "success",
          });
          router.replace(ShowEventPath(event!.id.toString()));
        },

        onError(error) {
          console.log(error);
        },
      });
    },
  });

  useEffect(() => {
    if (event) {
      // Set selected categories
      setSelectedCategories(
        event.sub_categories?.map(
          (subCategory) => subCategory.parent_event_categoryId!
        ) ?? []
      );

      // Set sub categories
      setSubCategories([...(event.sub_categories as EventSubCategory[])]);

      // Set selected sub categories
      setSelectedSubCategories([
        ...(event.sub_categories as EventSubCategory[]),
      ]);
    }
  }, [event]);

  if (loadingCategoriesList) {
    return <ProgressLoaderComponent />;
  }

  return (
    <FormikProvider value={form}>
      <form onSubmit={form.handleSubmit}>
        <FormLabel htmlFor="name">Nombre del evento:</FormLabel>
        <Input
          name="name"
          type="text"
          onChange={form.handleChange}
          defaultValue={event?.name}
        />
        {form.errors.name && form.touched.name && (
          <Text color="red">{form.errors.name}</Text>
        )}

        <FormLabel htmlFor="description">Descripción del evento:</FormLabel>
        <Textarea
          name="description"
          onChange={form.handleChange}
          defaultValue={event?.description ?? ""}
        />

        {form.errors.description && form.touched.description && (
          <Text color="red">{form.errors.description}</Text>
        )}

        <FormLabel htmlFor="event_location">Lugar del evento:</FormLabel>
        <Input
          name="event_location"
          type="text"
          onChange={form.handleChange}
          defaultValue={event?.event_location ?? ""}
        />
        {form.errors.event_location && form.touched.event_location && (
          <Text color="red">{form.errors.event_location}</Text>
        )}

        <FormLabel htmlFor="categories">Categorias:</FormLabel>
        <Box p={4}>
          {categories.map((category, index) => (
            <Checkbox
              key={index}
              ps={2}
              value={category.id!}
              isChecked={selectedCategories.includes(category.id!)}
              onChange={(e) => {
                if (e.target.checked) {
                  // Check category
                  setSelectedCategories([...selectedCategories, category.id!]);

                  // Add sub categories of the category
                  setSubCategories([
                    ...subCategories,
                    ...(category.sub_categories! as EventSubCategory[]),
                  ]);
                } else {
                  // Uncheck category
                  setSelectedCategories(
                    selectedCategories.filter(
                      (selectedCategory) => selectedCategory !== category.id!
                    )
                  );

                  // Unmount sub categories where parent_event_categoryId is equal to category.id
                  setSubCategories(
                    subCategories.filter(
                      (subCategory) =>
                        subCategory.parent_event_categoryId !== category.id!
                    )
                  );
                }
              }}
            >
              {category.name}
            </Checkbox>
          ))}
        </Box>

        <FormLabel htmlFor="event_sub_categories">Sub categorias:</FormLabel>

        {event?.sub_categories?.length == 0 ? (
          <Box p={2} bgColor={"brand.semiTransparentContainer"}>
            <Text>Para ver las subcategorias, selecciona una categoria</Text>
          </Box>
        ) : (
          <Box p={4}>
            {subCategories.map((subCategory, index) => (
              <Checkbox
                key={index}
                ps={2}
                value={subCategory.id!}
                isChecked={
                  selectedSubCategories?.some(
                    (selectedSubCategory) =>
                      selectedSubCategory.id === subCategory.id!
                  ) ?? false
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    // Add sub category to selected sub categories
                    setSelectedSubCategories([
                      ...selectedSubCategories,
                      subCategory,
                    ]);
                  } else {
                    console.log("unchecked");
                    // Remove sub category from selected sub categories

                    setSelectedSubCategories(
                      selectedSubCategories.filter(
                        (selectedSubCategory) =>
                          selectedSubCategory.id !== subCategory.id!
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
          <Text color="red">{form.errors.sub_categories}</Text>
        )}

        <FormLabel htmlFor="event_location_url">
          Localizacion del evento en mapa (URL):
        </FormLabel>
        <Input
          name="event_location_url"
          type="text"
          onChange={form.handleChange}
          defaultValue={event?.event_location_url ?? ""}
        />
        {form.errors.sub_categories && form.touched.sub_categories && (
          <Text color="red">{form.errors.sub_categories}</Text>
        )}

        <FormLabel htmlFor="start_date">Fecha de inicio:</FormLabel>
        <Input
          name="start_date"
          type="date"
          w={"fit-content"}
          onChange={form.handleChange}
          defaultValue={form.values.start_date ?? ""}
        />
        {form.errors.start_date && form.touched.start_date && (
          <Text color="red">{form.errors.start_date.toString()}</Text>
        )}

        <FormLabel htmlFor="end_date">Fecha de finalización:</FormLabel>
        <Input
          name="end_date"
          type="date"
          w={"fit-content"}
          onChange={form.handleChange}
          defaultValue={form.values.end_date ?? ""}
        />
        {form.errors.end_date && form.touched.end_date && (
          <Text color="red">{form.errors.end_date.toString()}</Text>
        )}

        <FormLabel htmlFor="start_time">Hora de inicio:</FormLabel>
        <Input
          name="start_time"
          type="time"
          w={"fit-content"}
          onChange={form.handleChange}
          defaultValue={event?.start_time ?? undefined}
        />
        {form.errors.start_time && form.touched.start_time && (
          <Text color="red">{form.errors.start_time}</Text>
        )}

        <FormLabel htmlFor="end_time">Hora de finalización:</FormLabel>
        <Input
          name="end_time"
          type="time"
          w={"fit-content"}
          onChange={form.handleChange}
          defaultValue={event?.end_time ?? undefined}
        />
        {form.errors.end_time && form.touched.end_time && (
          <Text color="red">{form.errors.end_time.toString()}</Text>
        )}

        <FormLabel htmlFor="re_entry">Permitir reingreso:</FormLabel>
        <Switch
          name="re_entry"
          size={"lg"}
          isChecked={form.values.re_entry ?? false}
          onChange={form.handleChange}
        />

        {form.errors.re_entry && form.touched.re_entry && (
          <Text color="red">{form.errors.re_entry}</Text>
        )}

        <FormLabel htmlFor="event_logo_url">Logo del evento:</FormLabel>
        <Input
          name="event_logo_url"
          type="file"
          accept="image/gif, image/jpeg, image/png"
          variant={"filled"}
          maxLength={255}
          onChange={form.handleChange}
        />
        {form.errors.event_logo_url && form.touched.event_logo_url && (
          <Text color="red">{form.errors.event_logo_url}</Text>
        )}

        <FormLabel htmlFor="event_banner_url">Banner del evento:</FormLabel>
        <Input
          name="event_banner_url"
          type="file"
          onChange={form.handleChange}
        />
        {form.errors.event_banner_url && form.touched.event_banner_url && (
          <Text color="red">{form.errors.event_banner_url}</Text>
        )}

        <HStack mt={4} mb={16}>
          <Spacer />
          <Button
            type="submit"
            onClick={form.submitForm}
            isLoading={loadingUpdateEvent}
          >
            Actualizar
          </Button>
        </HStack>
      </form>
    </FormikProvider>
  );
};

export default EditEventForm;
