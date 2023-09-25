import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { HiMenuAlt2 } from "react-icons/hi";

const CategoriesDrawerComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  return (
    <>
      <IconButton
        aria-label="Open menu"
        fontSize="20px"
        color="black"
        variant="outline"
        onClick={onOpen}
      >
        <HiMenuAlt2 color={colorMode === "light" ? "black" : "white"} />
      </IconButton>
      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CategoriesDrawerComponent;
