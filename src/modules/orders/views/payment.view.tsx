import { useRouter } from "next/router";
import { CreateOrderPath } from "@/routes";

import PaymentOptionsComponent from "../components/payment-options.component";

const PaymentView = () => {
  const router = useRouter();

  const { eventId, accessTypeId, buyedTicketsCount } = router.query;

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
