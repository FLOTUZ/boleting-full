import {
  Button,
  Divider,
  Flex,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";

const ProductDetail = () => {
  const bg = useColorModeValue("#edf2f7", "gray.700");
  return (
    <>
      <Flex direction="column" bg={bg}>
        <Image
          src={"/assets/foto_provisional_eventos.jpg"}
          alt="Imagen del evento"
          h="200px"
          w="full"
          objectFit="cover"
        />
        <Flex
          h="calc(100% -200px)"
          p="16px 24px"
          direction="column"
          justifyContent={"space-between"}
        >
          <Text pb="4" size="2xl" fontWeight={"bold"}>
            Resumen de la orden
          </Text>
          <Flex justifyContent="space-between" pb={4}>
            <Text size="lg">1 x Dia de muertos 2024</Text>
            <Text size="lg">$80</Text>
          </Flex>
          <Flex justifyContent="space-between" pb={4}>
            <Text color="gray">02/nov/2024 8:00pm</Text>
            <Text color="gray" fontWeight="semibold">
              Morelia | Presencial
            </Text>
          </Flex>

          <Divider mt={2} />
          <Flex justifyContent="space-between" mt={4}>
            <Text>Cantidad: </Text>
            <Text>
              <Button colorScheme="facebook" as={CgMathPlus} mr={4} />
              2
              <Button colorScheme="facebook" as={CgMathMinus} ml={4} />
            </Text>
          </Flex>
          <Flex mt={4} justifyContent={"space-between"}>
            <Text fontWeight={"bold"}>Total: </Text>
            <Text fontWeight={"bold"}>$160 mxn</Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default ProductDetail;
