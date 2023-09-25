import ClientMenuComponent from "@/modules/landing-page/components/client-menu.component";
import { CgMenuLeftAlt } from "react-icons/cg";
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Spacer,
  useMediaQuery,
} from "@chakra-ui/react";
import SearchClientButtonComponent from "./search-client-button.component";
import CategoriesDrawerComponent from "./categories-drawer.component";

const HeaderLandingComponent = () => {
  const [isLargerThan800] = useMediaQuery("(min-width: 420px)");
  return (
    <Box
      shadow="md"
      position={"fixed"}
      top={0}
      w={"100%"}
      zIndex={1}
      style={{
        backdropFilter: "blur(20px)",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      }}
    >
      <Flex w="full" p={4}>
        <HStack spacing={3} alignItems="center">
          <CategoriesDrawerComponent />
          <Image
            src={"/assets/logo_provisional.png"}
            width={35}
            height={35}
            alt="app logo"
          />
        </HStack>

        <Spacer />

        <HStack alignItems="center" spacing={1}>
          {isLargerThan800 && <SearchClientButtonComponent />}
          <ClientMenuComponent />
        </HStack>
      </Flex>
      {!isLargerThan800 && (
        <Box m={2}>
          <SearchClientButtonComponent />
        </Box>
      )}
    </Box>
  );
};

export default HeaderLandingComponent;
