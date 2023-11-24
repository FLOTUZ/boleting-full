//User profile

import { useUserSession } from "@/hooks/useUserSession";
import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Box,
  Text,
  AbsoluteCenter,
} from "@chakra-ui/react";
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
            href: profilePath,
          },
        ]}
      >
        <ShowMyProfile />
      </DesktopLayoutComponent>
    </>
  );
}

export default ProfileRoute;
