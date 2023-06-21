import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import { UserProvider } from "@/contexts/user.context";
import { Box } from "@chakra-ui/react";
import ShowEventsView from "@/modules/events/views/show-events.view";
import { EventsPath } from "@/routes";

const EventsRoute = () => {
  return (
    <DesktopLayoutComponent
      title={"Eventos"}
      breadCrumbs={[
        {
          label: "Eventos",
          href: EventsPath,
        },
      ]}
    >
      <UserProvider>
        <Box>
          <ShowEventsView />
        </Box>
      </UserProvider>
    </DesktopLayoutComponent>
  );
};

export default EventsRoute;
