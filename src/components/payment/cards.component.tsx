import {
  Button,
  Flex,
  Icon,
  Image,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";

const MyCards = ({ isVisible }: { isVisible: boolean }) => {
  // Global component styles
  const bgContainer = useColorModeValue("#f6f7fc", "#2d3748");
  const bgElements = useColorModeValue("#ffffff", "#2a2e38");

  const savedCards = [
    {
      id: 1,
      title: "Master Card",
      icono: BsThreeDotsVertical,
      img: "/assets/icons/mastercard.svg",
      number: "**** **** **** 3456",
    },
    {
      id: 2,
      title: "Visa",
      icono: BsThreeDotsVertical,
      img: "/assets/icons/visa.svg",
      number: "**** **** **** 3697",
    },
    {
      id: 3,
      title: "Visa",
      icono: BsThreeDotsVertical,
      img: "/assets/icons/visa.svg",
      number: "**** **** **** 1234",
    },
  ]; // @Emmanuel: Add the real cards.

  return (
    <>
      {/* This component contains all saved cards. */}
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
        {savedCards.map((card) => (
          <Flex
            key={card.id}
            w={"100%"}
            h={"auto"}
            as={Button}
            direction={"row"}
            p={4}
            placeContent={"start"}
            bg={bgElements}
          >
            {/* The icon allow you to redirect to another page (where the saved cards are) */}
            <Icon
              alignSelf={"center"}
              boxSize={6}
              color={"gray"}
              as={card.icono}
              mr={2}
            />
            <Flex direction={"column"} alignItems={"start"}>
              <Text fontWeight={"bold"}>{card.title}</Text>

              <Flex direction={"row"} pt={2}>
                <Image
                  src={card.img}
                  alt="Imagen de la tarjeta"
                  h={8}
                  w={8}
                ></Image>
                <Text alignSelf={"center"}>{card.number}</Text>
              </Flex>
            </Flex>
          </Flex>
        ))}
      </SimpleGrid>
    </>
  );
};

export default MyCards;
