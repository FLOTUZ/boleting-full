import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

const ShowRolesView = () => {
  const router = useRouter();

  if (router.isFallback) {
    return <ProgressLoaderComponent />;
  }

  return (
    <IntroAnimationComponent data={true}>
      <Box m={4}>
        <h1>Listado de roles</h1>
      </Box>
    </IntroAnimationComponent>
  );
};

export default ShowRolesView;
