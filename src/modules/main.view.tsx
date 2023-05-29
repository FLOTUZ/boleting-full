import DesktopLayoutComponent from "@/layouts/desktop-layout-component/desktop-layout.component";
import { Box } from "@chakra-ui/react";

const MainView = () => {
  return (
    <>
      <DesktopLayoutComponent title={"Dashboard"}>
        <Box p={2}>Dashboard</Box>
      </DesktopLayoutComponent>
    </>
  );
};

export default MainView;
