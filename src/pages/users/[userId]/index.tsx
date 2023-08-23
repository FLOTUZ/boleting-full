import { useRouter } from "next/router";

import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import ShowUserView from "@/modules/users/views/show-user.view";

import { ShowUserPath, UsersPath } from "@/routes";

const ShowUserRoute = () => {
  const router = useRouter();
  const { userId } = router.query;
  return (
    <DesktopLayoutComponent
      title={`Usuario ${userId}`}
      breadCrumbs={[
        {
          href: UsersPath,
          label: "Usuarios",
        },
        {
          href: ShowUserPath(String(userId)),
          label: `${userId}`,
        },
      ]}
    >
      <ShowUserView />
    </DesktopLayoutComponent>
  );
};

export default ShowUserRoute;
