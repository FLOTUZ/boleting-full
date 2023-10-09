import { useSession } from "@/hooks/useSession";
import {
  AbsoluteCenter,
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Icon,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { BiSolidPencil } from "react-icons/bi";

const MyProfileHeader = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { user } = useSession();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Center>
      <Box
        bg={"#edf2f7"} //this will be a random image
        _dark={{ bg: "#2c313d" }}
        m={{ md: "8px 16px" }}
        w={{ base: "100%", md: "100%" }}
        h={{ base: "100px", md: "150px" }}
        borderRadius={{ md: "8px" }}
        position="relative"
      >
        <AbsoluteCenter
          w="100%"
          top={{ base: "50%", md: "75%" }}
          transform="translateX(-50%)"
        >
          <Grid
            p="8px 16px"
            templateColumns={{ sm: "repeat(2, auto)", md: "repeat(2, auto)" }}
            templateRows={{ sm: "repeat(2,auto)", md: "repeat(1, auto)" }}
            w="100%"
          >
            <Flex
              flexDirection={{ base: "column", md: "row" }}
              alignItems={{ base: "center", md: "flex-end" }}
              justifyItems="center"
            >
              <Box
                as={Avatar}
                p={2}
                borderRadius={{ base: "50%", md: "8" }}
                size={{ base: "lg", md: "xl" }}
              />
              <Box>
                <Flex direction={"column"} alignSelf="end" ml={"8px"}>
                  <Text fontSize="2xl">
                    {user?.name + " " + user?.last_name}
                  </Text>
                  <Text color="gray">{user?.email}</Text>
                </Flex>
              </Box>
            </Flex>

            <GridItem alignSelf="end" justifySelf="end">
              <Box>
                {isMobile ? (
                  <Icon as={BiSolidPencil} w="8" h="8" onClick={() => {}} />
                ) : (
                  <Button onClick={() => {}}>Editar Perfil</Button>
                )}
              </Box>
            </GridItem>
          </Grid>
        </AbsoluteCenter>
      </Box>
    </Center>
  );
};

export default MyProfileHeader;
