import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import { OrganizationsPath } from "@/routes";
import { Box, Button } from "@chakra-ui/react";

const OrganizationsRoute = () => {
  return (
    <DesktopLayoutComponent
      title={"Organizaciones"}
      breadCrumbs={[
        {
          label: "Organizaciones",
          href: OrganizationsPath,
        },
      ]}
    ></DesktopLayoutComponent>
  );
};

export default OrganizationsRoute;
