import { User, useShowStaffQuery } from "@/gql/generated";
import { CreateUserSchema } from "@/validations";
import { Box, Heading } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import SelectEventStaffDatatable from "../components/select-event-staff.datatable";

interface CreateStaffViewProps {
  eventId: number;
}

const CreateStaffView = ({ eventId }: CreateStaffViewProps) => {
  const [staffList, setStaffList] = useState<User[]>([]);
  const { data, loading } = useShowStaffQuery({
    onError(error) {
      console.log(error);
    },
  });

  const form = useFormik({
    validationSchema: CreateUserSchema,
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    if (data?.users) {
      setStaffList(data.users as User[]);
    }
  }, [data]);

  return (
    <Box p={4}>
      <Heading mb={4} size="lg">
        Seleccione staff
      </Heading>

      <SelectEventStaffDatatable loader={loading} data={staffList} />
    </Box>
  );
};

export default CreateStaffView;
