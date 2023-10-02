import IntroAnimationComponent from "@/components/animations/intro-animation.component";
import { useUserSession } from "@/hooks/useSession";
import {
  Text,
  Button,
  FormLabel,
  Heading,
  Input,
  Spacer,
  SimpleGrid,
  Container,
} from "@chakra-ui/react";

import Head from "next/head";

function LoginView() {
  const { login, loginLoading } = useUserSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    await login({ email, password });
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <IntroAnimationComponent data={true}>
        <Container
          borderRadius={"xl"}
          _light={{
            shadow: "xl",
          }}
          _dark={{
            bg: "gray.900",
          }}
        >
          <SimpleGrid columns={[1]} padding={20}>
            <Heading>Login</Heading>
            <Text fontSize={"xl"}>Ingresa a tu cuenta</Text>

            <Spacer mt={8} />

            <form onSubmit={handleSubmit} autoComplete="off">
              <FormLabel htmlFor="email" w={"100%"}>
                Email
              </FormLabel>
              <Input id="email" name="email" type="email" w={"100%"} />
              <Spacer mt={2} />

              <FormLabel htmlFor="password" w={"100%"}>
                Contraseña
              </FormLabel>
              <Input id="password" name="password" type="password" w={"100%"} />
              <Spacer mt={2} />

              <Button type="submit" w={"100%"} isLoading={loginLoading}>
                Ingresar
              </Button>
            </form>
          </SimpleGrid>
        </Container>
      </IntroAnimationComponent>
    </>
  );
}

export default LoginView;
