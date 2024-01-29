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
          p={4}
          mt={4}
          w={"100%"}
          border={"1px solid #808080"}
          borderRadius="md"
          _hover={{ shadow: "md", bg: "gray.100", cursor: "pointer" }}
          _dark={{ _hover: { bg: "gray.700" } }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Icon mr={4} as={icon} boxSize={6} />
          <Text pl="2" flex="1" fontSize="md">
            {title}
          </Text>

          {isOpen ? <FaAngleUp size={20} /> : <FaAngleDown size={20} />}
        </Flex>

        {/* saved cards or options to pay with cash */}
        <Box w={"100%"}>
          <Collapse in={isOpen} animateOpacity>
            <Box mt={4}> {children}</Box>
          </Collapse>
        </Box>
      </Flex>
    </>
  );
};

export default ExpandedPanelComponent;
