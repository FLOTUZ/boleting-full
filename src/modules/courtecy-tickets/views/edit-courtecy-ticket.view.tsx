import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";

import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";

import {
  AccessType,
  OwnerType,
  Ticket,
  useAccessTypesByEventLazyQuery,
  useEditTicketMutation,
  useOwnerTypeByEventLazyQuery,
  useShowCourtesyTicketLazyQuery,
} from "@/gql/generated";

import {
  Box,
  Text,
  FormLabel,
  Input,
  Textarea,
  Switch,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";
import { UpdateTicketValidator } from "@/validations";

const EditCourtecyTicketView = () => {
  const router = useRouter();
  const toast = useToast();
  const { id: eventId, courtesyId } = router.query;

  const [ticket, setTicket] = useState<Ticket>();
  const [accessTypesList, setAccessTypesList] = useState<AccessType[]>();
  const [ownerTypesList, setOwnerTypesList] = useState<OwnerType[]>();

  const [
    getOwnerTypes,
    { loading: loadingOwnerTypes, error: errorOwnerTypes },
  ] = useOwnerTypeByEventLazyQuery({
    variables: { eventId: Number(eventId) },
    onCompleted(data) {
      setOwnerTypesList(data.ownerTypeByEvent as OwnerType[]);
    },
  });
  const [
    getAccessTypes,
    { loading: loadingAccessTypes, error: errorAccessTypes },
  ] = useAccessTypesByEventLazyQuery({
    variables: { eventId: Number(eventId) },
    onCompleted(data) {
      setAccessTypesList(data.accessTypesByEventId as AccessType[]);
    },
  });

  const [getTicket, { data, error, loading }] = useShowCourtesyTicketLazyQuery({
    fetchPolicy: "cache-and-network",
    variables: { ticketId: Number(courtesyId) },
    onCompleted(data) {
      setTicket(data.ticket as Ticket);
    },
  });

  const [editTicket, { loading: loadingEditTicket }] = useEditTicketMutation({
    onCompleted(data) {
      router.back();
      toast({
        title: "Ticket editado",
        description: "El ticket ha sido editado correctamente",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError(error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const form = useFormik({
    enableReinitialize: true,
    validationSchema: UpdateTicketValidator,
    initialValues: {
      note: ticket?.note,
      price: ticket?.price,
      access_typeId: ticket?.access_typeId || 0,
      owner_typeId: ticket?.owner_typeId || 0,
      is_used: false,
    },
    onSubmit: async (values) => {
      values.access_typeId = Number(values.access_typeId);
      values.owner_typeId = Number(values.owner_typeId);
      await editTicket({
        variables: {
          updateTicketId: Number(courtesyId),
          data: values,
        },
      });
    },
  });

  useEffect(() => {
    if (eventId && courtesyId) {
      getTicket();
      getOwnerTypes();
      getAccessTypes();
    }
  }, [courtesyId, eventId, getAccessTypes, getOwnerTypes, getTicket]);

  if (loading || loadingAccessTypes || loadingOwnerTypes) {
    return <ProgressLoaderComponent />;
  }

  if (error || errorAccessTypes || errorOwnerTypes) {
    return (
      <div>
        {error?.message &&
          errorAccessTypes?.message &&
          errorOwnerTypes?.message}
      </div>
    );
  }

  return (
    <IntroAnimationComponent data={data}>
      <Box m={4}>
        <form onSubmit={form.handleSubmit}>
          <FormLabel htmlFor="note">Nota</FormLabel>
          <Textarea
            name="note"
            defaultValue={ticket?.note || ""}
            onChange={form.handleChange}
          />

          <FormLabel mt={4} htmlFor="price">
            Precio
          </FormLabel>
          <Input
            name="price"
            type="number"
            step="0.01"
            defaultValue={ticket?.price}
            onChange={form.handleChange}
          />

          <FormLabel mt={4} htmlFor="access_typeId">
            Tipo de acceso
          </FormLabel>
          <Select
            name="access_typeId"
            placeholder={"Tipo de acceso"}
            value={form.values.access_typeId}
            onChange={form.handleChange}
          >
            {accessTypesList?.map((accessType, index) => (
              <option key={index} value={Number(accessType.id)}>
                {accessType.name}
              </option>
            ))}
          </Select>
          {form.errors.access_typeId && form.touched.access_typeId && (
            <Text color={"red"}>{form.errors.access_typeId}</Text>
          )}

          <FormLabel mt={4} htmlFor="owner_typeId">
            Tipo de dueño
          </FormLabel>
          <Select
            name="owner_typeId"
            placeholder={"Tipo de dueño"}
            value={form.values.owner_typeId}
            onChange={form.handleChange}
          >
            {ownerTypesList?.map((ownerType, index) => (
              <option key={index} value={Number(ownerType.id)}>
                {ownerType.name}
              </option>
            ))}
          </Select>

          {form.errors.owner_typeId && form.touched.owner_typeId && (
            <Text color={"red"}>{form.errors.owner_typeId}</Text>
          )}

          <FormLabel mt={4} htmlFor="is_used">
            Usado
          </FormLabel>
          <Switch
            name="is_used"
            defaultChecked={ticket?.is_used}
            onChange={form.handleChange}
          />

          <Box mt={4}>
            <Button type="submit" isLoading={loadingEditTicket}>
              Guardar
            </Button>
          </Box>
        </form>
      </Box>
    </IntroAnimationComponent>
  );
};

export default EditCourtecyTicketView;
