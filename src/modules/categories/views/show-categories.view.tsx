import ShowCategoriesDatatable from "../components/show-categories-datatable.component";
import IntroAnimationComponent from "@/components/animations/intro-animation.component";

import { useEffect, useState } from "react";

import {
  EventCategory,
  useShowEventCategoriesLazyQuery,
} from "@/gql/generated";

import { Box, Button, HStack, Link } from "@chakra-ui/react";
import { TbReload } from "react-icons/tb";
import { CreateCategoriesPath } from "@/routes";

const ShowCategoriesView = () => {
  const [eventCategories, setEventCategories] = useState<EventCategory[]>([]);
  const [
    GET_CATEGORIES,
    { loading: categoriesLoading, error: categoriesError, refetch },
  ] = useShowEventCategoriesLazyQuery({
    onCompleted(data) {
      setEventCategories(data.eventCategories as EventCategory[]);
    },
  });

  useEffect(() => {
    GET_CATEGORIES();
  }, [GET_CATEGORIES]);

  if (categoriesError) {
    return <p>{categoriesError.graphQLErrors.map((error) => error.message)}</p>;
  }

  return (
    <IntroAnimationComponent data={eventCategories}>
      <Box m={4}>
        <HStack>
          <Button onClick={() => refetch()}>
            <TbReload />
          </Button>
          <Link href={CreateCategoriesPath}>
            <Button>Nueva</Button>
          </Link>
        </HStack>

        <Box mt={4}>
          <ShowCategoriesDatatable
            progressPending={categoriesLoading}
            data={eventCategories}
          />
        </Box>
      </Box>
    </IntroAnimationComponent>
  );
};

export default ShowCategoriesView;
