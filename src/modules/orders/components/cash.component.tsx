import {
  Box,
  Button,
  Flex,
  Img,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FcDebt } from "react-icons/fc";

const CashComponent = ({ isVisible }: { isVisible: boolean }) => {
  const bgContainer = useColorModeValue("#f6f7fc", "#2d3748");
  const bgElements = useColorModeValue("#ffffff", "#2a2e38");
  const options = [
    {
      id: 1,
      title: "Distribuidor",
      img: "/assets/icons/dealer.svg",
    },
    {
      id: 2,
      title: "OXXO",
      img: "/assets/icons/oxxo.svg",
    },
  ];

  return (
    <>
      <Box>
        <SimpleGrid
          templateColumns={{
            base: "1fr",
            lg: "repeat(auto-fit, minmax(48%, 1fr))",
          }}
          gap={2}
          w={"98%"}
          alignItems="start"
          p={4}
          borderRadius="md"
          bg={bgContainer}
          mb={2}
        >
          {options.map((option) => (
            <Flex
              key={option.id}
              w={"100%"}
              h={"auto"}
              as={Button}
              direction={"row"}
              p={4}
              placeContent={"start"}
              bg={bgElements}
            >
              <Img
                src={option.img}
                alt="Imagen de la tarjeta"
                h={8}
                w={8}
                pr={2}
              />
              <Text fontWeight={"bold"}>{option.title}</Text>
            </Flex>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default CashComponent;
