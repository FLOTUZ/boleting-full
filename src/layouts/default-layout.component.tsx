import Head from "next/head";
import { useRouter } from "next/router";
import LeftMenuComponent from "./menus/left-menu/left-menu.component";
import MenuDrawerComponent from "./menus/drawer-menu/drawer-menu.component";
import { MenuItems } from "@/interfaces";
import { Box, Grid, GridItem, useMediaQuery } from "@chakra-ui/react";
import { TbBuildingCircus } from "react-icons/tb";
import { MdDashboard } from "react-icons/md";
import { IoPeopleCircleOutline } from "react-icons/io5";

interface DefaultLayoutComponentProps {
  tittle: string;
  children?: React.ReactNode;
}

const DefaultLayoutComponent = ({
  tittle,
  children,
}: DefaultLayoutComponentProps) => {
  const router = useRouter();
  const [isLargerThanHD] = useMediaQuery(["(min-width: 720px)"]);

  const menuItems: MenuItems[] = [
    {
      label: "Dashboard",
      onClick: () => router.replace("/dashboard"),
      icon: <MdDashboard size={30} />,
    },
    {
      label: "Eventos",
      onClick: () => router.push("/events"),
      icon: <TbBuildingCircus size={30} />,
      subMenuItems: [
        {
          label: "Crear evento",
          onClick: () => router.push("/event/create"),
        },
      ],
    },
    {
      label: "Usuarios",
      onClick: () => router.push("/users"),
      icon: <IoPeopleCircleOutline size={30} />,
      subMenuItems: [
        {
          label: "Lista de usuarios",
          onClick: () => router.push("/users"),
        },
        {
          label: "Crear usuario",
          onClick: () => router.push("/users/create"),
        },
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>{tittle}</title>
        <meta name="description" content="Own selling tickets" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLargerThanHD ? (
        <Grid
          h="100vh"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(15, 1fr)"
          gap={4}
          p={4}
        >
          <GridItem
            rowSpan={2}
            colSpan={1}
            bg="gray.900"
            h={"100%"}
            position={"sticky"}
            top={0}
          >
            <LeftMenuComponent menuItems={menuItems} />
          </GridItem>

          <GridItem
            colSpan={14}
            rowSpan={2}
            bg="gray.900"
            h={"100%"}
            w={"100%"}
          >
            <Box p={4}>{children}</Box>
          </GridItem>
          <GridItem colSpan={15} bg="gray.900" h={"fit-content"}>
            <Box p={4}>Footer</Box>
          </GridItem>
        </Grid>
      ) : (
        <Box p={4}>
          <Box m={4} position={"fixed"} right={0}>
            <MenuDrawerComponent menuItems={menuItems} />
          </Box>
          <Box mt={8} h={"100vh"} bgColor={"gray.900"}>
            {children}
          </Box>
          <Box mt={8}>Footer</Box>
        </Box>
      )}
    </>
  );
};

export default DefaultLayoutComponent;
