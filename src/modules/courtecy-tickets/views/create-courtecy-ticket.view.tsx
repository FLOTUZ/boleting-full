import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import {
  AccessType,
  useCourtesyAccessTypesByEventLazyQuery,
  useCreateCourtecyMutation,
} from "@/gql/generated";
import { ShowCourtecyTicketPath } from "@/routes";
import { CreateCourtesyTicketValidator } from "@/validations";
import {
  Box,
  Button,
  FormLabel,
  Heading,
  Select,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CreateCourtecyTicketView = () => {
  const router = useRouter();
  const toast = useToast();

  const { id: eventId } = router.query;
  const [accessTypesList, setAccessTypesList] = useState<AccessType[]>();

  const [
    GET_ACCESS_TYPES,
    { loading: loadingAccessTypes, error: errorAccessTypes },
  ] = useCourtesyAccessTypesByEventLazyQuery({
    variables: { eventId: Number(eventId) },
    onCompleted(data) {
      setAccessTypesList(data.courtesyAccessTypes as AccessType[]);
    },
  });

  const [createCourtesy, { loading, error }] = useCreateCourtecyMutation({
    onCompleted(data) {
      toast({
        title: "Boleto de cortesía creado",
        description: "El boleto de cortesía ha sido creado exitosamente",
        status: "success",
      });
      router.replace(
        ShowCourtecyTicketPath(
          String(eventId),
          String(data.createCourtesyTicket?.id)
        )
      );
    },
    onError(error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al crear el boleto de cortesía",
        status: "error",
      });
    },
  });

  const courtesyForm = useFormik({
    enableReinitialize: true,
    validationSchema: CreateCourtesyTicketValidator,
    initialValues: {
      note: "",
      eventId: Number(eventId),
      access_typeId: 0,
    },
    onSubmit: async (values) => {
      if (values.access_typeId == 0) {
        courtesyForm.errors.access_typeId =
          "Debes seleccionar un tipo de acceso";
      }

      values.access_typeId = Number(values.access_typeId);
      await createCourtesy({
        variables: {
          data: { ...values },
        },
      });
    },
  });

  useEffect(() => {
    if (eventId) {
      GET_ACCESS_TYPES();
    }
  }, [eventId, GET_ACCESS_TYPES]);

  if (loading || loadingAccessTypes) {
    return <ProgressLoaderComponent />;
  }

  if (error || errorAccessTypes) {
    return <div>{error?.message || errorAccessTypes?.message}</div>;
  }

  return (
    <IntroAnimationComponent data={accessTypesList}>
      <Box m={4}>
        <Heading size={"sm"}>
          Aqui podrás crear boletos de cortesía para tus patrocinadores
        </Heading>
        <form onSubmit={courtesyForm.handleSubmit}>
          <FormLabel mt={4} htmlFor="note">
            Nota
          </FormLabel>
          <Textarea
            name="note"
            placeholder={"Nota"}
            value={courtesyForm.values.note}
            onChange={courtesyForm.handleChange}
          />
          {courtesyForm.errors.note && courtesyForm.touched.note && (
            <Text color={"red"}>{courtesyForm.errors.note}</Text>
          )}

          <FormLabel mt={4} htmlFor="access_typeId">
            Tipo de acceso
          </FormLabel>
          <Select
            name="access_typeId"
            placeholder={"Tipo de acceso"}
            value={courtesyForm.values.access_typeId}
            onChange={courtesyForm.handleChange}
          >
            {accessTypesList?.map((accessType, index) => (
              <option key={index} value={accessType.id}>
                {accessType.name}
              </option>
            ))}
          </Select>
          {courtesyForm.errors.access_typeId &&
            courtesyForm.touched.access_typeId && (
              <Text color={"red"}>{courtesyForm.errors.access_typeId}</Text>
            )}

          <Box mt={4}>
            <Button type="submit" isLoading={loading}>
              Guardar
            </Button>
          </Box>
        </form>
      </Box>
    </IntroAnimationComponent>
  );
};

export default CreateCourtecyTicketView;
