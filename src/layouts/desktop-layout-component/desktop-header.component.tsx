import SearcherComponent from "./searcher.component";
import NotificationsComponent from "./notifications.component";
import {
  Button,
  HStack,
  Link,
  SimpleGrid,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { BsSunFill } from "react-icons/bs";
import { TbMoonFilled } from "react-icons/tb";

export interface BreadCrumbItem {
  label: string;
  href: string;
}
interface DesktopHeaderComponentProps {
  title: string;
  breadCrumbs?: BreadCrumbItem[] | null;
}

export const DesktopHeaderComponent = ({
  title,
  breadCrumbs,
}: DesktopHeaderComponentProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const isCurrentPage = (breadCrumb: BreadCrumbItem) => {
    if (breadCrumb != null) {
      return breadCrumbs![breadCrumbs!.length - 1].href === breadCrumb.href;
    }
  };

  return (
    <SimpleGrid
      columns={[1, 2, 3]}
      pos={"sticky"}
      top={0}
      right={0}
      p={2}
      spacing={4}
      borderWidth={"1px"}
      bgColor={colorMode === "light" ? "white" : "gray.800"}
      zIndex={1}
    >
      {breadCrumbs ? (
        <HStack
          w={"100%"}
          overflow={"hidden"}
          whiteSpace={"nowrap"}
          textOverflow={"ellipsis"}
        >
          {breadCrumbs!.map((breadCrumb, index) => {
            return (
              <HStack key={index}>
                {!isCurrentPage(breadCrumb) ? (
                  <Link
                    href={breadCrumb.href}
                    style={{
                      fontSize: "0.8rem",
                      display: "inline",
                    }}
                  >
                    {breadCrumb.label}
                  </Link>
                ) : (
                  <Text fontSize={"sm"} cursor={"default"} display={"inline"}>
                    {breadCrumb.label}
                  </Text>
                )}
                {!isCurrentPage(breadCrumb) && (
                  <Text fontSize={"sm"} display={"inline"}>
                    /
                  </Text>
                )}
              </HStack>
            );
          })}
        </HStack>
      ) : (
        <Spacer w={"100%"} />
      )}
      {
        <Text
          w={"100%"}
          textAlign={"center"}
          fontSize={"2xl"}
          fontWeight={"bold"}
          overflow={"hidden"}
          whiteSpace={"nowrap"}
          textOverflow={"ellipsis"}
        >
          {title}
        </Text>
      }

      <HStack w={"100%"} placeContent={"end"}>
        <SearcherComponent />
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <TbMoonFilled /> : <BsSunFill />}
        </Button>
        <NotificationsComponent />
      </HStack>
    </SimpleGrid>
  );
};
