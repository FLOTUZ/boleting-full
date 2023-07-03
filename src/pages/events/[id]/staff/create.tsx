import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import CreateStaffView from "@/modules/staff/views/create-staff.view";
import {
  CreateEventStaffPath,
  EventsPath,
  ShowEventPath,
  ShowEventStaffIdPath,
} from "@/routes";
import { useRouter } from "next/router";

const CreateEventStaffRoute = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <DesktopLayoutComponent
      title={"Asignación de Staff"}
      breadCrumbs={[
        {
          label: "Eventos",
          href: EventsPath,
        },
        {
          label: `Evento ${id}`,
          href: ShowEventPath(id as string),
        },
        {
          label: "Staff",
          href: ShowEventStaffIdPath(Number(id)),
        },
        {
          label: "Selecciona Staff",
          href: CreateEventStaffPath(Number(id)),
        },
      ]}
    >
      <CreateStaffView />
    </DesktopLayoutComponent>
  );
};

export default CreateEventStaffRoute;
