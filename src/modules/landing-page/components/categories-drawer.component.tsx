import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { HiMenuAlt2 } from "react-icons/hi";
import { useLandingPage } from "../contexts/landing-page.context";
import Link from "next/link";
import { SearchEventsBySubcategoryPath } from "@/routes";

const CategoriesDrawerComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  const { eventSubCategories } = useLandingPage();

  return (
    <>
      <IconButton
        aria-label="Open menu"
        fontSize="20px"
        color="black"
        variant="outline"
        onClick={onOpen}
      >
        <HiMenuAlt2 color={colorMode === "light" ? "black" : "white"} />
      </IconButton>
      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">SubCategorías</DrawerHeader>
          <DrawerBody>
            {eventSubCategories.map((subCategory) => (
              <Link
                key={subCategory.id}
                href={SearchEventsBySubcategoryPath(String(subCategory.id))}
              >
                <p>{subCategory.name}</p>
              </Link>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CategoriesDrawerComponent;
