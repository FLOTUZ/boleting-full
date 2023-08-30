import SearcherComponent from "@/layouts/desktop-layout-component/searcher.component";
import {
  Box,
  Button,
  CloseButton,
  Flex,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  VStack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsSunFill } from "react-icons/bs";
import { PiCaretDownBold } from "react-icons/pi";
import { TbMoonFilled } from "react-icons/tb";

const HeaderLandingComponent = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  return (
    <>
      <Flex
        className="container"
        bg={bg}
        w="full"
        px={{
          base: 2,
          sm: 4,
        }}
        py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <HStack
            spacing={3}
            display={mobileNav.isOpen ? "none" : "flex"}
            alignItems="center"
          >
            <Image
              src={"/assets/logo_provisional.png"}
              width={50}
              height={50}
              alt="app logo"
            ></Image>
            <SearcherComponent />
          </HStack>
        </Flex>

        <Spacer />

        <HStack display="flex" alignItems="center" spacing={1}>
          <HStack
            spacing={1}
            mr={1}
            color="brand.500"
            display={{
              base: "none",
              md: "inline-flex",
            }}
          >
            <Button variant="ghost">Encuentra Eventos</Button>
            <Menu>
              <MenuButton
                variant="ghost"
                as={Button}
                rightIcon={<PiCaretDownBold />}
              >
                Centro de ayuda
              </MenuButton>
              <MenuList>
                <MenuItem>Tus boletos</MenuItem>
                <MenuItem>Contacta a tu organizador</MenuItem>
              </MenuList>
            </Menu>
            <Button variant="ghost">Registrame</Button>
            <Button variant="ghost">Iniciar sesion</Button>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? (
                <TbMoonFilled size={24} />
              ) : (
                <BsSunFill size={24} />
              )}
            </Button>
          </HStack>

          {/* para mobile */}
          <Box
            className="mobileMenu"
            display={{
              base: "inline-flex",
              md: "none",
            }}
          >
            <Button variant="ghost">Registrame</Button>
            <Button variant="ghost">Iniciar sesion</Button>
            <IconButton
              display={{
                base: "flex",
                md: "none",
              }}
              aria-label="Open menu"
              fontSize="20px"
              color="gray.800"
              _dark={{
                color: "inherit",
              }}
              variant="ghost"
              icon={<AiOutlineMenu />}
              onClick={mobileNav.onOpen}
            />

            <VStack
              pos="absolute"
              top={0}
              left={0}
              right={0}
              display={mobileNav.isOpen ? "flex" : "none"}
              flexDirection="column"
              p={2}
              pb={4}
              m={2}
              bg={bg}
              spacing={3}
              rounded="sm"
              shadow="sm"
            >
              <CloseButton
                aria-label="Close menu"
                onClick={mobileNav.onClose}
              />

              <Box color={"white"}>
                <Button w="full" variant="ghost">
                  Tus boletos
                </Button>
                <Button w="full" variant="ghost">
                  Encuentra eventos
                </Button>
                <Button w="full" variant="ghost">
                  Contacta a tu organizador
                </Button>
              </Box>
            </VStack>
          </Box>
        </HStack>
      </Flex>
    </>
  );
};

export default HeaderLandingComponent;
