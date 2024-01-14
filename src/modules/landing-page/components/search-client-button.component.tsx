import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import { Event, Organization, useMainSearchLazyQuery } from "@/gql/generated";
import { SearchEventById, SearchOrganizationById } from "@/routes";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Img,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Progress,
  Text,
  Tooltip,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchClientButtonComponent = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [isLargerThan800] = useMediaQuery("(min-width: 420px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [eventList, setEventList] = useState<Event[]>([]);
  const [organizationList, setOrganizationList] = useState<Organization[]>([]);

  const [onSearch, { loading, error, observable }] = useMainSearchLazyQuery({
    fetchPolicy: "network-only",
    onCompleted(data) {
      setEventList(data.search_events as Event[]);
      setOrganizationList(data.searchOrganizations as Organization[]);
    },
  });

  const handleSearch = (query: string) => {
    if (!query || query.length < 3) {
      setEventList([]);
      setOrganizationList([]);
      return;
    }

    onSearch({
      variables: { query },
    });
  };

  if (error) {
    return <Text>{error.graphQLErrors.map((error) => error.message)}</Text>;
  }

  return (
    <>
      <Button
        maxW={"fit-content"}
        colorScheme="gray"
        color={"gray"}
        onClick={onOpen}
      >
        <AiOutlineSearch />
        &nbsp;
        {isLargerThan800 ? "Buscar" : null}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={"full"}
        motionPreset={"slideInRight"}
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading>Buscar</Heading>
            <Heading size={"md"}>Eventos, organizadores y mucho más</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Buscar..."
              onChange={({ target: { value } }) => handleSearch(value)}
            />

            {loading ?? <Progress my={4} size="xs" isIndeterminate />}

            {eventList.length == 0 && organizationList.length == 0 ? (
              <Text>No se encontraron resultados</Text>
            ) : null}

            {eventList.length == 0 ? null : (
              <>
                <Heading size={"md"} mt={8}>
                  Eventos
                </Heading>
                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                  }}
                  mt={4}
                  gap={4}
                >
                  {eventList.map((event, index) => (
                    <Link
                      key={index}
                      target="_blank"
                      href={SearchEventById(String(event.id))}
                    >
                      <GridItem w={"100%"}>
                        <Card w="100%">
                          <CardBody p={isMobile ? "0" : "4"}>
                            {/* /Here are the detail about the event/ */}
                            <Flex w={isMobile ? "100%" : "auto"}>
                              <Box>
                                <Img
                                  src={event.event_logo_url || ""}
                                  alt="Imagen del evento"
                                  objectFit={"cover"}
                                  height={isMobile ? "100%" : 58}
                                  width={isMobile ? 100 : 58}
                                  borderRadius={5}
                                />
                              </Box>
                              <Box ml={4}>
                                <Text fontWeight={"bold"}>{event.name}</Text>
                                <Text mb={2}>
                                  {event.description === null ? (
                                    "sin descripción"
                                  ) : (
                                    <>
                                      {event
                                        .description!.split(" ")
                                        .slice(0, 10)
                                        .join(" ")}
                                      {"..."}
                                      <Box
                                        display={{
                                          base: "block",
                                          md: "inline",
                                        }}
                                        mt={2}
                                      >
                                        <Text as="i" fontWeight="bold">
                                          {" ver más"}
                                        </Text>
                                      </Box>
                                    </>
                                  )}
                                </Text>
                              </Box>
                            </Flex>
                          </CardBody>
                        </Card>
                      </GridItem>
                    </Link>
                  ))}
                </Grid>
              </>
            )}

            {eventList.length == 0 ? null : (
              <>
                <Heading size={"md"} mt={8}>
                  Organizaciones
                </Heading>
                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                  }}
                  mt={4}
                  gap={4}
                >
                  {organizationList.map((organization, index) => (
                    <Link
                      key={index}
                      target="_blank"
                      href={SearchOrganizationById(String(organization.id))}
                    >
                      <GridItem>
                        <Card w={isMobile ? "100%" : "50%"}>
                          <CardBody p={isMobile ? "0" : "4"}>
                            <Text>{organization.name} </Text>
                          </CardBody>
                        </Card>
                      </GridItem>
                    </Link>
                  ))}
                </Grid>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchClientButtonComponent;
