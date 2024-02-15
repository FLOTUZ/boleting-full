import { useState } from "react";
import PaymentOptionsComponent from "../components/payment-options.component";
import ProductDetailComponent from "../components/product-detail.component";
import { Box, Button, useMediaQuery } from "@chakra-ui/react";
import { Media } from "react-data-table-component";

const SelectPaymentMethodView = () => {
  const [isMobile] = useMediaQuery("(max-width: 760px)");
  const stepsToOrder = [
    <ProductDetailComponent />,
    <PaymentOptionsComponent />,
  ];

  const [currentStep, setCurrent] = useState(0);
  return (
    <>
      {stepsToOrder[currentStep]}
      <Box
        display="flex"
        w={isMobile ? "100%" : "auto"}
        justifyContent={"center"}
        mt={2}
      >
        <Button
          w={isMobile ? "full" : "480px"}
          onClick={() => setCurrent(currentStep + 1)}
        >
          Continuar
        </Button>
      </Box>
    </>
  );
};

export default SelectPaymentMethodView;
