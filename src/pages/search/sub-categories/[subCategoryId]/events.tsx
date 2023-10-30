import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import {
  useSearchEventsBySubcategoryLazyQuery,
  Event,
  EventSubCategory,
} from "@/gql/generated";
import LandingLayout from "@/layouts/landing-layout.component";
import { SearchEventById } from "@/routes";
import { Container, HStack, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SearchEventsBySubcategoryRoute = () => {
  const router = useRouter();
  const { categoryId, subCategoryId } = router.query;
  const [events, setEvents] = useState<Event[]>([]);
  const [subCategory, setSubCategory] = useState<EventSubCategory>();

  const [eventsBySubcategory, { loading, error }] =
    useSearchEventsBySubcategoryLazyQuery({
      variables: {
        subCategoryId: Number(subCategoryId),
      },
      onCompleted(data) {
        setEvents(data.eventsBySubcategory as Event[]);
        setSubCategory(data.eventSubCategory as EventSubCategory);
      },
    });

  useEffect(() => {
    if (subCategoryId) {
      eventsBySubcategory();
    }
  }, [eventsBySubcategory, subCategoryId]);

  if (loading) {
    return <ProgressLoaderComponent />;
  }

  return (
    <LandingLayout>
      <IntroAnimationComponent data={events}>
        <Heading>Eventos de {subCategory?.name}</Heading>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing="40px" mt={4}>
          {events.map((event) => (
            <Link key={event.id} href={SearchEventById(String(event.id))}>
              <Container
                key={event.id}
                maxW={400}
                border={"1px"}
                borderColor={"gray.200"}
                borderRadius={"lg"}
                p={4}
                _hover={{
                  boxShadow: "lg",
                  cursor: "pointer",
                }}
                _dark={{
                  _hover: {
                    boxShadow: "dark-lg",
                  },
                }}
              >
                {event.event_banner_url && (
                  <Image
                    width={400}
                    height={400}
                    src={event.event_logo_url!}
                    layout="responsive"
                    alt={`image of event ${event.name}`}
                  />
                )}
                <Text>{event.name}</Text>
                <HStack
                  display={"flex"}
                  justifyContent={"start"}
                  alignItems={"start"}
                >
                  <Text>{new Date(event.start_date).toDateString()}</Text>
                  <Text>{event.start_time}</Text>
                </HStack>
                <Text>Desde: $ {event.price_from ?? 0}</Text>
                <Text>{event.organization.name}</Text>
              </Container>
            </Link>
          ))}
        </SimpleGrid>
      </IntroAnimationComponent>
    </LandingLayout>
  );
};

export default SearchEventsBySubcategoryRoute;
