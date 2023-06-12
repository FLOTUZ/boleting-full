import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import { UserProvider } from "@/contexts/user.context";
import { Box } from "@chakra-ui/react";
import ShowEventTicketsView from "@/modules/tickets/views/show-event-tickets-view";

const TicketsRoute = () => {
  return (
    <DesktopLayoutComponent
      title={"Tickets"}
      breadCrumbs={[
        {
          label: "Tickets",
          href: "/tickets",
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

export default TicketsRoute;
