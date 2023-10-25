import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

import {
  Event,
  EventCategory,
  EventSubCategory,
  useSearchEventsByCategoryLazyQuery,
} from "@/gql/generated";

import {
  Box,
  Card,
  CardBody,
  Divider,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import Link from "next/link";
import { SearchEventById, SearchEventsBySubcategoryPath } from "@/routes";

const EventsByCategoryView = () => {
  const [category, setCategory] = useState<EventCategory>();
  const [events, setEvents] = useState<Event[]>([]);
  const [subCategories, setSubCategories] = useState<EventSubCategory[]>([]);

  const router = useRouter();
  const { categoryId } = router.query;

  const [GET_DATA, { loading }] = useSearchEventsByCategoryLazyQuery({
    variables: {
      categoryId: Number(categoryId),
    },
    onCompleted(data) {
      setCategory(data.eventCategory as EventCategory);
      setEvents(data.eventsByCategory as Event[]);
      setSubCategories(data.eventSubCategoriesByCategory as EventSubCategory[]);
    },
  });

  useEffect(() => {
    if (categoryId) GET_DATA();
  }, [GET_DATA, categoryId]);

  if (loading) {
    return <ProgressLoaderComponent />;
  }

  return (
    <Box m={4}>
      <Heading as="h1" size="lg" mb={4}>
        {category?.name}
      </Heading>

      <Heading as="h2" size="md" mb={4}>
        Subcategorias
      </Heading>
      <Box display={"flex"} flexWrap={"wrap"}>
        {subCategories.map((subCategory, index) => (
          <Link
            key={index}
            href={SearchEventsBySubcategoryPath(String(subCategory.id))}
          >
            <Box
              key={index}
              m={2}
              h={150}
              w={150}
              borderRadius={100}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              border={"1px solid #ccc"}
              cursor={"pointer"}
              _hover={{
                textDecoration: "underline",
              }}
            >
              {subCategory.name}
            </Box>
          </Link>
        ))}
      </Box>

      <Heading as="h3" size="sm" mb={4}>
        Eventos
      </Heading>
      <Box>
        <SimpleGrid columns={[1, 3, 5]} spacing={4}>
          {events.map((event, index) => (
            <Link key={index} href={SearchEventById(String(event.id))}>
              <Card
                maxW="sm"
                shadow={"md"}
                _hover={{
                  shadow: "lg",
                  shadowColor: "red",
                }}
              >
                <CardBody>
                  <Image
                    src={event.event_logo_url || "/next.svg"}
                    alt="Green double couch with wooden legs"
                    width={1770}
                    height={1180}
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{event.name}</Heading>
                    <Text>{event.description || "Sin descripción"}</Text>
                    <Text color="blue.600" fontSize="2xl">
                      ${event.price_from || 0} - ${event.price_to || 0} MXN
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
              </Card>
            </Link>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default EventsByCategoryView;
