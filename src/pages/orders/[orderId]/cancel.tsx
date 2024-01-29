import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ShowOrdersPath } from "@/routes";

const CancelPage = () => {
  const router = useRouter();
  const { orderId } = router.query;

  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) setSeconds(seconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push(ShowOrdersPath);
    }, 5000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Orden {orderId} cancelada</h1>

      <p>Serás redireccionado en {seconds} segundos</p>
    </div>
  );
};

export default CancelPage;
