import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import UserListView from "@/modules/users/views/user-list.view";
import { UsersPath } from "@/routes";

const UsersListRoute = () => {
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
      <UserListView />
    </DesktopLayoutComponent>
  );
};

export default UsersListRoute;
