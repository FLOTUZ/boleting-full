import { useUserSession } from "@/hooks/useUserSession";
import { MenuItems } from "@/interfaces";
import {
  Spacer,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Box,
} from "@chakra-ui/react";
import LeftMenuItemComponent from "./left-menu-item.component";

interface LeftMenuComponentProps {
  menuItems: MenuItems[];
}

const LeftMenuComponent = ({ menuItems }: LeftMenuComponentProps) => {
  const { user, logout } = useUserSession();
  return (
    <Box p={4} textAlign={"center"}>
      {menuItems.map((menuItem, index) => (
        <LeftMenuItemComponent key={index} index={index} menuItem={menuItem} />
      ))}
      <Spacer h={"100%"} />
      {user && (
        <Menu>
          <>
            <MenuButton
              as={Avatar}
              name={user.name + " " + user.last_name}
              src={undefined}
              textAlign={"center"}
              userSelect={"none"}
              style={{
                cursor: "pointer",
                display: "inline-block",
              }}
            />
            <MenuList>
              <MenuItem>About me</MenuItem>
              <MenuDivider />
              <MenuItem
                borderRadius={"sm"}
                background={"rgba(255, 102, 0, 0.3)"}
                _hover={{ background: "rgba(255, 102, 0, 0.5)" }}
                onClick={() => logout()}
              >
                Close session
              </MenuItem>
            </MenuList>
          </>
        </Menu>
      )}
    </Box>
  );
};

export default LeftMenuComponent;
