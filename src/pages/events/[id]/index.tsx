import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import ShowEventView from "@/modules/events/views/show-event.view";
import { ShowEventPath, EventsPath } from "@/routes";
import { useRouter } from "next/router";

function ShowEventRoute() {
  const router = useRouter();

  const { id } = router.query;

  return (
    <DesktopLayoutComponent
      title={`Evento ${id}`}
      breadCrumbs={[
        {
          label: "Eventos",
          href: EventsPath,
        },
        {
          label: `Evento ${id}`,
          href: ShowEventPath(String(id)),
        },
      ]}
    >
      <ShowEventView eventId={Number(id)} />
    </DesktopLayoutComponent>
  );
}

export default ShowEventRoute;
