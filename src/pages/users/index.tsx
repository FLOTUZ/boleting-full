import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import ShowUsersView from "@/modules/users/views/show-users.view";
import { UsersPath } from "@/routes";

const ShowUsersRoute = () => {
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
      <ShowUsersView />
    </DesktopLayoutComponent>
  );
};

export default ShowUsersRoute;
