import { Box, useColorModeValue } from "@chakra-ui/react";

const ProductDetail = () => {
  const bg = useColorModeValue("#edf2f7", "gray.700");
  const color = useColorModeValue("gray.800", "white");
  return (
    <Box h="100vh" bg={bg}>
      Detalle
    </Box>
  );
};

export default ProductDetail;
