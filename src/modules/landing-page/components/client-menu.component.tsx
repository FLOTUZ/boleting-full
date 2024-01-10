import Head from "next/head";
import Link from "next/link";
import ThemeSwitchComponent from "@/components/buttons/theme-switch.component";
import {
  LoginClientPath,
  ProfilePath,
  RegisterClientPath,
  ShowOrdersPath,
} from "@/routes";
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

import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import {
  IoCartSharp,
  IoCloseSharp,
  IoExit,
  IoHelpBuoy,
  IoTicketSharp,
} from "react-icons/io5";
import { useClientSession } from "@/hooks/useClientSession";
import { ClientProvider } from "@/contexts/client.context";

const ClientMenuComponent = () => {
  const { client, logout } = useClientSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <ClientProvider>
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

                  <Link href={RegisterClientPath}>
                    <Button variant="ghost">Registrame</Button>
                  </Link>
                </Box>
              )}
            </Box>
          </DrawerHeader>
          <DrawerBody>
            <VStack rounded="sm" alignItems={"flex-start"} spacing={4} p={4}>
              {client && client.email && (
                <>
                  <Link href={ProfilePath} style={{ width: "100%" }}>
                    <Button w={"full"} placeContent={"start"} variant="ghost">
                      <FaUserCircle />
                      &nbsp; Perfil
                    </Button>
                  </Link>
                  <Button w={"full"} placeContent={"start"} variant="ghost">
                    <IoTicketSharp />
                    &nbsp; Mis boletos
                  </Button>
                  <Link href={ShowOrdersPath} style={{ width: "100%" }}>
                    <Button w={"full"} placeContent={"start"} variant="ghost">
                      <IoCartSharp />
                      &nbsp; Órdenes
                    </Button>
                  </Link>
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
                </>
              )}
              <Button w={"full"} placeContent={"start"} variant="ghost">
                <IoHelpBuoy />
                &nbsp; Contacta a tu organizador
              </Button>
              <ThemeSwitchComponent />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </ClientProvider>
  );
};

export default ClientMenuComponent;
