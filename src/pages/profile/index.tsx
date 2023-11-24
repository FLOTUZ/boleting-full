//User profile

import { useUserSession } from "@/hooks/useUserSession";
import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import LandingLayout from "@/layouts/landing-layout.component";
import { LandingPageProvider } from "@/modules/landing-page/contexts/landing-page.context";
import ShowMyProfile from "@/modules/profile/views/show-my-profile";
import { ProfilePath } from "@/routes";

import { useEffect } from "react";

function ProfileRoute() {
  const { user } = useUserSession();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <LandingLayout>
      <ShowMyProfile />
    </LandingLayout>
  );
}

export default ProfileRoute;
