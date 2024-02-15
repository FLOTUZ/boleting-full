import PaymentOptionsComponent from "../components/payment-options.component";
import ProductDetailComponent from "../components/product-detail.component";
import { useState } from "react";

import { Box, Button, useMediaQuery } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { CreateOrderPath } from "@/routes";

const SelectPaymentMethodView = () => {
  const router = useRouter();
  const [isMobile] = useMediaQuery("(max-width: 760px)");
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [currentBuyingStep, setCurrentBuyingStep] = useState(0);

  const stepsToOrder = [
    <ProductDetailComponent
      key={0}
      defaultBuyedTickets={ticketQuantity}
      onSubmit={(buyedTikets) => {
        setTicketQuantity(buyedTikets);
      }}
    />,
    <PaymentOptionsComponent
      key={1}
      onSubmit={(buyingParams) => {
        router.push(
          CreateOrderPath(
            String(buyingParams.eventId),
            String(buyingParams.accessTypeId),
            ticketQuantity
          )
        );
      }}
    />,
  ];

  return (
    <>
      {stepsToOrder[currentBuyingStep]}
      <Box
        display="flex"
        w={isMobile ? "100%" : "auto"}
        justifyContent={"center"}
        mt={2}
      >
        {currentBuyingStep !== stepsToOrder.length - 1 && (
          <Button
            w={isMobile ? "full" : "480px"}
            onClick={() => setCurrentBuyingStep(currentBuyingStep + 1)}
          >
            Continuar
          </Button>
        )}
      </Box>
    </>
  );
};

export default SelectPaymentMethodView;
