//User profile

import { useUserSession } from "@/hooks/useUserSession";
import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import ShowMyProfile from "@/modules/profile/views/show-my-profile";
import { ProfilePath } from "@/routes";

import { useEffect } from "react";

function ProfileRoute() {
  const { user } = useUserSession();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <DesktopLayoutComponent
        title={"Mi Perfil"}
        breadCrumbs={[
          {
            label: "Mi perfil",
            href: ProfilePath,
          },
        ]}
      >
        <ShowMyProfile />
      </DesktopLayoutComponent>
    </>
  );
}

export default ProfileRoute;
