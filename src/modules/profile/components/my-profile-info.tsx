import { useSession } from "@/hooks/useSession";
import { useEffect } from "react";
import { Box, Button, Flex, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import { IoTicketSharp } from "react-icons/io5";
import { AiFillCreditCard } from "react-icons/ai";

//Here is all the  sections that help the user
const MyProfileInfo = () => {
  const { user } = useSession();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Box as={Flex} placeContent={"center"}>
      <SimpleGrid
        templateColumns={{ base: "1", md: "repeat(2, 1fr)" }}
        mt="108px"
        w="95%"
        gap="8px"
      >
        <Button p="4px" h="80px">
          <Icon as={IoTicketSharp} m={"8px"} />
          <Text fontWeight="normal" fontSize="md">
            Mis boletos
          </Text>
        </Button>

        <Button p="4px" h="80px">
          <Icon as={AiFillCreditCard} m={"8px"} />
          <Text fontWeight="normal" fontSize="md">
            Pedidos y pagos
          </Text>
        </Button>
      </SimpleGrid>
    </Box>
  );
};

export default MyProfileInfo;
