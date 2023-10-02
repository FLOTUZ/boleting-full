import { useUserSession } from "@/hooks/useUserSession";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import MenuDrawerItemComponent from "./drawer-menu-item.component";
import { MenuItems } from "@/interfaces/components.interface";

interface MenuDrawerComponentProps {
  menuItems: MenuItems[];
}

const MenuDrawerComponent = ({ menuItems }: MenuDrawerComponentProps) => {
  const { user } = useUserSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        aria-label="Search database"
        w={"fit-content"}
        onClick={onOpen}
        bgColor={"gray.600"}
      >
        <GiHamburgerMenu />
      </Button>

      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />

        <DrawerContent bgColor={"gray.800"}>
          <DrawerHeader borderBottomWidth="1px">{user?.name}</DrawerHeader>
          <DrawerBody>
            {menuItems.map((menuItem, index) => (
              <MenuDrawerItemComponent
                key={index}
                label={menuItem.label}
                onClick={menuItem.onClick}
                subMenus={menuItem.subMenuItems}
              />
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MenuDrawerComponent;
