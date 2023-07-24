import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import ShowOrganizationsView from "@/modules/organizations/views/show-organizations.view";
import { OrganizationsPath } from "@/routes";

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
    >
      <ShowOrganizationsView />
    </DesktopLayoutComponent>
  );
};

export default OrganizationsRoute;
