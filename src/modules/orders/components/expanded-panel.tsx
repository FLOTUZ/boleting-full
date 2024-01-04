//This component show options and details to pay
//@Emmanuel Do what is necessary in this component
import { useState } from "react";
import {
  Box,
  Collapse,
  Flex,
  Icon,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";

import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { IconType } from "react-icons";

interface ExpandedPanelProps {
  icon: IconType;
  title: string;
  isDefaultExpanded?: boolean;
  children: JSX.Element;
}

const ExpandedPanelComponent = ({
  icon,
  title,
  children,
  isDefaultExpanded,
}: ExpandedPanelProps) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [isOpen, setIsOpen] = useState<boolean>(
    isDefaultExpanded ? true : false
  );

  return (
    <>
      <Flex //container
        w={"100%"}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Flex //options to pay
          w={isMobile ? "100%" : "80%"}
          border={"1px solid #808080"}
          p={4}
          m={2}
          borderRadius="md"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Icon mr={4} as={icon} boxSize={6} />
          <Text pl="2" flex="1" fontSize="md">
            {title}
          </Text>

          {isOpen ? <FaAngleUp size={20} /> : <FaAngleDown size={20} />}
        </Flex>

        {/* saved cards or options to pay with cash */}
        <Box w={isMobile ? "100%" : "80%"}>
          <Collapse in={isOpen} animateOpacity>
            {children}
          </Collapse>
        </Box>
      </Flex>
    </>
  );
};

export default ExpandedPanelComponent;
