import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import EditUserView from "@/modules/users/views/edit-user.view";
import { EditUserPath, ShowUserPath, UsersPath } from "@/routes";
import { useRouter } from "next/router";

const EditUsersRoute = () => {
  const router = useRouter();
  const { userId } = router.query;

  return (
    <DesktopLayoutComponent
      title={`Edit ${userId}`}
      breadCrumbs={[
        {
          href: UsersPath,
          label: "Usuarios",
        },
        {
          href: ShowUserPath(String(userId)),
          label: `${userId}`,
        },
        {
          href: EditUserPath(String(userId)),
          label: `Editar`,
        },
      ]}
    >
      <EditUserView />
    </DesktopLayoutComponent>
  );
};

export default EditUsersRoute;
