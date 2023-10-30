import {
  Box,
  Button,
  Heading,
  Link,
  SimpleGrid,
  SkeletonCircle,
} from "@chakra-ui/react";

import EventCards from "./event-cards.component";
import {
  EventCategory,
  useShowEventCategoriesLazyQuery,
} from "@/gql/generated";
import { useEffect, useState } from "react";
import { SearchEventsByCategoryPath } from "@/routes";

const EventsSection = () => {
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [GET_CATEGORIES, { data, loading }] = useShowEventCategoriesLazyQuery({
    onCompleted(data) {
      setCategories(data.eventCategories as EventCategory[]);
    },
  });

  useEffect(() => {
    GET_CATEGORIES();
  }, [GET_CATEGORIES]);

  return (
    <Box margin={9}>
      <Heading as="h3" size="lg" mb={4}>
        Eventos y categorias
      </Heading>

      {loading ? (
        <SkeletonCircle size="10" />
      ) : (
        <SimpleGrid columns={[2, 3, 4]} spacing={2}>
          {categories.map((category, index) => (
            <Button
              key={index}
              as={Link}
              href={SearchEventsByCategoryPath(String(category.id))}
              variant="outline"
            >
              {category.name}
            </Button>
          ))}
        </SimpleGrid>
      )}

      <EventCards />
    </Box>
  );
};

export default EventsSection;
