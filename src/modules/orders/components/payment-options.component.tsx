import { BsCashCoin } from "react-icons/bs";
import CashComponent from "./cash.component";
import ExpandedPanelComponent from "./expanded-panel";
import { Box, GridItem, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { CreateOrderPath } from "@/routes";
import { useState } from "react";
import { AiOutlineCreditCard } from "react-icons/ai";

interface PaymentOptionsProps {
  onSubmit: ({
    eventId,
    accessTypeId,
  }: {
    eventId: number;
    accessTypeId: number;
  }) => void;
}
const PaymentOptionsComponent = ({ onSubmit }: PaymentOptionsProps) => {
  const [isMobile] = useMediaQuery("(max-width: 767px)");
  const router = useRouter();

  const { eventId, accessTypeId } = router.query;

  return (
    <>
      <Box display={"flex"} justifyContent={"center"} mt={4}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          w={isMobile ? "100%" : "80%"}
          alignContent={"center"}
        >
          <Heading
            m={"16px 0"}
            size="lg"
            fontWeight={"semibold"}
            alignSelf={"center"}
          >
            Opciones de pago
          </Heading>

          <Box
            w={isMobile ? "80%" : "100%"}
            display={"flex"}
            flexDirection={"row"}
            py={4}
            px={2}
            borderColor={"gray.200"}
            borderWidth={1}
            borderRadius={5}
            alignSelf={"center"}
            _hover={{ shadow: "md", cursor: "pointer" }}
            _dark={{ _hover: { bg: "gray.700" } }}
            onClick={() => {
              onSubmit({
                eventId: Number(eventId),
                accessTypeId: Number(accessTypeId),
              });
            }}
          >
            <Box mx={4}>
              <AiOutlineCreditCard size={isMobile ? 20 : 30} />
            </Box>

            <Text>Tarjeta de credito o debito.</Text>
          </Box>

          <ExpandedPanelComponent icon={BsCashCoin} title={"Pago en efectivo"}>
            <CashComponent isVisible={false} />
          </ExpandedPanelComponent>
        </Box>
      </Box>
    </>
  );
};

export default PaymentOptionsComponent;
