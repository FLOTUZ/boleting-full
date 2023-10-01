import ClientView from "@/modules/auth/views/client.view";
import Head from "next/head";

const LoginClientRoute = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Inicio de sesión" />
      </Head>
      <ClientView />
    </>
  );
};

export default LoginClientRoute;
