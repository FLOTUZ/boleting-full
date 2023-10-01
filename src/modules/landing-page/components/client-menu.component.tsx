import Head from "next/head";
import Link from "next/link";
import ThemeSwitchComponent from "@/components/buttons/theme-switch.component";
import { useSession } from "@/hooks";
import { LoginClientPath, LoginPath, RegisterPath } from "@/routes";
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
  useColorMode,
} from "@chakra-ui/react";

import { FaRegUserCircle } from "react-icons/fa";
import {
  IoCloseSharp,
  IoExit,
  IoHelpBuoy,
  IoTicketSharp,
} from "react-icons/io5";
import { useClientSession } from "@/hooks/useClientSession";

const ClientMenuComponent = () => {
  const { client, logout } = useClientSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <>
      <Head>
        <title>Boleting full</title>
        <meta name="description" content="Ticketing system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <IconButton
        aria-label="Open menu"
        fontSize="20px"
        color="black"
        variant="outline"
        onClick={onOpen}
      >
        <FaRegUserCircle color={colorMode === "light" ? "black" : "white"} />
      </IconButton>

      <Drawer placement={"right"} onClose={onClose} isOpen={isOpen} size={"sm"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <Box>
              <IconButton aria-label={"close"} onClick={onClose}>
                <IoCloseSharp size={16} />
              </IconButton>
            </Box>
            <Box textAlign={"center"}>
              {client ? "Bienvenido a tu cuenta" : "Ingresa"}
            </Box>
            <Box>
              {client && client.email ? (
                <Box textAlign={"center"}>
                  <Text as={"b"} fontSize={"md"}>
                    {client.name} {client.last_name}
                  </Text>
                </Box>
              ) : (
                <Box textAlign={"center"} mt={4}>
                  <Link href={LoginClientPath}>
                    <Button variant="ghost">Iniciar sesion</Button>
                  </Link>

                  <Link href={RegisterPath}>
                    <Button variant="ghost">Registrame</Button>
                  </Link>
                </Box>
              )}
            </Box>
          </DrawerHeader>
          <DrawerBody>
            <VStack rounded="sm" alignItems={"flex-start"} spacing={4} p={4}>
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
                onClick={() => logout()}
              >
                <IoExit />
                &nbsp; Cerrar sesion
              </Button>
              <ThemeSwitchComponent />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ClientMenuComponent;
