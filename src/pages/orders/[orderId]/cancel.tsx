import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ShowOrdersPath } from "@/routes";

import { GetServerSideProps } from "next";
import { prisma } from "@/server";
import { Order } from "@/gql/generated";

const CancelPage = ({ order }: { order: Order }) => {
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
      //router.push(ShowOrdersPath);
    }, 5000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Orden {order.id} cancelada</h1>

      <p>Serás redireccionado en {seconds} segundos</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { orderId } = ctx.query;

  await prisma.ticket.deleteMany({
    where: { orderId: Number(orderId) },
  });

  const order = await prisma.order.delete({
    where: { id: Number(orderId) },
  });

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
};

export default CancelPage;
