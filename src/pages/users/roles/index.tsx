import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import ShowRolesView from "@/modules/roles/show-roles.view";
import { ShowRolesPath } from "@/routes";

function ShowRolesRoute() {
  return (
    <DesktopLayoutComponent
      title={"Roles"}
      breadCrumbs={[
        {
          href: ShowRolesPath,
          label: "Roles",
        },
      ]}
    >
      <ShowRolesView />
    </DesktopLayoutComponent>
  );
}

export default ShowRolesRoute;
