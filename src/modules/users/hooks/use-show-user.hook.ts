// Show user hook

import { User, useShowUserLazyQuery } from "@/gql/generated";
import { useEffect, useState } from "react";

export const useShowUser = (userId: string) => {
  const [user, setuser] = useState<User>();

  const [fetchUser, { loading, error }] = useShowUserLazyQuery({
    variables: { userId: Number(userId) },
    onCompleted(data) {
      setuser(data.user as User);
    },
  });

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [fetchUser, userId]);

  return { user, error, loading };
};
