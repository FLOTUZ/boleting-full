import { LandingPageProvider } from "@/modules/landing-page/contexts/landing-page.context";

import ClientMenuComponent from "@/modules/landing-page/components/client-menu.component";

import {
  Box,
  Flex,
  HStack,
  Image,
  Spacer,
  useMediaQuery,
} from "@chakra-ui/react";
import SearchClientButtonComponent from "../modules/landing-page/components/search-client-button.component";
import CategoriesDrawerComponent from "../modules/landing-page/components/categories-drawer.component";
import {
  EventSubCategory,
  useShowEventSubCategoriesLazyQuery,
} from "@/gql/generated";

import { useEffect, useState } from "react";
interface LandingLayoutProps {
  children?: React.ReactNode | React.ReactNode[];
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  const [eventSubCategories, setEventSubCategories] = useState<
    EventSubCategory[]
  >([]);
  const [GET_SUBCATEGORIES] = useShowEventSubCategoriesLazyQuery({
    onCompleted(data) {
      setEventSubCategories(data.eventSubCategories as EventSubCategory[]);
    },
  });

  useEffect(() => {
    GET_SUBCATEGORIES();
  }, [GET_SUBCATEGORIES]);

  return (
    <LandingPageProvider eventSubCategories={eventSubCategories}>
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
            <SearchClientButtonComponent />
            <ClientMenuComponent />
          </HStack>
        </Flex>
      </Box>

      <Box
        p={4}
        style={{
          marginTop: "4.5rem",
        }}
      >
        {children}
      </Box>
    </LandingPageProvider>
  );
};

export default LandingLayout;
