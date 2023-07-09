import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import ShowEventStaffView from "@/modules/staff/show-event-staff.view";
import { EventsPath, ShowEventPath, ShowEventStaffIdPath } from "@/routes";
import { useRouter } from "next/router";

const ShowStaffsRoute = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <DesktopLayoutComponent
      title={"Staff del evento"}
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
      ]}
    >
      <ShowEventStaffView />
    </DesktopLayoutComponent>
  );
};

export default ShowStaffsRoute;
