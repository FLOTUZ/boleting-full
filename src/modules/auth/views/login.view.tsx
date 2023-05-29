import { useSession } from "@/hooks/useSession";
import {
  Text,
  Button,
  Center,
  FormLabel,
  Heading,
  Input,
  Spacer,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";

import Head from "next/head";

function LoginView() {
  const { login, loginLoading } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    await login({
      variables: {
        email,
        password,
      },
    });
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Center h={"100vh"}>
        <Box bgColor={"red"}>
          <SimpleGrid
            h={"100%"}
            w={"100%"}
            columns={[1, 1]}
            bgColor={"gray.700"}
            padding={20}
          >
            <Heading>Login</Heading>
            <Text fontSize={"xl"}>Log in to your account</Text>

            <Spacer mt={8} />

            <form onSubmit={handleSubmit} autoComplete="off">
              <FormLabel htmlFor="email" w={"100%"}>
                Email
              </FormLabel>
              <Input id="email" name="email" type="email" w={"100%"} />
              <Spacer mt={2} />

              <FormLabel htmlFor="password" w={"100%"}>
                Password
              </FormLabel>
              <Input id="password" name="password" type="password" w={"100%"} />
              <Spacer mt={2} />

              <Button type="submit" w={"100%"} isLoading={loginLoading}>
                Login
              </Button>
            </form>
          </SimpleGrid>
        </Box>
      </Center>
    </>
  );
}

export default LoginView;
