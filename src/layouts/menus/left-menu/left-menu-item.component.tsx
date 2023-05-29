import { MenuItems } from "@/interfaces";
import {
  Center,
  Box,
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";

import { BiChevronRight } from "react-icons/bi";

interface LeftMenuItemComponentProps {
  index: number;
  menuItem: MenuItems;
}

const LeftMenuItemComponent = ({
  index,
  menuItem,
}: LeftMenuItemComponentProps) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <>
      {menuItem.subMenuItems ? (
        <Popover
          trigger="hover"
          placement="start-end"
          returnFocusOnClose={false}
          closeOnBlur={false}
          isOpen={isOpen}
          onClose={onClose}
        >
          <PopoverTrigger>
            <Tooltip label={menuItem.label} aria-label="A tooltip">
              <Box
                key={index}
                w={"100%"}
                h={50}
                mb={4}
                bgColor={"gray.700"}
                borderRadius={5}
                onClick={onToggle}
                _hover={{
                  background: "gray.600",
                  cursor: "pointer",
                  select: "none",
                }}
              >
                <Center h={"100%"} w={"100%"} userSelect={"none"}>
                  {menuItem.icon ? menuItem.icon : menuItem.label}{" "}
                  <BiChevronRight size={25} />
                </Center>
              </Box>
            </Tooltip>
          </PopoverTrigger>
          <PopoverContent ml={4}>
            <PopoverHeader fontWeight="semibold" userSelect={"none"}>
              {menuItem.label}
            </PopoverHeader>
            <PopoverBody>
              <ButtonGroup
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                justifyContent="flex-start"
                w={"100%"}
                h={"100%"}
                spacing={4}
              >
                {menuItem.subMenuItems.map((subMenuItem, index) => (
                  <Button
                    key={index}
                    w={"100%"}
                    h={50}
                    onClick={subMenuItem.onClick}
                    bgColor={"gray.700"}
                    borderRadius={5}
                    _hover={{
                      background: "gray.600",
                      cursor: "pointer",
                    }}
                  >
                    <Center h={"100%"} w={"100%"} userSelect={"none"}>
                      {subMenuItem.icon ? subMenuItem.icon : subMenuItem.label}
                    </Center>
                  </Button>
                ))}
              </ButtonGroup>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ) : (
        <Tooltip label={menuItem.label} aria-label="A tooltip">
          <Box
            key={index}
            w={"100%"}
            h={50}
            mb={4}
            onClick={menuItem.onClick}
            bgColor={"gray.700"}
            borderRadius={5}
            _hover={{
              background: "gray.600",
              cursor: "pointer",
            }}
          >
            <Center h={"100%"} w={"100%"}>
              {menuItem.icon ? menuItem.icon : menuItem.label}
            </Center>
          </Box>
        </Tooltip>
      )}
    </>
  );
};

export default LeftMenuItemComponent;
