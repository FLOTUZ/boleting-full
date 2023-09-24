import ClientMenuComponent from "@/modules/components-landing-page/client-menu.component";
import ThemeSwitchComponent from "@/components/buttons/theme-switch.component";
import { Button, Flex, HStack, Image, Spacer } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";

const HeaderLandingComponent = () => {
  return (
    <>
      <Flex w="full" p={4} shadow="md">
        <HStack spacing={3} alignItems="center">
          <Image
            src={"/assets/logo_provisional.png"}
            width={50}
            height={50}
            alt="app logo"
          />
        </HStack>

        <Spacer />

        <HStack alignItems="center" spacing={1}>
          <Button>
            <AiOutlineSearch />
          </Button>
          <ThemeSwitchComponent />
          <ClientMenuComponent />
        </HStack>
      </Flex>
    </>
  );
};

export default HeaderLandingComponent;
