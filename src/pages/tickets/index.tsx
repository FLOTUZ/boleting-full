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
