import Link from "next/link";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { User, useShowEventStaffLazyQuery } from "@/gql/generated";

import { CreateEventStaffPath } from "@/routes";

import { TableColumn } from "react-data-table-component";
import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import EventStaffDatatable from "./components/staff.datatable";

import { BiRefresh } from "react-icons/bi";
import { Box, Button } from "@chakra-ui/react";

const ShowEventStaffView = () => {
  const router = useRouter();
  const { id } = router.query;
  const [eventStaff, setEventStaff] = useState<User[]>([]);

  const [getStaff, { loading, refetch }] = useShowEventStaffLazyQuery({
    variables: {
      eventId: Number(id),
    },
    onCompleted(data) {
      if (data.event?.staff) {
        setEventStaff(data.event.staff as User[]);
      }
    },
    onError(error) {
      console.log(error);
    },
  });

  const columns: TableColumn<User>[] = [
    {
      name: "Nombre",
      selector: (row) => `${row.name} ${row.last_name}`,
      sortable: true,
    },
    {
      name: "Rol",
      selector: (row) => {
        const role = row.roles?.map((role) => role.name).join(", ");
        return role ? role : "Sin rol";
      },
    },
  ];

  useEffect(() => {
    if (id) {
      getStaff();
    }
  }, [getStaff, id]);

  if (loading) {
    return <ProgressLoaderComponent />;
  }

  return (
    <IntroAnimationComponent data={eventStaff}>
      <Box p={4}>
        <Button mr={4} onClick={() => refetch()}>
          <BiRefresh size={20} />
        </Button>
        <Link passHref href={CreateEventStaffPath(Number(id))}>
          <Button>Agregar staff</Button>
        </Link>
        <Box mt={4}>
          <EventStaffDatatable
            data={eventStaff}
            columns={columns}
            loader={loading}
            refetch={refetch}
          />
        </Box>
      </Box>
    </IntroAnimationComponent>
  );
};

export default ShowEventStaffView;
