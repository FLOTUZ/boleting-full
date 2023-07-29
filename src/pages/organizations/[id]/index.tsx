import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import ShowOrganizationView from "@/modules/organizations/views/show-organization.view";
import { OrganizationsPath, ShowOrganizationPath } from "@/routes";
import { useRouter } from "next/router";

function ShowOrganizationsRoute() {
  const router = useRouter();

  const { id } = router.query;

  return (
    <DesktopLayoutComponent
      title={`Organización ${id}`}
      breadCrumbs={[
        {
          label: "Organizaciones",
          href: OrganizationsPath,
        },
        {
          label: `${id}`,
          href: ShowOrganizationPath(String(id)),
        },
      ]}
    >
      <ShowOrganizationView />
    </DesktopLayoutComponent>
  );
}

export default ShowOrganizationsRoute;
