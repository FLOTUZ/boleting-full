import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import CreateRoleView from "@/modules/roles/views/create-role.view";
import { CreateRolePath, ShowRolePath, ShowRolesPath } from "@/routes";
import { useRouter } from "next/router";

function EditRoleRoute() {
  const router = useRouter();
  const { roleId } = router.query;

  return (
    <DesktopLayoutComponent
      title={"Nuevo rol"}
      breadCrumbs={[
        {
          href: ShowRolesPath,
          label: "Roles",
        },

        {
          href: CreateRolePath,
          label: "Nuevo",
        },
      ]}
    >
      <CreateRoleView />
    </DesktopLayoutComponent>
  );
}

export default EditRoleRoute;
