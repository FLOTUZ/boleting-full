//This component has the payment options (cards and cash)

import MyCards from "./my-cards.component";
import CashComponent from "./cash.component";
import { Flex, Heading } from "@chakra-ui/react";

import { AiOutlineCreditCard } from "react-icons/ai";
import { BsCashCoin } from "react-icons/bs";
import ExpandedPanelComponent from "./expanded-panel";

const PaymentOptionsComponent = () => {
  return (
    <>
      <Flex h={"100%"} placeContent={"center"}>
        <Flex direction={"column"} w={"100%"} alignSelf={"center"}>
          <Heading
            m={"16px 0"}
            size="lg"
            fontWeight={"semibold"}
            alignSelf={"center"}
          >
            Opciones de pago
          </Heading>

          <ExpandedPanelComponent
            icon={AiOutlineCreditCard}
            title={"Tarjeta de credito o debito"}
            isDefaultExpanded={false}
          >
            <MyCards isVisible={false} />
          </ExpandedPanelComponent>

          <ExpandedPanelComponent icon={BsCashCoin} title={"Pago en efectivo"}>
            <CashComponent isVisible={false} />
          </ExpandedPanelComponent>
        </Flex>
      </Flex>
    </>
  );
};

export default PaymentOptionsComponent;
