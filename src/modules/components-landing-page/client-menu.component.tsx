import { useSession } from "@/hooks";
import {
  Box,
  Button,
  IconButton,
  VStack,
  Text,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import {
  IoCloseSharp,
  IoExit,
  IoHelpBuoy,
  IoTicketSharp,
} from "react-icons/io5";

const ClientMenuComponent = () => {
  const { user } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        aria-label="Open menu"
        fontSize="20px"
        color="gray.800"
        variant="ghost"
        icon={<AiOutlineMenu />}
        onClick={onOpen}
        _dark={{
          color: "inherit",
        }}
      />

      <Drawer placement={"right"} onClose={onClose} isOpen={isOpen} size={"sm"}>
        <DrawerOverlay bg="none" backdropFilter="auto" backdropBlur="3px" />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <Box>
              <IconButton aria-label={"close"} onClick={onClose}>
                <IoCloseSharp size={16} />
              </IconButton>
            </Box>
            Bienvenido a tu cuenta
            <Box>
              {user && user.email ? (
                <Text as={"b"} fontSize={"md"} alignSelf={"center"}>
                  {user.name}
                </Text>
              ) : (
                <>
                  <Button variant="ghost">Registrame</Button>
                  <Button variant="ghost">Iniciar sesion</Button>
                </>
              )}
            </Box>
          </DrawerHeader>
          <DrawerBody>
            <VStack rounded="sm" alignItems={"flex-start"} spacing={4} p={4}>
              <Box></Box>
              <Button w={"full"} placeContent={"start"} variant="ghost">
                <IoTicketSharp />
                &nbsp; Mis boletos
              </Button>
              <Button w={"full"} placeContent={"start"} variant="ghost">
                <IoHelpBuoy />
                &nbsp; Contacta a tu organizador
              </Button>
              <Button
                w={"full"}
                placeContent={"start"}
                variant="ghost"
                colorScheme="red"
              >
                <IoExit />
                &nbsp; Cerrar sesion
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ClientMenuComponent;
