import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import { UserProvider } from "@/contexts/user.context";
import { Box } from "@chakra-ui/react";
import ShowEventTicketsView from "@/modules/events/views/show-event-tickets-view";
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
          <ShowEventTicketsView />
        </Box>
      </UserProvider>
    </DesktopLayoutComponent>
  );
};

export default EventsRoute;
