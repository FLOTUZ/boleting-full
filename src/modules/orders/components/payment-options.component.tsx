import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  Link,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { AiOutlineCreditCard } from "react-icons/ai";
import { BsCashCoin } from "react-icons/bs";

const PaymentOptions = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const opciones = [
    {
      id: 1,
      value: "opocion1",
      texto: "Tarjeta de credito o debito",
      icono: AiOutlineCreditCard,
      name: "pago",
    },
    {
      id: 2,
      value: "opocion2",
      texto: "Pago en efectivo",
      icono: BsCashCoin,
      name: "pago",
    },
  ];
  return (
    <>
      <Flex h={"100%"} p={4} placeItems={"center"} placeContent={"center"}>
        <Box w={isMobile ? "100%" : "80%"}>
          {/* Payment Options */}
          <Heading mb={8} size="lg" fontWeight={"semibold"}>
            Opciones de pago
          </Heading>
          <RadioGroup>
            {opciones.map((opcion) => (
              <Flex
                flexWrap="wrap"
                border={"1px solid #808080"}
                key={opcion.id}
                align="center"
                p={4}
                borderRadius="md"
                mb={2}
              >
                <Icon mr={4} as={opcion.icono} boxSize={6} />
                <Text pl="2" flex="1" fontSize="md">
                  {opcion.texto}
                </Text>
                <Radio
                  value={opcion.value}
                  name={opcion.name}
                  size="md"
                  m={"0, 4, 0, 4"}
                />
              </Flex>
            ))}
          </RadioGroup>
        </Box>
      </Flex>
    </>
  );
};

export default PaymentOptions;
