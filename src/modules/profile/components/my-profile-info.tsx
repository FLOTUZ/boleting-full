import { useSession } from "@/hooks/useSession";
import { useEffect } from "react";
import { Box, Button, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";

//Here is all the  sections that help the user
const MyProfileInfo = () => {
  const { user } = useSession();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Flex placeContent={"center"}>
      <SimpleGrid
        templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
        mt="108px"
        w="95%"
        gap="8px"
      >
        <Button h="80px" border={"1px solid white"}>
          <Image
            src="/assets/icons/ticket.svg"
            alt="ticket"
            h="50px"
            w="50px"
          ></Image>
          <Text fontWeight="normal" fontSize="md">
            Mis boletos
          </Text>
        </Button>

        <Button h="80px" border={"1px solid white"}>
          <Image
            src="/assets/icons/card.svg"
            alt="ticket"
            h="50px"
            w="50px"
          ></Image>
          <Text fontWeight="normal" fontSize="md">
            Pedidos y pagos
          </Text>
        </Button>
      </SimpleGrid>
    </Flex>
  );
};

export default MyProfileInfo;
