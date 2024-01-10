import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import { Event, Organization, useMainSearchLazyQuery } from "@/gql/generated";
import { SearchEventById, SearchOrganizationById } from "@/routes";
import {
  Button,
  Card,
  CardBody,
  Grid,
  GridItem,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Progress,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchClientButtonComponent = () => {
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
                <Grid mt={4} templateColumns={"repeat(2, 1fr)"} gap={4}>
                  {eventList.map((event, index) => (
                    <Link
                      key={index}
                      target="_blank"
                      href={SearchEventById(String(event.id))}
                    >
                      <GridItem>
                        <Card>
                          <CardBody>
                            <Text>{event.name} </Text>
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
                <Grid mt={4} templateColumns={"repeat(2, 1fr)"} gap={4}>
                  {organizationList.map((organization, index) => (
                    <Link
                      key={index}
                      target="_blank"
                      href={SearchOrganizationById(String(organization.id))}
                    >
                      <GridItem>
                        <Card>
                          <CardBody>
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
