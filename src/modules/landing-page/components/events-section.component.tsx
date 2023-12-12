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
  Event,
  EventCategory,
  useShowEventCategoriesLazyQuery,
  useShowEventsLazyQuery,
  useShowEventsQuery,
} from "@/gql/generated";
import { useEffect, useState } from "react";
import { SearchEventsByCategoryPath } from "@/routes";

interface EventsSectionProps {
  events: Event[];
  categories: EventCategory[];
  isLoading?: boolean;
}
const EventsSection = ({
  events,
  categories,
  isLoading,
}: EventsSectionProps) => {
  return (
    <Box margin={9}>
      <Heading as="h3" size="lg" mb={4}>
        Eventos y categorias
      </Heading>

      {isLoading ? (
        <SkeletonCircle size="10" />
      ) : (
        <SimpleGrid columns={[2, 3, 4]} spacing={2}>
          {categories.map((category, index) => (
            <Button
              key={index}
              as={Link}
              py={6}
              href={SearchEventsByCategoryPath(String(category.id))}
              variant="outline"
              textAlign={"center"}
              css={{
                textWrap: "wrap",
              }}
            >
              {category.name}
            </Button>
          ))}
        </SimpleGrid>
      )}

      <EventCards
        events={[
          // remove first event
          ...events.slice(1),
        ]}
      />
    </Box>
  );
};

export default EventsSection;
