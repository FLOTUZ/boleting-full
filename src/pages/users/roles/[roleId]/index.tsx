import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import ShowRoleView from "@/modules/roles/show-role.view";
import { ShowRolePath, ShowRolesPath } from "@/routes";
import { useRouter } from "next/router";

function ShowRoleRoute() {
  const router = useRouter();
  const { roleId } = router.query;

  return (
    <DesktopLayoutComponent
      title={`Rol ${roleId}`}
      breadCrumbs={[
        {
          href: ShowRolesPath,
          label: "Roles",
        },
        {
          href: ShowRolePath(roleId as string),
          label: `${roleId}`,
        },
      ]}
    >
      <ShowRoleView />
    </DesktopLayoutComponent>
  );
}

export default ShowRoleRoute;
