import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import ShowEventsView from "@/modules/events/views/show-events.view";
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
      <ShowEventsView />
    </DesktopLayoutComponent>
  );
}

export default EventsRoute;
