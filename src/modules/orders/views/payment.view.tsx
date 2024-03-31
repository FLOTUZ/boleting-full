import { useRouter } from "next/router";
import PaymentOptionsComponent from "../components/payment-options.component";
import { CreateOrderPath } from "@/routes";
import { AccessType, useShowAccessTypeLazyQuery } from "@/gql/generated";
import { useEffect, useState } from "react";
import ProgressLoaderComponent from "@/components/loaders/progress-loader.component";
import FreeOrder from "../components/free-order";

const PaymentView = () => {
  const router = useRouter();

  const { eventId, accessTypeId, buyedTicketsCount } = router.query;

  const [accessType, setAccessType] = useState<AccessType | null>(null);
  const [GET_ACCESS_TYPE, { loading }] = useShowAccessTypeLazyQuery({
    variables: {
      accessTypeId: Number(accessTypeId),
    },
    onCompleted(data) {
      setAccessType(data.accessType as AccessType);
    },
  });

  useEffect(() => {
    if (accessTypeId) {
      GET_ACCESS_TYPE();
    }
  }, [GET_ACCESS_TYPE, accessTypeId]);

  if (loading) {
    return <ProgressLoaderComponent />;
  }

  if (Number(accessType?.price) === 0) {
    return (
      <FreeOrder
        accessType={accessType!}
        onSubmit={() => {
          router.push(
            CreateOrderPath(
              String(eventId),
              String(accessTypeId),
              Number(buyedTicketsCount)
            )
          );
        }}
      />
    );
  }

  return (
    <PaymentOptionsComponent
      key={1}
      onSubmit={() => {
        router.push(
          CreateOrderPath(
            String(eventId),
            String(accessTypeId),
            Number(buyedTicketsCount)
          )
        );
      }}
    />
  );
};

export default PaymentView;
