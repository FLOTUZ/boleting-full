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
    <DesktopLayoutComponent title={"About me"}>
      <Box h="100vh" w="100%">
        <AbsoluteCenter w={{ base: "90%", md: "35%" }}>
          <Card>
            <CardHeader>
              <Heading size="lg">My account</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Heading size="md"> Role </Heading>
                  <Text pt="2" size="md">
                    {" "}
                    {user?.name}{" "}
                  </Text>
                </Box>

                <Box>
                  <Heading size="md"> Email </Heading>
                  <Text pt="2" fontSize="md">
                    {" "}
                    {user?.email}
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </AbsoluteCenter>
      </Box>
    </DesktopLayoutComponent>
  );
}

export default ProfileRoute;
