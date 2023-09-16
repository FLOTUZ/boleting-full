import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

const ShowCategoryView = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  return (
    <IntroAnimationComponent data={true}>
      <Box m={4}>
        <p>Mostrando categoria {categoryId}</p>
      </Box>
    </IntroAnimationComponent>
  );
};

export default ShowCategoryView;
