import { useShowAccessTypeLazyQuery } from "@/gql/generated";
import { AccessType } from "@prisma/client";
import { useState, useEffect } from "react";

interface IUseShowAccessType {
  accessTypeId: string | string[] | undefined;
  eventId: string | string[] | undefined;
}

// Create a hook to show access type
export const useShowAccessType = ({
  accessTypeId,
  eventId,
}: IUseShowAccessType) => {
  const [accessType, setAccessType] = useState<AccessType>();

  const [showAccessType, { loading }] = useShowAccessTypeLazyQuery({
    fetchPolicy: "cache-and-network",
    onCompleted(data) {
      setAccessType(data.accessType as AccessType);
    },
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    if (accessTypeId != null) {
      showAccessType({
        variables: {
          accessTypeId: Number(accessTypeId),
        },
      });
    }
  }, [accessTypeId, showAccessType]);

  return { accessType, loading };
};
