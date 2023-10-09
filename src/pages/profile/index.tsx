import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import ShowMyProfile from "@/modules/profile/views/show-my-profile";
import { profilePath } from "@/routes";

const ProfileRoute = () => {
  return (
    <>
      <DesktopLayoutComponent
        title={"Mi Perfil"}
        breadCrumbs={[
          {
            label: "Mi perfil",
            href: profilePath,
          },
        ]}
      >
        <ShowMyProfile />
      </DesktopLayoutComponent>
    </>
  );
};

export default ProfileRoute;
