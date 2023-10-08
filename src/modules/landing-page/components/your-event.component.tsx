import { LoginPath } from "@/routes";
import { Flex, Heading, Button, Text, Divider } from "@chakra-ui/react";
import Link from "next/link";

const YourEvent = () => {
  return (
    <>
      <Divider />
      <Flex
        bg="white"
        _dark={{
          bg: "gray.800",
        }}
        direction={"column"}
        p={50}
        w="full"
        alignItems="center"
        justifyContent="center"
      >
        <Heading
          textAlign="center"
          as="h3"
          size="lg"
          letterSpacing="tight"
          mb={6}
        >
          ¿Quieres vender tu evento con nosotros?
        </Heading>
        <Text
          mb={4}
          fontSize="lg"
          color="brand.600"
          _dark={{
            color: "gray.400",
          }}
          letterSpacing="wider"
        >
          Comienza ahora
        </Text>
        <Button
          border="solid trasparent"
          fontWeight="bold"
          rounded="md"
          h="50px"
          _light={{
            color: "#1a202ceb",
          }}
          _dark={{
            bg: "brand.500",
          }}
          _hover={{
            bg: "#dae5f1f7",
            _dark: {
              bg: "#2c313d",
            },
          }}
        >
          Saber más
        </Button>
      </Flex>
    </>
  );
};

export default YourEvent;
