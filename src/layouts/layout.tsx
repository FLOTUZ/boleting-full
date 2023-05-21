import NavigationComponent from "@/components/navigation.component";
import { Box } from "@chakra-ui/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box p={2}>
        <NavigationComponent />
        {children}
      </Box>
    </>
  );
}
