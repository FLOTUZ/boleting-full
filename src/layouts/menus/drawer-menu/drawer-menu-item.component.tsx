import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";

interface MenuDrawerItemComponentProps {
  label: string;
  onClick?: () => void;
  subMenus?: {
    label: string;
    onClick: () => void;
  }[];
}

const MenuDrawerItemComponent = ({
  label,
  onClick,
  subMenus,
}: MenuDrawerItemComponentProps) => {
  const [isExpanded, setIsExpanded] = useState<number>(-1);

  const toggleExpanded = () => {
    setIsExpanded(isExpanded === 0 ? -1 : 0);
  };

  if (subMenus) {
    return (
      <>
        <Accordion defaultIndex={[0]} index={isExpanded}>
          <AccordionItem
            border={"none"}
            bgColor={"gray.700"}
            onClick={toggleExpanded}
            mb={4}
          >
            <h2>
              <AccordionButton p={4}>
                <Box as="span" flex="1" textAlign="left">
                  {label}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {subMenus.map((subMenu, index) => (
                <Box
                  key={index}
                  w={"100%"}
                  p={2}
                  onClick={subMenu.onClick}
                  _hover={{
                    cursor: "pointer",
                    backgroundColor: "gray.600",
                  }}
                >
                  {subMenu.label}
                </Box>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </>
    );
  }

  return (
    <>
      <Box
        w={"100%"}
        h={50}
        p={2}
        onClick={onClick}
        bgColor={"gray.700"}
        _hover={{
          cursor: "pointer",
          backgroundColor: "gray.600",
        }}
      >
        <Center float={"left"} h={"100%"}>{label}</Center>
      </Box>
    </>
  );
};

export default MenuDrawerItemComponent;
