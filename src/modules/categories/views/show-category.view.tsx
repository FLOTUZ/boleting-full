import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import { EventCategory, useShowEventCategoryLazyQuery } from "@/gql/generated";

import { EditCategoryPath } from "@/routes";

import { Badge, Box, Button, Container, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import SubCategoriesByCategoryIdDatatableComponent from "../components/sub-categories-datatable.component";

const ShowCategoryView = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  const [eventCategory, setEventCategory] = useState<EventCategory>();

  const [GET_CATEGORY, { loading: categoryLoading, error: categoryError }] =
    useShowEventCategoryLazyQuery({
      variables: {
        eventCategoryId: Number(categoryId),
      },
      onCompleted(data) {
        setEventCategory(data.eventCategory as EventCategory);
      },
    });

  useEffect(() => {
    GET_CATEGORY();
  }, [GET_CATEGORY]);

  return (
    <IntroAnimationComponent data={eventCategory}>
      <Box m={4}>
        <HStack>
          <Link href={EditCategoryPath(String(categoryId))}>
            <Button>Editar</Button>
          </Link>
        </HStack>

        <Box mt={4}>
          <Text as="b">Nombre</Text>
          <Text>{eventCategory?.name}</Text>

          <Text as="b">Descripción</Text>
          <Text>{eventCategory?.description || "Sin descripción"}</Text>

          <Box>
            <Text as="b">Subcategorías: </Text>
            <Badge colorScheme="purple">
              {eventCategory?.sub_categories_count}
            </Badge>
          </Box>

          <Box>
            <Text as="b">Eventos: </Text>
            <Badge colorScheme="purple">{eventCategory?.events_count}</Badge>
          </Box>

          <Text as="b">Creado</Text>
          <Text>{new Date(eventCategory?.createdAt!).toLocaleString()}</Text>

          <Text as="b">Actualizado</Text>
          <Text>{new Date(eventCategory?.updatedAt!).toLocaleString()}</Text>
        </Box>
        <Box mt={4}>
          <SubCategoriesByCategoryIdDatatableComponent
            progressPending={categoryLoading}
            data={eventCategory?.sub_categories!}
          />
        </Box>
      </Box>
    </IntroAnimationComponent>
  );
};

export default ShowCategoryView;
