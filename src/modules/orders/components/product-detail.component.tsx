import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const ProductDetail = () => {
  const bg = useColorModeValue("#edf2f7", "gray.700");
  return (
    <>
      <Flex w="100%" h="100%" justify="center" align="center">
        <Flex direction="column" p="8px" borderRadius="14px" w="90%" bg={bg}>
          <Image
            borderRadius="14px"
            src={"/assets/foto_provisional_eventos.jpg"}
            alt="Imagen del evento"
            h="320px"
            w="full"
            objectFit="cover"
          />
          <Box>
            <Heading size="lg">Dia de muertos</Heading>
            <Text color="gray">02/nov/2024 8:00pm</Text>
            <Text color="gray" fontWeight="semibold">
              Morelia
            </Text>
            <Text color="gray" fontWeight="semibold">
              Presencial
            </Text>
            <Divider mt="8px" />
            <Flex mt="8px">
              <Text>Cantidad: </Text>
              <Spacer />
              <Text>1</Text>
            </Flex>
            <Flex mt="8px">
              <Text>Total: </Text>
              <Spacer />
              <Text>$100 mxn</Text>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default ProductDetail;
