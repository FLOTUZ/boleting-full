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
} from "@chakra-ui/react";
import React from "react";
import { HiBell } from "react-icons/hi";

const NotificationsComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>
        <HiBell />
      </Button>
      <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Notificaciones</DrawerHeader>
          <DrawerBody>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Tipo de notificación
              </Heading>
              <Text pt="2" fontSize="sm">
                Descripción de la notificación
              </Text>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NotificationsComponent;
