import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import { User, useShowUserLazyQuery } from "@/gql/generated";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ShowUserView = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setuser] = useState<User>();
  const [fetchUser, { data, loading, error }] = useShowUserLazyQuery({
    variables: { userId: Number(id) },
    onCompleted(data) {
      setuser(data.user as User);
    },
  });

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (error) {
    return (
      <Box m={4}>
        {error.graphQLErrors.map((error, index) => (
          <pre key={index}>{error.message}</pre>
        ))}
      </Box>
    );
  }

  if (loading) {
    return <ProgressLoaderComponent />;
  }
  return (
    <IntroAnimationComponent data={data}>
      <Box m={4}>
        <div>{JSON.stringify(user)}</div>
      </Box>
    </IntroAnimationComponent>
  );
};

export default ShowUserView;
