import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import {
  Box,
  Button,
  Divider,
  GridItem,
  SimpleGrid,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import Image from "next/image";
import {
  AccessType,
  Event,
  useSelectPaymentMethodLazyQuery,
} from "@/gql/generated";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";
import moment from "moment";

const ProductDetailComponent = () => {
  const [isMobile] = useMediaQuery("(max-width: 767px)");
  const router = useRouter();

  const { eventId, accessTypeId } = router.query;

  const [ticketQuantity, setTicketQuantity] = useState<number>(1);
  const [accessType, setAccessType] = useState<AccessType>();
  const [event, setEvent] = useState<Event>();

  const [GET_ACCESS_TYPE, { loading, data }] = useSelectPaymentMethodLazyQuery({
    variables: {
      accessTypeId: Number(accessTypeId),
      eventId: Number(eventId),
    },
    onCompleted(data) {
      setAccessType(data.accessType as AccessType);
      setEvent(data.event as Event);
    },
  });

  useEffect(() => {
    if (accessTypeId) {
      GET_ACCESS_TYPE();
    }
  }, [accessTypeId, GET_ACCESS_TYPE]);

  if (loading) {
    return <ProgressLoaderComponent />;
  }

  return (
    <>
      {/* Detail to my purchase */}
      <Box display={"flex"} justifyContent={"center"} w={"100%"} mt={4}>
        <Box
          display={"flex"}
          flexDirection="column"
          justifyContent={"center"}
          bg={"gray.100"}
          _dark={{ bg: "gray.700" }}
          maxW={isMobile ? "100%" : "fit-content"}
        >
          <Image
            src={
              event?.event_banner_url ||
              "https://us.123rf.com/450wm/yoginta/yoginta2301/yoginta230100567/196853824-imagen-no-encontrada-ilustraci%C3%B3n-vectorial.jpg"
            }
            height={100}
            alt="Imagen del evento"
            width={480}
            objectPosition="center"
            objectFit="cover"
            style={{
              borderRadius: "5px",
              maxHeight: "300px",
            }}
          />
          <Box display={"flex"} p="16px 24px" flexDirection="column">
            {/* Information about my purchase */}
            <Box display={"flex"} justifyContent="space-between" pb={2}>
              <Text>
                {ticketQuantity} x {accessType?.name}
              </Text>
              <Text>{accessType?.price} c/u</Text>
            </Box>
            <Box display={"flex"} justifyContent="space-between" pb={4}>
              <Text color="gray">
                {event &&
                  moment(new Date(event?.start_date))
                    .locale("es")
                    .format("LLL")}
              </Text>

              <Text color="gray" fontWeight="semibold">
                {event?.event_location}
              </Text>
            </Box>

            <Divider />
            <Box display={"flex"} justifyContent="space-between" mt={4}>
              <Text>Cantidad: </Text>
              <Text>
                <Button
                  colorScheme="blackAlpha"
                  _dark={{ color: "white" }}
                  mr={4}
                  onClick={() =>
                    ticketQuantity > 1 && setTicketQuantity(ticketQuantity - 1)
                  }
                >
                  <CgMathMinus />
                </Button>

                {ticketQuantity}

                <Button
                  colorScheme="blackAlpha"
                  _dark={{ color: "white" }}
                  ml={4}
                  onClick={() =>
                    ticketQuantity < 10 && setTicketQuantity(ticketQuantity + 1)
                  }
                >
                  <CgMathPlus />
                </Button>
              </Text>
            </Box>
            <Box display={"flex"} mt={4} justifyContent={"space-between"}>
              <Text fontWeight={"bold"}>Total: </Text>
              <Text fontWeight={"bold"}>
                ${accessType?.price * ticketQuantity} MXN
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductDetailComponent;
