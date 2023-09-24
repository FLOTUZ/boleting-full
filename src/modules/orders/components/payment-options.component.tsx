import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { AiFillCreditCard } from "react-icons/ai";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";

const PaymentOptions = () => {
  return (
    <>
      <Grid
        templateColumns="1fr"
        gap={4}
        p={"10px"}
        borderRadius="8px"
        justifyItems="center"
        alignItems="center"
        h="100vh"
      >
        <Box w="90%">
          <GridItem p="4px" placeContent="center">
            <Flex alignItems="center" width="100%">
              <Button w="100%" h="64px">
                <Text fontWeight={"normal"} fontSize={"md"}>
                  Tarjeta credito
                </Text>
                <Spacer />
                <Icon as={AiFillCreditCard} ml={2} />
              </Button>
            </Flex>
          </GridItem>

          <GridItem p="4px" placeContent="center">
            <Flex alignItems="center" width="100%">
              <Button w="full" h="64px">
                <Text fontWeight={"normal"} fontSize={"md"}>
                  Tarjeta debito
                </Text>
                <Spacer />
                <Icon as={BsFillCreditCard2FrontFill} ml={2} />
              </Button>
            </Flex>
          </GridItem>
        </Box>
      </Grid>
    </>
  );
};

export default PaymentOptions;
