import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import ShowUserView from "@/modules/users/views/show-user.view";
import { ShowUserPath, UsersPath } from "@/routes";
import { useRouter } from "next/router";

const ShowUserRoute = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <DesktopLayoutComponent
      title={`Usuario ${id}`}
      breadCrumbs={[
        {
          href: UsersPath,
          label: "Usuarios",
        },
        {
          href: ShowUserPath(String(id)),
          label: `${id}`,
        },
      ]}
    >
      <ShowUserView />
    </DesktopLayoutComponent>
  );
};

export default ShowUserRoute;
