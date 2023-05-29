import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import CreateEventView from "@/modules/events/views/create-event.view";
import { EventsPath } from "@/routes";

function EventsRoute() {
  return (
    <DesktopLayoutComponent
      title={"Mis eventos"}
      breadCrumbs={[
        {
          label: "Eventos",
          href: EventsPath,
        },
      ]}
    >
      <CreateEventView />
    </DesktopLayoutComponent>
  );
}

export default EventsRoute;
