import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { useFormik } from "formik";
import { useState } from "react";
import { LoginClientSchema } from "@/validations";
import {
  Box,
  Button,
  Center,
  Container,
  FormLabel,
  Heading,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  useMediaQuery,
} from "@chakra-ui/react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { RegisterClientPath, rootPath } from "@/routes";

import { useClientSession } from "@/hooks/useClientSession";

const ClientLoginView = () => {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);

  const { login } = useClientSession();

  const [isLargerThan1280] = useMediaQuery("(min-width: 480px)");
  const form = useFormik({
    enableReinitialize: true,
    validationSchema: LoginClientSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const { email, password } = values;
      const response = await login({ email, password });

      if (response) {
        router.replace(rootPath);
      }
    },
  });
  return (
    <Center h={isLargerThan1280 ? "100vh" : "auto"}>
      <Box shadow={"lg"} borderRadius={"2xl"}>
        <SimpleGrid columns={[1, 2]}>
          {isLargerThan1280 && (
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={"2xl"}
            >
              <Image
                src="/assets/login-client-image.png"
                alt="login"
                width={500}
                height={500}
                style={{
                  objectFit: "cover",
                  borderRadius: "20px",
                }}
              />
            </Box>
          )}
          <Box p={8}>
            <Heading>Inicia sesión</Heading>
            <Box display={"flex"} mt={2}>
              <Text mr={"2"}>¿No tienes cuenta?</Text>
              <Link href={RegisterClientPath} passHref>
                <Text as={"b"} color={"blue.500"} cursor={"pointer"}>
                  Registrate aquí
                </Text>
              </Link>
            </Box>

            <form onSubmit={form.handleSubmit}>
              <Box mt={4}>
                <FormLabel htmlFor="email" w={"100%"}>
                  Email
                </FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Ingrese su email"
                  value={form.values.email}
                  onChange={form.handleChange}
                />
                {form.errors.email && form.touched.email && (
                  <Box color="red">{form.errors.email}</Box>
                )}

                <FormLabel htmlFor="password">Contraseña</FormLabel>
                <InputGroup size="md">
                  <Input
                    pr={"4.5rem"}
                    name="password"
                    type={show ? "text" : "password"}
                    placeholder="Ingrese su contraseña"
                    onChange={form.handleChange}
                    value={form.values.password}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? <GoEye /> : <GoEyeClosed />}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                {form.errors.password && form.touched.password && (
                  <Box color="red">{form.errors.password}</Box>
                )}
              </Box>
              <Button type="submit" mt={8} colorScheme={"blue"} width={"100%"}>
                Ingresar
              </Button>
            </form>
          </Box>
        </SimpleGrid>
      </Box>
    </Center>
  );
};

export default ClientLoginView;
