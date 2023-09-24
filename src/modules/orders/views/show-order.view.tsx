import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import ProductDetail from "../components/product-detail.component";
import PaymentOptions from "../components/payment-options.component";

const ShowOrderView = () => {
  return (
    <>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={4}
        alignItems="center"
      >
        {/* Payment */}
        <GridItem>
          <PaymentOptions />
        </GridItem>

        {/* Product Detail */}
        <GridItem display={{ base: "none", md: "block" }}>
          <ProductDetail />
        </GridItem>
      </Grid>
    </>
  );
};

export default ShowOrderView;
