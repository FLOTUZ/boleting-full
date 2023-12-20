import { Box, GridItem, SimpleGrid } from "@chakra-ui/react";
import ProductDetail from "../components/product-detail.component";
import PaymentOptions from "../components/payment-options.component";

const ShowOrderView = () => {
  return (
    <>
      <Box borderTop={"1px solid #808080"}>
        <SimpleGrid
          templateColumns={{
            base: "1fr",
            md: "repeat(3, 1fr)",
          }}
        >
          {/* Payment */}
          <GridItem colSpan={2}>
            <PaymentOptions />
          </GridItem>

          {/* Product Detail */}
          <GridItem display={{ base: "none", md: "block" }}>
            <ProductDetail />
          </GridItem>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default ShowOrderView;
