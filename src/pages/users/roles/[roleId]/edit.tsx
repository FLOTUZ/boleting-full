import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import EditRoleView from "@/modules/roles/views/edit-role.view";
import { EditRolePath, ShowRolePath, ShowRolesPath } from "@/routes";
import { useRouter } from "next/router";

function EditRoleRoute() {
  const router = useRouter();
  const { roleId } = router.query;

  return (
    <DesktopLayoutComponent
      title={"Editar rol"}
      breadCrumbs={[
        {
          href: ShowRolesPath,
          label: "Roles",
        },
        {
          href: ShowRolePath(roleId as string),
          label: `${roleId}`,
        },

        {
          href: EditRolePath(roleId as string),
          label: "edit",
        },
      ]}
    >
      <EditRoleView />
    </DesktopLayoutComponent>
  );
}

export default EditRoleRoute;
