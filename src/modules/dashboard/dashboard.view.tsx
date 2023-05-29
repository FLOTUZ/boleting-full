import DefaultLayoutComponent from "@/components/layouts/default-layout.component";
import { Box, Center, Heading } from "@chakra-ui/react";

const DashBoardView = () => {
  return (
    <DefaultLayoutComponent tittle="Dashboard">
      <Box>
        <Center>
          <Heading>Dashboard</Heading>
        </Center>
      </Box>
    </DefaultLayoutComponent>
  );
};

export default DashBoardView;
