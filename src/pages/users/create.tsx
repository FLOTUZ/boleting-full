import { UserProvider } from "@/contexts/user.context";
import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import CreateUserView from "@/modules/users/views/create-user.view";
import { UsersPath } from "@/routes";

function CreateUserRoute() {
  return (
    <UserProvider>
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
    </UserProvider>
  );
}

export default CreateUserRoute;
