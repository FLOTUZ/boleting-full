import { Box, HStack } from "@chakra-ui/react";
import Link from "next/link";

const routes = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Login",
    path: "/auth/login",
  },
  {
    name: "Register",
    path: "/auth/register",
  },
];

const NavigationComponent = () => {
  return (
    <>
      <HStack gap={4}>
        {routes.map((route, index) => (
          <Box key={index}>
            <Link href={route.path}>{route.name}</Link>
          </Box>
        ))}
      </HStack>
    </>
  );
};

export default NavigationComponent;
