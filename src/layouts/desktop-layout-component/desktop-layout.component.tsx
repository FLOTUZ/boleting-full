import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { IoBusiness } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { TbBuildingCircus } from "react-icons/tb";
import { FaChevronCircleDown, FaUserAlt } from "react-icons/fa";
import { useUserSession } from "@/hooks/useUserSession";
import {
  BreadCrumbItem,
  DesktopHeaderComponent,
} from "./desktop-header.component";
import {
  CategoriesPath,
  DashboardPath,
  EventsPath,
  LoginPath,
  OrganizationsPath,
  UsersPath,
  ProfilePath,
  RootPath,
} from "@/routes";
import { useRouter } from "next/router";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { UserProvider } from "@/contexts/user.context";
import { ClientProvider } from "@/contexts/client.context";

interface DesktopLayoutComponentProps {
  title: string;
  breadCrumbs?: BreadCrumbItem[];
  children?: JSX.Element | JSX.Element[];
}

interface MenuItem {
  label: string;
  href: string;
  icon: JSX.Element;
  submenus?: MenuItem[];
}

const DesktopLayoutComponent = ({
  title,
  children,
  breadCrumbs,
}: DesktopLayoutComponentProps) => {
  const router = useRouter();
  const { user, logout } = useUserSession();

  const menuItems: MenuItem[] = [
    {
      label: "Dashboard",
      href: DashboardPath,
      icon: <MdDashboard size={25} />,
    },
    {
      label: "Eventos",
      href: EventsPath,
      icon: <TbBuildingCircus size={25} />,
    },
    {
      label: "Organizaciones",
      href: OrganizationsPath,
      icon: <IoBusiness size={25} />,
    },
    {
      label: "Usuarios",
      href: UsersPath,
      icon: <FaUserAlt size={25} />,
    },
    {
      label: "Categorias",
      href: CategoriesPath,
      icon: <BiSolidCategoryAlt size={30} />,
    },
  ];
  return (
    <ClientProvider>
      <UserProvider>
        <Head>
          <title>{title}</title>
        </Head>
        <Grid
          h={"100vh"}
          templateRows={"repeat(3, 1fr)"}
          templateColumns="repeat(16, 1fr)"
        >
          <GridItem rowSpan={3} colSpan={1} w={"auto"} borderWidth={"1px"}>
            <Box w={"100%"} mt={30} pos={"inherit"} top={0} right={0}>
              <Center pt={"1rem"}>
                <Link href={RootPath}>
                  <Image
                    src={"/assets/logo_provisional.png"}
                    width={50}
                    height={50}
                    alt="app logo"
                  />
                </Link>
              </Center>
            </Box>
            <Box w={"100%"} mt={100} pos={"inherit"} top={0} right={0}>
              {menuItems.map((item, index) => {
                return (
                  <Link href={item.href} key={index} replace={true} passHref>
                    <Box
                      justifyContent={"center"}
                      cursor={"pointer"}
                      h={"auto"}
                      p={"0.5rem"}
                      transition="all .1s ease-in-out"
                      color={
                        router.pathname.split("/")[1] ===
                        item.href.split("/")[1]
                          ? "white"
                          : "gray.500"
                      }
                      _hover={{
                        transform: "scale(1.1)",
                        color: "white",
                      }}
                    >
                      <HStack>
                        {item.icon}
                        <Text fontSize={"sm"}>{item.label}</Text>
                      </HStack>
                    </Box>
                  </Link>
                );
              })}
            </Box>

            <Box mt={16} maxW={"100%"} textAlign={"center"}>
              {user ? (
                <>
                  <Menu>
                    <MenuButton
                      as={Avatar}
                      size={"sm"}
                      name={user?.name + " " + user?.last_name}
                      textAlign={"center"}
                      userSelect={"none"}
                      cursor={"pointer"}
                    >
                      <AvatarBadge
                        boxSize="1.25em"
                        color={"white"}
                        bgColor={"gray"}
                      >
                        <FaChevronCircleDown />
                      </AvatarBadge>
                    </MenuButton>
                    <MenuList>
                      <Text cursor={"default"}>
                        {user?.name + " " + user?.last_name}
                      </Text>
                      <MenuDivider />
                      <Link href={ProfilePath} passHref>
                        <MenuItem>Perfil</MenuItem>
                      </Link>
                      <MenuItem onClick={logout}>Cerrar sesión</MenuItem>
                    </MenuList>
                  </Menu>
                </>
              ) : (
                <Link href={LoginPath}>
                  <Button>Iniciar sesión</Button>
                </Link>
              )}
            </Box>
          </GridItem>

          <GridItem
            rowSpan={3}
            colSpan={15}
            overflow={"auto"}
            overflowX={"unset"}
            borderWidth={"1px"}
          >
            <DesktopHeaderComponent title={title} breadCrumbs={breadCrumbs} />
            <Box h={"auto"} mb={16}>
              {children}
            </Box>
          </GridItem>
        </Grid>
      </UserProvider>
    </ClientProvider>
  );
};

export default DesktopLayoutComponent;
