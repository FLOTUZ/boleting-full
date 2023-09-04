import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Role, useShowRoleLazyQuery } from "@/gql/generated";

export const useShowRole = () => {
  const router = useRouter();
  const { roleId } = router.query;

  const [role, setRole] = useState<Role>();

  const [GET_ROLE, { loading, error }] = useShowRoleLazyQuery({
    onCompleted(data) {
      setRole(data.role as Role);
    },
  });

  useEffect(() => {
    if (roleId) {
      GET_ROLE({ variables: { roleId: Number(roleId) } });
    }
  }, [GET_ROLE, roleId]);

  return { role, loading, error };
};
