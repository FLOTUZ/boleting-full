import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import CreateUserView from "@/modules/users/views/create-user.view";
import { UsersPath } from "@/routes";

function CreateUserRoute() {
  return (
    <DesktopLayoutComponent
      title={"Usuarios"}
      breadCrumbs={[
        {
          href: UsersPath,
          label: "Usuarios",
        },
      ]}
    >
      <CreateUserView />
    </DesktopLayoutComponent>
  );
}

export default CreateUserRoute;
