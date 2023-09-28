import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { AiFillCreditCard } from "react-icons/ai";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";

const PaymentOptions = () => {
  return (
    <>
      <Flex w="100%" h="100%" justify="center" align="center">
        <Flex direction="column" h="auto" w="90%" p="8px" borderRadius="14px">
          <Heading size="lg" mb="8px">
            ¿Cómo quieres pagar?
          </Heading>
          <Box p="4px">
            <Flex width="100%">
              <Button w="100%" h="64px">
                <Text fontWeight="normal" fontSize="md">
                  Tarjeta credito
                </Text>
                <Spacer />
                <Icon as={AiFillCreditCard} ml={2} />
              </Button>
            </Flex>
          </Box>

          <Box p="4px">
            <Flex width="100%">
              <Button w="full" h="64px">
                <Text fontWeight="normal" fontSize="md">
                  Tarjeta debito
                </Text>
                <Spacer />
                <Icon as={BsFillCreditCard2FrontFill} ml={2} />
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default PaymentOptions;
