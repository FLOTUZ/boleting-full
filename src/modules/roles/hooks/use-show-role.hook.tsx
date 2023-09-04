import { Role, useShowRoleLazyQuery } from "@/gql/generated";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useShowRole = () => {
  const router = useRouter();
  const { roleId } = router.query;
  const [role, setrole] = useState<Role>();

  const [getRole, { loading, error }] = useShowRoleLazyQuery({
    onCompleted(data) {
      setrole(data.role as Role);
    },
  });

  useEffect(() => {
    if (roleId) {
      getRole({ variables: { roleId: Number(roleId) } });
    }
  }, [getRole, roleId]);

  return { role, loading, error };
};
