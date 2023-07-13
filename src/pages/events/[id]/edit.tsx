import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import EditEventView from "@/modules/events/views/edit-event.view";
import { EditEventPath, EventsPath, ShowEventPath } from "@/routes";
import { useRouter } from "next/router";

const EditEventRoute = () => {
  const router = useRouter();
  const { id } = router.query;

  if (id == undefined) {
    return <></>;
  }

  return (
    <DesktopLayoutComponent
      title={"Editar evento"}
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
          label: "Editar evento",
          href: EditEventPath(Number(id)),
        },
      ]}
    >
      <EditEventView eventId={parseInt(id as string)} />
    </DesktopLayoutComponent>
  );
};

export default EditEventRoute;
