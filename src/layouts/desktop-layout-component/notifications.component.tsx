import { useNotifications } from "@/contexts/notifications.context";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Box,
  Text,
  useDisclosure,
  Spacer,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import { HiBell } from "react-icons/hi";
import { AiOutlineClear } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";

const NotificationsComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notifications, removeNotification, clearNotifications } =
    useNotifications();

  return (
    <>
      <Button onClick={onOpen}>
        <HiBell size={24} />
      </Button>
      <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <HStack>
              <Text>Notificaciones</Text>
              <Spacer />
              <Button
                onClick={clearNotifications}
                size="xs"
                h={8}
                w={8}
                _hover={{
                  color: "white",
                  bg: "red.500",
                }}
              >
                <AiOutlineClear size={30} />
              </Button>
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            <Box>
              {notifications.map((notification) => (
                <Box
                  key={notification.id}
                  borderBottomWidth="1px"
                  p={2}
                  transition={"all 0.2s ease"}
                >
                  <HStack>
                    <Heading size="sm">{notification.title}</Heading>
                    <Spacer />
                    <Button
                      aria-label={"remove-notification"}
                      onClick={() => removeNotification(notification)}
                      size="xs"
                      h={8}
                      _hover={{
                        color: "white",
                        bg: "red.500",
                      }}
                    >
                      <TiDelete size={24} />
                    </Button>
                  </HStack>
                  <Text>{notification.description}</Text>
                  <Text fontSize="xs" color="gray.500">
                    {new Date(notification.createdAt).toLocaleString()}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {notification.user?.name}
                  </Text>
                </Box>
              ))}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NotificationsComponent;
