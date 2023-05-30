import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import { UserProvider } from "@/contexts/user.context";
import { Box } from "@chakra-ui/react";

const TicketsRoute = () => {
  return (
    <DesktopLayoutComponent
      title={"Tickets"}
      breadCrumbs={[
        {
          label: "Tickets",
          href: "/tickets",
        },
        {
          label: "Nuevo",
          href: "/tickets/new",
        },
        {
          label: "Nuevo2",
          href: "/tickets/new2",
        },
        {
          label: "Nuevo3",
          href: "/tickets/new3",
        },
        {
          label: "Nuevo4",
          href: "/tickets/new4",
        },
      ]}
    >
      <UserProvider>
        <Box>
          <Box>Hola</Box>
        </Box>
      </UserProvider>
    </DesktopLayoutComponent>
  );
};

export default TicketsRoute;
