import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import ShowEventView from "@/modules/events/views/show-event.view";
import { ShowEventPath, EventsPath } from "@/routes";
import { useRouter } from "next/router";

function ShowEventRoute() {
  const router = useRouter();

  const { id: eventId } = router.query;

  return (
    <DesktopLayoutComponent
      title={`Evento ${eventId}`}
      breadCrumbs={[
        {
          label: "Eventos",
          href: EventsPath,
        },
        {
          label: `${eventId}`,
          href: ShowEventPath(String(eventId)),
        },
      ]}
    >
      <ShowEventView />
    </DesktopLayoutComponent>
  );
}

export default ShowEventRoute;
