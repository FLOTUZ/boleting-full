import { ShowOrdersPath } from "@/routes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { GetServerSideProps } from "next";
import { prisma } from "@/server";
import { Order } from "@/gql/generated";

const SuccessPage = ({ order }: { order: Order }) => {
  const router = useRouter();

  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) setSeconds(seconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace(ShowOrdersPath);
    }, 5000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1> Orden {order.id} completada </h1>

      <p>Podrás revisar tu orden en {seconds} segundos</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { orderId } = ctx.query;

  const order = await prisma.order.update({
    where: {
      id: Number(orderId),
    },
    data: {
      is_paid: true,
    },
  });

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
};

export default SuccessPage;
