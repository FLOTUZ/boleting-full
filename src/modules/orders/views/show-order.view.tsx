import { Box, Grid, GridItem } from "@chakra-ui/react";
import ProductDetail from "../components/product-detail.component";
import PaymentOptions from "../components/payment-options.component";

const ShowOrderView = () => {
  return (
    <>
      <Box h="100%">
        <Grid
          h="100%"
          mt="10px"
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={4}
        >
          {/* Payment */}
          <GridItem h="100%">
            <PaymentOptions />
          </GridItem>

          {/* Product Detail */}
          <GridItem h="100%" display={{ base: "none", md: "block" }}>
            <ProductDetail />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default ShowOrderView;
